import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import { createLead, createBooking, getAllLeads, getAllBookings, getLeadById } from "./db";
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

/* ─── Lead segmentation + quality scoring ─── */

function computeTags(quizAnswers: string | null): string[] {
  if (!quizAnswers) return [];
  try {
    const answers = JSON.parse(quizAnswers) as Record<string, string>;
    const tags: string[] = [];

    if (answers.business_type === "startup") tags.push("startup");
    if (answers.annual_revenue === "under_50k") tags.push("low_revenue");
    if (answers.annual_revenue === "1m_5m" || answers.annual_revenue === "over_5m") tags.push("high_revenue");
    if (answers.timeline === "urgent") tags.push("urgent");
    if (answers.previous_applications === "declined") tags.push("previously_declined");
    if (answers.previous_applications === "first_time") tags.push("first_time_applicant");

    return tags;
  } catch {
    return [];
  }
}

function computeQualityScore(quizAnswers: string | null): number {
  if (!quizAnswers) return 50; // default mid-range for non-quiz leads
  try {
    const answers = JSON.parse(quizAnswers) as Record<string, string>;
    let score = 50;

    // Revenue factor (0–25 points)
    const revenueScores: Record<string, number> = {
      over_5m: 25, "1m_5m": 20, "250k_1m": 15, "50k_250k": 10, under_50k: 5,
    };
    score += revenueScores[answers.annual_revenue] || 0;

    // Business type factor (0–15 points)
    if (answers.business_type === "ltd") score += 15;
    else if (answers.business_type === "partnership") score += 10;
    else if (answers.business_type === "sole_trader") score += 5;
    // startup stays at 0

    // Timeline factor (-10 to +10)
    if (answers.timeline === "soon") score += 10;
    else if (answers.timeline === "urgent") score += 5;
    else if (answers.timeline === "planning") score += 3;
    // exploring stays at 0

    // Previous applications factor (-5 to +10)
    if (answers.previous_applications === "approved") score += 10;
    else if (answers.previous_applications === "first_time") score += 0;
    else if (answers.previous_applications === "stalled") score -= 3;
    else if (answers.previous_applications === "declined") score -= 5;

    return Math.max(0, Math.min(100, score));
  } catch {
    return 50;
  }
}

/* ─── Shared UTM schema ─── */
const utmFields = {
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  referrer: z.string().optional(),
  leadTimeline: z.string().optional(),
};

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
          ...utmFields,
        })
      )
      .mutation(async ({ input }) => {
        const tags = computeTags(input.quizAnswers ?? null);
        const qualityScore = computeQualityScore(input.quizAnswers ?? null);

        const leadId = await createLead({
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          phone: input.phone ?? null,
          source: input.source,
          quizAnswers: input.quizAnswers ?? null,
          quizResult: input.quizResult ?? null,
          utmSource: input.utmSource ?? null,
          utmMedium: input.utmMedium ?? null,
          utmCampaign: input.utmCampaign ?? null,
          utmTerm: input.utmTerm ?? null,
          utmContent: input.utmContent ?? null,
          referrer: input.referrer ?? null,
          leadTimeline: input.leadTimeline ?? null,
          tags: tags.length > 0 ? JSON.stringify(tags) : null,
          qualityScore,
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
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company || "N/A"}\nPhone: ${input.phone || "N/A"}\nSource: ${sourceLabel}\nQuality Score: ${qualityScore}/100\nTags: ${tags.join(", ") || "None"}${input.quizResult ? `\nQuiz Result: ${input.quizResult}` : ""}${input.utmSource ? `\nUTM Source: ${input.utmSource}` : ""}`,
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
          ...utmFields,
        })
      )
      .mutation(async ({ input }) => {
        // Save booking with UTM
        const bookingId = await createBooking({
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          phone: input.phone ?? null,
          preferredDate: input.preferredDate ?? null,
          preferredTime: input.preferredTime ?? null,
          message: input.message ?? null,
          utmSource: input.utmSource ?? null,
          utmMedium: input.utmMedium ?? null,
          utmCampaign: input.utmCampaign ?? null,
          utmTerm: input.utmTerm ?? null,
          utmContent: input.utmContent ?? null,
          referrer: input.referrer ?? null,
        });

        // Also save as a lead with UTM
        createLead({
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          phone: input.phone ?? null,
          source: "booking",
          utmSource: input.utmSource ?? null,
          utmMedium: input.utmMedium ?? null,
          utmCampaign: input.utmCampaign ?? null,
          utmTerm: input.utmTerm ?? null,
          utmContent: input.utmContent ?? null,
          referrer: input.referrer ?? null,
          leadTimeline: input.leadTimeline ?? null,
          tags: null,
          qualityScore: 50,
        }).catch(() => {});

        // Sync to Sendy
        syncToSendy(input.email, input.name).catch(() => {});

        // Notify owner
        notifyOwner({
          title: `New Clarity Call Booking: ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.company || "N/A"}\nPhone: ${input.phone || "N/A"}\nPreferred Date: ${input.preferredDate || "Flexible"}\nPreferred Time: ${input.preferredTime || "Flexible"}\nMessage: ${input.message || "None"}${input.utmSource ? `\nUTM Source: ${input.utmSource}` : ""}`,
        }).catch(() => {});

        return { success: true, bookingId };
      }),
  }),

  /* ─── Admin procedures ─── */
  admin: router({
    leads: adminProcedure
      .input(
        z.object({
          source: z.enum(["quiz", "lead_magnet", "contact", "booking"]).optional(),
          dateFrom: z.string().optional(),
          dateTo: z.string().optional(),
          tag: z.string().optional(),
          minScore: z.number().optional(),
          maxScore: z.number().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        const allLeads = await getAllLeads();
        let filtered = allLeads;

        if (input?.source) {
          filtered = filtered.filter((l) => l.source === input.source);
        }
        if (input?.dateFrom) {
          const from = new Date(input.dateFrom);
          filtered = filtered.filter((l) => l.createdAt >= from);
        }
        if (input?.dateTo) {
          const to = new Date(input.dateTo);
          to.setHours(23, 59, 59, 999);
          filtered = filtered.filter((l) => l.createdAt <= to);
        }
        if (input?.tag) {
          filtered = filtered.filter((l) => {
            if (!l.tags) return false;
            try {
              const tags = JSON.parse(l.tags) as string[];
              return tags.includes(input.tag!);
            } catch {
              return false;
            }
          });
        }
        if (input?.minScore !== undefined) {
          filtered = filtered.filter((l) => (l.qualityScore ?? 0) >= input.minScore!);
        }
        if (input?.maxScore !== undefined) {
          filtered = filtered.filter((l) => (l.qualityScore ?? 100) <= input.maxScore!);
        }

        return filtered;
      }),

    leadDetail: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const lead = await getLeadById(input.id);
        return lead ?? null;
      }),

    bookings: adminProcedure
      .input(
        z.object({
          status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
          dateFrom: z.string().optional(),
          dateTo: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        const allBookings = await getAllBookings();
        let filtered = allBookings;

        if (input?.status) {
          filtered = filtered.filter((b) => b.status === input.status);
        }
        if (input?.dateFrom) {
          const from = new Date(input.dateFrom);
          filtered = filtered.filter((b) => b.createdAt >= from);
        }
        if (input?.dateTo) {
          const to = new Date(input.dateTo);
          to.setHours(23, 59, 59, 999);
          filtered = filtered.filter((b) => b.createdAt <= to);
        }

        return filtered;
      }),
  }),
});

export type AppRouter = typeof appRouter;
