import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module so we don't need a real database connection
vi.mock("./db", () => ({
  createLead: vi.fn().mockResolvedValue(42),
  createBooking: vi.fn().mockResolvedValue(7),
  getLeadsBySource: vi.fn().mockResolvedValue([]),
  getAllBookings: vi.fn().mockResolvedValue([]),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDb: vi.fn().mockResolvedValue(null),
}));

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("lead.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts a valid quiz lead submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lead.submit({
      name: "Jane Smith",
      email: "jane@example.co.uk",
      company: "Smith Ltd",
      source: "quiz",
      quizAnswers: JSON.stringify({ businessType: "ltd", revenue: "250k-500k" }),
      quizResult: "strong",
    });

    expect(result).toEqual({ success: true, leadId: 42 });
  });

  it("accepts a valid contact form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lead.submit({
      name: "Tom Brown",
      email: "tom@business.co.uk",
      source: "contact",
    });

    expect(result).toEqual({ success: true, leadId: 42 });
  });

  it("accepts a valid lead magnet submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.lead.submit({
      name: "Sarah Green",
      email: "sarah@startup.io",
      source: "lead_magnet",
    });

    expect(result).toEqual({ success: true, leadId: 42 });
  });

  it("rejects submission with missing name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({
        name: "",
        email: "test@example.com",
        source: "contact",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({
        name: "Test User",
        email: "not-an-email",
        source: "quiz",
      })
    ).rejects.toThrow();
  });

  it("rejects submission with invalid source", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.lead.submit({
        name: "Test User",
        email: "test@example.com",
        source: "invalid_source" as any,
      })
    ).rejects.toThrow();
  });
});

describe("booking.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts a valid booking submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.booking.submit({
      name: "Alice Johnson",
      email: "alice@company.co.uk",
      company: "Johnson & Co",
      phone: "07700 900123",
      preferredDate: "2026-02-15",
      preferredTime: "10:00",
      message: "Looking for growth funding",
    });

    expect(result).toEqual({ success: true, bookingId: 7 });
  });

  it("accepts a minimal booking submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.booking.submit({
      name: "Bob Wilson",
      email: "bob@test.co.uk",
    });

    expect(result).toEqual({ success: true, bookingId: 7 });
  });

  it("rejects booking with missing name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.booking.submit({
        name: "",
        email: "test@example.com",
      })
    ).rejects.toThrow();
  });

  it("rejects booking with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.booking.submit({
        name: "Test User",
        email: "bad-email",
      })
    ).rejects.toThrow();
  });
});
