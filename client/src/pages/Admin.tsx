import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useSEO } from "@/hooks/useSEO";
import { SEO_META } from "@/lib/seoConfig";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Eye, Users, CalendarDays, TrendingUp, Filter, X } from "lucide-react";
import { getLoginUrl } from "@/const";

/* ─── Types ─── */
type LeadSource = "quiz" | "lead_magnet" | "contact" | "booking";

/* ─── CSV Export ─── */
function downloadCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = row[h];
      const str = val instanceof Date ? val.toISOString() : String(val ?? "");
      return `"${str.replace(/"/g, '""')}"`;
    }).join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Tag colours ─── */
const TAG_COLORS: Record<string, string> = {
  startup: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  low_revenue: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  high_revenue: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  urgent: "bg-red-500/20 text-red-300 border-red-500/30",
  previously_declined: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  first_time_applicant: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null || score === undefined) return <span className="text-warm-white/30">—</span>;
  const color =
    score >= 75
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      : score >= 50
        ? "bg-gold/20 text-gold border-gold/30"
        : "bg-red-500/20 text-red-300 border-red-500/30";
  return (
    <Badge variant="outline" className={`${color} text-xs font-mono`}>
      {score}
    </Badge>
  );
}

export default function Admin() {
  useSEO(SEO_META.admin);
  const { user, loading: authLoading } = useAuth();

  /* ─── Tab state ─── */
  const [activeTab, setActiveTab] = useState<"leads" | "bookings">("leads");

  /* ─── Lead filters ─── */
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "all">("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");

  /* ─── Booking filters ─── */
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bookingDateFrom, setBookingDateFrom] = useState("");
  const [bookingDateTo, setBookingDateTo] = useState("");

  /* ─── Detail dialog ─── */
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);

  /* ─── Queries ─── */
  const leadsQuery = trpc.admin.leads.useQuery(
    {
      source: sourceFilter !== "all" ? (sourceFilter as LeadSource) : undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      tag: tagFilter !== "all" ? tagFilter : undefined,
      minScore: minScore ? Number(minScore) : undefined,
      maxScore: maxScore ? Number(maxScore) : undefined,
    },
    { enabled: !!user && user.role === "admin" }
  );

  const bookingsQuery = trpc.admin.bookings.useQuery(
    {
      status: statusFilter !== "all" ? (statusFilter as any) : undefined,
      dateFrom: bookingDateFrom || undefined,
      dateTo: bookingDateTo || undefined,
    },
    { enabled: !!user && user.role === "admin" }
  );

  const leadDetailQuery = trpc.admin.leadDetail.useQuery(
    { id: selectedLeadId! },
    { enabled: selectedLeadId !== null }
  );

  /* ─── Stats ─── */
  const stats = useMemo(() => {
    const leads = leadsQuery.data ?? [];
    const bookings = bookingsQuery.data ?? [];
    const avgScore =
      leads.length > 0
        ? Math.round(
            leads.reduce((sum, l) => sum + (l.qualityScore ?? 0), 0) / leads.length
          )
        : 0;
    return {
      totalLeads: leads.length,
      totalBookings: bookings.length,
      avgScore,
    };
  }, [leadsQuery.data, bookingsQuery.data]);

  /* ─── Auth gate ─── */
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Admin Access Required
          </h1>
          <p className="text-warm-white/60 mb-6">Please sign in to access the admin dashboard.</p>
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="bg-gold text-dark hover:bg-gold/90"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Access Denied
          </h1>
          <p className="text-warm-white/60">You do not have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Admin <span className="text-gold">Dashboard</span>
          </h1>
          <p className="text-warm-white/50">Manage leads, bookings, and attribution data.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Leads", value: stats.totalLeads, icon: Users, color: "text-blue-400" },
            { label: "Total Bookings", value: stats.totalBookings, icon: CalendarDays, color: "text-emerald-400" },
            { label: "Avg Quality Score", value: stats.avgScore, icon: TrendingUp, color: "text-gold" },
          ].map((s, i) => (
            <div key={i} className="glass-card p-5 rounded-sm">
              <div className="flex items-center gap-3 mb-2">
                <s.icon size={18} className={s.color} />
                <span className="text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>
                  {s.label}
                </span>
              </div>
              <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["leads", "bookings"] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab
                  ? "bg-gold text-dark hover:bg-gold/90"
                  : "border-white/10 text-warm-white/60 hover:text-warm-white"
              }
            >
              {tab === "leads" ? "Leads" : "Bookings"}
            </Button>
          ))}
        </div>

        {/* ─── LEADS TAB ─── */}
        {activeTab === "leads" && (
          <>
            {/* Filters */}
            <div className="glass-card p-4 rounded-sm mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter size={14} className="text-gold-dim" />
                <span className="text-xs uppercase tracking-wider text-warm-white/50" style={{ fontFamily: "var(--font-mono)" }}>
                  Filters
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <Select value={sourceFilter} onValueChange={(v) => setSourceFilter(v as any)}>
                  <SelectTrigger className="bg-dark/50 border-white/10 text-sm">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="lead_magnet">Guide</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="booking">Booking</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tagFilter} onValueChange={setTagFilter}>
                  <SelectTrigger className="bg-dark/50 border-white/10 text-sm">
                    <SelectValue placeholder="Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="low_revenue">Low Revenue</SelectItem>
                    <SelectItem value="high_revenue">High Revenue</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="previously_declined">Previously Declined</SelectItem>
                    <SelectItem value="first_time_applicant">First Time</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  placeholder="From"
                  className="bg-dark/50 border-white/10 text-sm"
                />
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  placeholder="To"
                  className="bg-dark/50 border-white/10 text-sm"
                />
                <Input
                  type="number"
                  value={minScore}
                  onChange={(e) => setMinScore(e.target.value)}
                  placeholder="Min Score"
                  className="bg-dark/50 border-white/10 text-sm"
                  min={0}
                  max={100}
                />
                <Input
                  type="number"
                  value={maxScore}
                  onChange={(e) => setMaxScore(e.target.value)}
                  placeholder="Max Score"
                  className="bg-dark/50 border-white/10 text-sm"
                  min={0}
                  max={100}
                />
              </div>
              <div className="flex justify-end mt-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-warm-white/50 text-xs"
                  onClick={() => {
                    setSourceFilter("all");
                    setTagFilter("all");
                    setDateFrom("");
                    setDateTo("");
                    setMinScore("");
                    setMaxScore("");
                  }}
                >
                  <X size={12} className="mr-1" /> Clear
                </Button>
                <Button
                  size="sm"
                  className="bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 text-xs"
                  onClick={() => {
                    if (leadsQuery.data) {
                      downloadCSV(
                        leadsQuery.data.map((l) => ({
                          ...l,
                          createdAt: l.createdAt ? new Date(l.createdAt).toISOString() : "",
                        })),
                        `funding-clarity-leads-${new Date().toISOString().slice(0, 10)}.csv`
                      );
                    }
                  }}
                >
                  <Download size={12} className="mr-1" /> Export CSV
                </Button>
              </div>
            </div>

            {/* Leads table */}
            {leadsQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-gold" size={24} />
              </div>
            ) : !leadsQuery.data?.length ? (
              <div className="text-center py-12 text-warm-white/40">No leads found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Name</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Email</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Source</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Score</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Tags</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>UTM Source</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Date</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leadsQuery.data.map((lead, i) => {
                      let tags: string[] = [];
                      try {
                        tags = lead.tags ? JSON.parse(lead.tags) : [];
                      } catch { /* empty */ }

                      return (
                        <tr
                          key={lead.id}
                          className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${
                            i % 2 === 0 ? "bg-white/[0.01]" : ""
                          }`}
                        >
                          <td className="py-3 px-3 font-medium text-warm-white">{lead.name}</td>
                          <td className="py-3 px-3 text-warm-white/60">{lead.email}</td>
                          <td className="py-3 px-3">
                            <Badge variant="outline" className="text-xs border-white/10 text-warm-white/50">
                              {lead.source}
                            </Badge>
                          </td>
                          <td className="py-3 px-3">
                            <ScoreBadge score={lead.qualityScore} />
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex flex-wrap gap-1">
                              {tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className={`text-[10px] ${TAG_COLORS[tag] || "border-white/10 text-warm-white/40"}`}
                                >
                                  {tag.replace(/_/g, " ")}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-warm-white/40 text-xs">
                            {lead.utmSource || "—"}
                          </td>
                          <td className="py-3 px-3 text-warm-white/40 text-xs">
                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-GB") : "—"}
                          </td>
                          <td className="py-3 px-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedLeadId(lead.id)}
                              className="text-gold/60 hover:text-gold"
                            >
                              <Eye size={14} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ─── BOOKINGS TAB ─── */}
        {activeTab === "bookings" && (
          <>
            {/* Filters */}
            <div className="glass-card p-4 rounded-sm mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Filter size={14} className="text-gold-dim" />
                <span className="text-xs uppercase tracking-wider text-warm-white/50" style={{ fontFamily: "var(--font-mono)" }}>
                  Filters
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-dark/50 border-white/10 text-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={bookingDateFrom}
                  onChange={(e) => setBookingDateFrom(e.target.value)}
                  placeholder="From"
                  className="bg-dark/50 border-white/10 text-sm"
                />
                <Input
                  type="date"
                  value={bookingDateTo}
                  onChange={(e) => setBookingDateTo(e.target.value)}
                  placeholder="To"
                  className="bg-dark/50 border-white/10 text-sm"
                />
              </div>
            </div>

            {/* Bookings table */}
            {bookingsQuery.isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-gold" size={24} />
              </div>
            ) : !bookingsQuery.data?.length ? (
              <div className="text-center py-12 text-warm-white/40">No bookings found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Name</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Email</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Company</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Preferred Date</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Status</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>UTM Source</th>
                      <th className="py-3 px-3 text-xs uppercase tracking-wider text-warm-white/40" style={{ fontFamily: "var(--font-mono)" }}>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingsQuery.data.map((booking, i) => (
                      <tr
                        key={booking.id}
                        className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${
                          i % 2 === 0 ? "bg-white/[0.01]" : ""
                        }`}
                      >
                        <td className="py-3 px-3 font-medium text-warm-white">{booking.name}</td>
                        <td className="py-3 px-3 text-warm-white/60">{booking.email}</td>
                        <td className="py-3 px-3 text-warm-white/40">{booking.company || "—"}</td>
                        <td className="py-3 px-3 text-warm-white/40">{booking.preferredDate || "Flexible"}</td>
                        <td className="py-3 px-3">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              booking.status === "confirmed"
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                : booking.status === "completed"
                                  ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                  : booking.status === "cancelled"
                                    ? "bg-red-500/20 text-red-300 border-red-500/30"
                                    : "bg-gold/20 text-gold border-gold/30"
                            }`}
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-warm-white/40 text-xs">{booking.utmSource || "—"}</td>
                        <td className="py-3 px-3 text-warm-white/40 text-xs">
                          {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString("en-GB") : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ─── Lead Detail Dialog ─── */}
        <Dialog open={selectedLeadId !== null} onOpenChange={(open) => !open && setSelectedLeadId(null)}>
          <DialogContent className="bg-dark border-white/10 max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl" style={{ fontFamily: "var(--font-display)" }}>
                Lead Details
              </DialogTitle>
            </DialogHeader>

            {leadDetailQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin text-gold" size={24} />
              </div>
            ) : leadDetailQuery.data ? (
              <div className="space-y-6">
                {/* Contact info */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Name", value: leadDetailQuery.data.name },
                    { label: "Email", value: leadDetailQuery.data.email },
                    { label: "Company", value: leadDetailQuery.data.company || "—" },
                    { label: "Phone", value: leadDetailQuery.data.phone || "—" },
                    { label: "Source", value: leadDetailQuery.data.source },
                    { label: "Created", value: leadDetailQuery.data.createdAt ? new Date(leadDetailQuery.data.createdAt).toLocaleString("en-GB") : "—" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] uppercase tracking-wider text-warm-white/30 mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        {item.label}
                      </p>
                      <p className="text-sm text-warm-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Score + Tags */}
                <div className="border-t border-white/5 pt-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-warm-white/30 mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        Quality Score
                      </p>
                      <ScoreBadge score={leadDetailQuery.data.qualityScore} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-warm-white/30 mb-1" style={{ fontFamily: "var(--font-mono)" }}>
                        Tags
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(() => {
                          try {
                            const tags = leadDetailQuery.data.tags ? JSON.parse(leadDetailQuery.data.tags) : [];
                            return tags.length > 0
                              ? tags.map((tag: string) => (
                                  <Badge key={tag} variant="outline" className={`text-[10px] ${TAG_COLORS[tag] || ""}`}>
                                    {tag.replace(/_/g, " ")}
                                  </Badge>
                                ))
                              : <span className="text-warm-white/30 text-xs">None</span>;
                          } catch {
                            return <span className="text-warm-white/30 text-xs">None</span>;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* UTM Attribution */}
                <div className="border-t border-white/5 pt-4">
                  <p className="text-[10px] uppercase tracking-wider text-warm-white/30 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                    Attribution
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {[
                      { label: "UTM Source", value: leadDetailQuery.data.utmSource },
                      { label: "UTM Medium", value: leadDetailQuery.data.utmMedium },
                      { label: "UTM Campaign", value: leadDetailQuery.data.utmCampaign },
                      { label: "UTM Term", value: leadDetailQuery.data.utmTerm },
                      { label: "UTM Content", value: leadDetailQuery.data.utmContent },
                      { label: "Referrer", value: leadDetailQuery.data.referrer },
                    ].map((item) => (
                      <div key={item.label}>
                        <span className="text-warm-white/30">{item.label}:</span>{" "}
                        <span className="text-warm-white/70">{item.value || "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quiz Answers */}
                {leadDetailQuery.data.quizAnswers && (
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-[10px] uppercase tracking-wider text-warm-white/30 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Quiz Answers
                    </p>
                    <pre className="text-xs text-warm-white/60 bg-dark-card/50 p-3 rounded-sm overflow-x-auto">
                      {JSON.stringify(JSON.parse(leadDetailQuery.data.quizAnswers), null, 2)}
                    </pre>
                  </div>
                )}

                {/* Quiz Result */}
                {leadDetailQuery.data.quizResult && (
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-[10px] uppercase tracking-wider text-warm-white/30 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Quiz Result
                    </p>
                    <p className="text-sm text-warm-white/70">{leadDetailQuery.data.quizResult}</p>
                  </div>
                )}

                {/* Lead Timeline */}
                {leadDetailQuery.data.leadTimeline && (
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-[10px] uppercase tracking-wider text-warm-white/30 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                      Lead Timeline
                    </p>
                    <div className="space-y-1">
                      {(() => {
                        try {
                          const timeline = JSON.parse(leadDetailQuery.data.leadTimeline) as Array<{
                            event: string;
                            path: string;
                            timestamp: number;
                          }>;
                          return timeline.map((ev, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-xs">
                              <span className="text-warm-white/20 font-mono w-36 shrink-0">
                                {new Date(ev.timestamp).toLocaleString("en-GB")}
                              </span>
                              <span className="text-gold-dim">{ev.event}</span>
                              <span className="text-warm-white/40">{ev.path}</span>
                            </div>
                          ));
                        } catch {
                          return <span className="text-warm-white/30 text-xs">Unable to parse timeline</span>;
                        }
                      })()}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-warm-white/40">Lead not found.</div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
