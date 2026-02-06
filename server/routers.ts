import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createLead, createBooking } from "./db";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";

/* ─── Sendy helper ─── */
async function syncToSendy(email: string, name: string): Promise<boolean> {
  if (!ENV.sendyApiUrl || !ENV.sendyApiKey || !ENV.sendyListId) {
    console.warn("[Sendy] Not configured — skipping sync");
    return false;
  }
  try {
    const params = new URLSearchParams({
      api_key: ENV.sendyApiKey,
      list: ENV.sendyListId,
      email,
      name,
      boolean: "true",
    });
    const res = await fetch(`${ENV.sendyApiUrl}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const text = await res.text();
    console.log("[Sendy] Subscribe response:", text);
    return text === "1" || text === "Already subscribed.";
  } catch (err) {
    console.error("[Sendy] Error:", err);
    return false;
  }
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  /* ─── Lead capture (quiz + lead magnet + contact form) ─── */
  lead: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          company: z.string().optional(),
          phone: z.string().optional(),
          source: z.enum(["quiz", "lead_magnet", "contact", "booking"]),
          quizAnswers: z.string().optional(),
          quizResult: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Save to database
        const leadId = await createLead({
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          phone: input.phone ?? null,
          source: input.source,
          quizAnswers: input.quizAnswers ?? null,
          quizResult: input.quizResult ?? null,
        });

        // Sync to Sendy (non-blocking)
        syncToSendy(input.email, input.name).catch(() => {});

        // Notify owner
        const sourceLabel = {
          quiz: "Funding Readiness Quiz",
          lead_magnet: "Lead Magnet Download",
          contact: "Contact Form",
          booking: "Booking Request",
        }[input.source];

        notifyOwner({
          title: `New ${sourceLabel} Lead: ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company || "N/A"}\nPhone: ${input.phone || "N/A"}\nSource: ${sourceLabel}${input.quizResult ? `\nQuiz Result: ${input.quizResult}` : ""}`,
        }).catch(() => {});

        return { success: true, leadId };
      }),
  }),

  /* ─── Booking requests ─── */
  booking: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          company: z.string().optional(),
          phone: z.string().optional(),
          preferredDate: z.string().optional(),
          preferredTime: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Save booking
        const bookingId = await createBooking({
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          phone: input.phone ?? null,
          preferredDate: input.preferredDate ?? null,
          preferredTime: input.preferredTime ?? null,
          message: input.message ?? null,
        });

        // Also save as a lead
        createLead({
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          phone: input.phone ?? null,
          source: "booking",
        }).catch(() => {});

        // Sync to Sendy
        syncToSendy(input.email, input.name).catch(() => {});

        // Notify owner
        notifyOwner({
          title: `New Clarity Call Booking: ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company || "N/A"}\nPhone: ${input.phone || "N/A"}\nPreferred Date: ${input.preferredDate || "Flexible"}\nPreferred Time: ${input.preferredTime || "Flexible"}\nMessage: ${input.message || "None"}`,
        }).catch(() => {});

        return { success: true, bookingId };
      }),
  }),
});

export type AppRouter = typeof appRouter;
