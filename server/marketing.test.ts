import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/* ─── Helper: create a mock context ─── */
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@fundingclarity.co.uk",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Lead submission with UTM and segmentation", () => {
  it("accepts a quiz lead with UTM fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // This will fail with DB error in test env, but validates input schema
    try {
      await caller.lead.submit({
        name: "Test User",
        email: "test@example.com",
        company: "Test Ltd",
        phone: "07123456789",
        source: "quiz",
        quizAnswers: JSON.stringify({
          business_type: "ltd",
          annual_revenue: "1m_5m",
          funding_amount: "100k_500k",
          timeline: "soon",
          previous_applications: "approved",
        }),
        quizResult: JSON.stringify({ score: "Strong", headline: "Test" }),
        utmSource: "google",
        utmMedium: "cpc",
        utmCampaign: "spring_2026",
        utmTerm: "business+funding",
        utmContent: "ad_v1",
        referrer: "https://google.com",
        leadTimeline: JSON.stringify([
          { event: "page_view", path: "/", timestamp: Date.now() },
          { event: "quiz_start", path: "/quiz", timestamp: Date.now() },
        ]),
      });
    } catch (err: any) {
      // DB not available in test — that's expected
      // We're validating that the input schema accepts all UTM fields
      expect(err.message).toContain("Database");
    }
  });

  it("accepts a contact lead without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.lead.submit({
        name: "Simple Lead",
        email: "simple@example.com",
        source: "contact",
      });
    } catch (err: any) {
      expect(err.message).toContain("Database");
    }
  });

  it("rejects lead with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({
        name: "Bad Email",
        email: "not-an-email",
        source: "quiz",
      })
    ).rejects.toThrow();
  });

  it("rejects lead with empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({
        name: "",
        email: "test@example.com",
        source: "quiz",
      })
    ).rejects.toThrow();
  });

  it("rejects lead with invalid source", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({
        name: "Test",
        email: "test@example.com",
        source: "invalid_source" as any,
      })
    ).rejects.toThrow();
  });
});

describe("Booking submission with UTM", () => {
  it("accepts a booking with UTM fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.booking.submit({
        name: "Booking Test",
        email: "booking@example.com",
        company: "Test Co",
        phone: "07999888777",
        preferredDate: "2026-03-15",
        preferredTime: "10:00",
        message: "Need funding for expansion",
        utmSource: "linkedin",
        utmMedium: "social",
        utmCampaign: "q1_outreach",
        referrer: "https://linkedin.com",
        leadTimeline: JSON.stringify([
          { event: "page_view", path: "/booking", timestamp: Date.now() },
        ]),
      });
    } catch (err: any) {
      expect(err.message).toContain("Database");
    }
  });

  it("rejects booking with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.booking.submit({
        name: "Test",
        email: "bad-email",
      })
    ).rejects.toThrow();
  });
});

describe("Admin procedures access control", () => {
  it("admin can access leads list", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.admin.leads({});
    } catch (err: any) {
      // DB not available — but should not be FORBIDDEN
      expect(err.code).not.toBe("FORBIDDEN");
    }
  });

  it("admin can access bookings list", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.admin.bookings({});
    } catch (err: any) {
      expect(err.code).not.toBe("FORBIDDEN");
    }
  });

  it("non-admin user is blocked from admin leads", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.leads({})).rejects.toThrow();
  });

  it("non-admin user is blocked from admin bookings", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.bookings({})).rejects.toThrow();
  });

  it("unauthenticated user is blocked from admin", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.leads({})).rejects.toThrow();
  });
});
