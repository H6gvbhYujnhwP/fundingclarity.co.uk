import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module so we don't need a real database connection
vi.mock("./db", () => ({
  createLead: vi.fn().mockResolvedValue(99),
  createBooking: vi.fn().mockResolvedValue(88),
  getAllLeads: vi.fn().mockResolvedValue([]),
  getAllBookings: vi.fn().mockResolvedValue([]),
  getLeadById: vi.fn().mockResolvedValue(undefined),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDb: vi.fn().mockResolvedValue(null),
}));

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

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

    const result = await caller.lead.submit({
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

    expect(result.success).toBe(true);
    expect(result.leadId).toBe(99);
  });

  it("accepts a contact lead without optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lead.submit({
      name: "Simple Lead",
      email: "simple@example.com",
      source: "contact",
    });

    expect(result.success).toBe(true);
    expect(result.leadId).toBe(99);
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

    const result = await caller.booking.submit({
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

    expect(result.success).toBe(true);
    expect(result.bookingId).toBe(88);
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

    const result = await caller.admin.leads({});
    expect(result).toEqual([]);
  });

  it("admin can access bookings list", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.bookings({});
    expect(result).toEqual([]);
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
