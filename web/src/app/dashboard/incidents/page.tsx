
"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  FileWarning,
  Filter,
  MapPin,
  Plus,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

type IncidentType = "THEFT" | "HARASSMENT" | "ACCIDENT" | "OTHER";
type Severity = "LOW" | "MEDIUM" | "HIGH";
type Verification = "Verified" | "Pending review";

type Incident = {
  id: number;
  type: IncidentType;
  severity: Severity;
  road: string;
  location: string;
  occurredAt: string;
  reportedAt: string;
  verification: Verification;
  description: string;
  actionTaken: string;
};

const initialIncidents: Incident[] = [
  {
    id: 1001,
    type: "HARASSMENT",
    severity: "HIGH",
    road: "MG Road",
    location: "Near Trinity Metro Station",
    occurredAt: "2026-10-24T20:15",
    reportedAt: "2026-10-24T20:42",
    verification: "Verified",
    description:
      "A harassment incident was reported near the metro entrance. The report was reviewed and verified by an administrator.",
    actionTaken: "Report verified for safety assessment.",
  },
  {
    id: 1002,
    type: "ACCIDENT",
    severity: "HIGH",
    road: "Outer Ring Road",
    location: "Near Marathahalli Junction",
    occurredAt: "2026-10-24T17:30",
    reportedAt: "2026-10-24T17:55",
    verification: "Pending review",
    description:
      "A pedestrian reported a road accident near a busy junction with heavy evening traffic.",
    actionTaken: "Awaiting administrator review.",
  },
  {
    id: 1003,
    type: "THEFT",
    severity: "MEDIUM",
    road: "Brigade Road",
    location: "Commercial Street junction",
    occurredAt: "2026-10-23T19:10",
    reportedAt: "2026-10-23T19:35",
    verification: "Verified",
    description:
      "A theft was reported in a crowded pedestrian area during evening shopping hours.",
    actionTaken: "Report verified for safety assessment.",
  },
  {
    id: 1004,
    type: "OTHER",
    severity: "LOW",
    road: "Church Street",
    location: "Near the pedestrian walkway",
    occurredAt: "2026-10-23T11:20",
    reportedAt: "2026-10-23T12:05",
    verification: "Pending review",
    description:
      "A pedestrian reported an unsafe obstruction affecting movement along the walkway.",
    actionTaken: "Awaiting administrator review.",
  },
  {
    id: 1005,
    type: "HARASSMENT",
    severity: "MEDIUM",
    road: "Residency Road",
    location: "Near a public bus stop",
    occurredAt: "2026-10-22T18:45",
    reportedAt: "2026-10-22T19:10",
    verification: "Pending review",
    description:
      "A community member submitted a report concerning an uncomfortable encounter near a bus stop.",
    actionTaken: "Awaiting administrator review.",
  },
  {
    id: 1006,
    type: "ACCIDENT",
    severity: "LOW",
    road: "Indiranagar 100 Feet Road",
    location: "Near the main crossing",
    occurredAt: "2026-10-21T09:15",
    reportedAt: "2026-10-21T09:40",
    verification: "Verified",
    description:
      "A minor pedestrian accident was reported at a road crossing.",
    actionTaken: "Report verified for safety assessment.",
  },
];

const typeLabels: Record<IncidentType, string> = {
  THEFT: "Theft",
  HARASSMENT: "Harassment",
  ACCIDENT: "Accident",
  OTHER: "Other",
};

const severityStyles: Record<Severity, string> = {
  HIGH: "bg-rose-50 text-rose-700 ring-rose-200",
  MEDIUM: "bg-amber-50 text-amber-700 ring-amber-200",
  LOW: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${severityStyles[severity]}`}
    >
      {severity.charAt(0) + severity.slice(1).toLowerCase()}
    </span>
  );
}

function VerificationBadge({
  verification,
}: {
  verification: Verification;
}) {
  const verified = verification === "Verified";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        verified
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {verified ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
      {verification}
    </span>
  );
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortNewest, setSortNewest] = useState(true);
  const [selectedIncident, setSelectedIncident] =
    useState<Incident | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    type: "OTHER" as IncidentType,
    severity: "MEDIUM" as Severity,
    road: "",
    location: "",
    occurredAt: "",
    description: "",
  });

  const [formError, setFormError] = useState("");

  const stats = useMemo(
    () => ({
      total: incidents.length,
      high: incidents.filter((item) => item.severity === "HIGH").length,
      pending: incidents.filter(
        (item) => item.verification === "Pending review",
      ).length,
      verified: incidents.filter(
        (item) => item.verification === "Verified",
      ).length,
    }),
    [incidents],
  );

  const filteredIncidents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return incidents
      .filter((incident) => {
        const matchesSearch =
          !query ||
          [
            incident.road,
            incident.location,
            incident.description,
            incident.id.toString(),
            typeLabels[incident.type],
          ].some((value) => value.toLowerCase().includes(query));

        const matchesSeverity =
          severityFilter === "ALL" ||
          incident.severity === severityFilter;

        const matchesType =
          typeFilter === "ALL" || incident.type === typeFilter;

        const matchesStatus =
          statusFilter === "ALL" ||
          incident.verification === statusFilter;

        return (
          matchesSearch &&
          matchesSeverity &&
          matchesType &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        const difference =
          new Date(b.reportedAt).getTime() -
          new Date(a.reportedAt).getTime();

        return sortNewest ? difference : -difference;
      });
  }, [
    incidents,
    search,
    severityFilter,
    typeFilter,
    statusFilter,
    sortNewest,
  ]);

  function resetFilters() {
    setSearch("");
    setSeverityFilter("ALL");
    setTypeFilter("ALL");
    setStatusFilter("ALL");
  }

  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (
      !form.road.trim() ||
      !form.location.trim() ||
      !form.occurredAt ||
      !form.description.trim()
    ) {
      setFormError("Please complete all required fields.");
      return;
    }

    const occurredDate = new Date(form.occurredAt);

    if (Number.isNaN(occurredDate.getTime())) {
      setFormError("Please enter a valid occurrence date and time.");
      return;
    }

    if (occurredDate.getTime() > Date.now()) {
      setFormError("The occurrence time cannot be in the future.");
      return;
    }

    const newIncident: Incident = {
      id:
        Math.max(1000, ...incidents.map((incident) => incident.id)) + 1,
      type: form.type,
      severity: form.severity,
      road: form.road.trim(),
      location: form.location.trim(),
      occurredAt: form.occurredAt,
      reportedAt: new Date().toISOString(),
      verification: "Pending review",
      description: form.description.trim(),
      actionTaken: "Awaiting administrator review.",
    };

    setIncidents((previous) => [newIncident, ...previous]);
    setSearch("");
    setSeverityFilter("ALL");
    setTypeFilter("ALL");
    setStatusFilter("ALL");
    setSortNewest(true);
    setShowReportForm(false);
    setForm({
      type: "OTHER",
      severity: "MEDIUM",
      road: "",
      location: "",
      occurredAt: "",
      description: "",
    });
    setNotice(`Incident #${newIncident.id} added for review.`);
    setTimeout(() => setNotice(""), 4000);
  }

  function closeReportForm() {
    setShowReportForm(false);
    setFormError("");
  }

  function markVerified(incident: Incident) {
    setIncidents((previous) =>
      previous.map((item) =>
        item.id === incident.id
          ? {
              ...item,
              verification: "Verified",
              actionTaken: "Marked as verified in this demo.",
            }
          : item,
      ),
    );

    setSelectedIncident({
      ...incident,
      verification: "Verified",
      actionTaken: "Marked as verified in this demo.",
    });
  }

  return (
    <div className="space-y-7 pb-10">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#64748B]">
            <ShieldCheck size={16} className="text-[#648CC7]" />
            Safety monitoring
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
            Safety incidents
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
            Review reported incidents, identify safety concerns, and keep
            community reports organized in one place.
          </p>
        </div>

        <button
          onClick={() => setShowReportForm(true)}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#172033] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#293750]"
        >
          <Plus size={18} />
          Report an incident
        </button>
      </section>

      {/* Demo notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#D9E6F7] bg-[#EDF4FD] px-4 py-3">
        <AlertTriangle
          size={19}
          className="mt-0.5 shrink-0 text-[#5079B4]"
        />
        <div>
          <p className="text-sm font-semibold text-[#294B78]">
            Demonstration data
          </p>
          <p className="mt-0.5 text-sm leading-5 text-[#526A89]">
            These are illustrative records, not live community reports.
            Changes made here are temporary and are not sent to an authority.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total incidents"
          value={stats.total}
          description="Reports in this demo"
          icon={<FileWarning size={20} />}
          iconClass="bg-[#EAF2FD] text-[#4B76B7]"
        />
        <StatCard
          label="High severity"
          value={stats.high}
          description="Reports marked high"
          icon={<AlertTriangle size={20} />}
          iconClass="bg-rose-50 text-rose-600"
        />
        <StatCard
          label="Pending review"
          value={stats.pending}
          description="Awaiting verification"
          icon={<Clock3 size={20} />}
          iconClass="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Verified reports"
          value={stats.verified}
          description="Reviewed in this demo"
          icon={<ShieldCheck size={20} />}
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </section>

      {/* Incidents table */}
      <section className="overflow-hidden rounded-2xl border border-[#E1E7F0] bg-white shadow-sm">
        <div className="border-b border-[#E8EDF4] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-[#172033]">
                Incident reports
              </h2>
              <p className="mt-1 text-sm text-[#64748B]">
                Browse and filter community-submitted reports.
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#F1F5FA] px-3 py-1.5 text-xs font-semibold text-[#526178]">
              {filteredIncidents.length} of {incidents.length} reports
            </span>
          </div>

          {/* Search */}
          <div className="mt-5 flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8794A7]"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search road, location, type, or report ID..."
                className="h-11 w-full rounded-xl border border-[#DCE3ED] bg-white pl-10 pr-4 text-sm text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#83ACE5] focus:ring-2 focus:ring-[#A5C5F0]/40"
              />
            </div>

            <button
              onClick={() => setSortNewest((previous) => !previous)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DCE3ED] px-4 text-sm font-semibold text-[#526178] transition hover:bg-[#F5F7FB]"
            >
              <ArrowDownUp size={16} />
              {sortNewest ? "Newest first" : "Oldest first"}
            </button>
          </div>

          {/* Filters */}
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <FilterSelect
              label="Severity"
              value={severityFilter}
              onChange={setSeverityFilter}
              options={[
                ["ALL", "All severities"],
                ["HIGH", "High"],
                ["MEDIUM", "Medium"],
                ["LOW", "Low"],
              ]}
            />

            <FilterSelect
              label="Incident type"
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                ["ALL", "All incident types"],
                ["HARASSMENT", "Harassment"],
                ["THEFT", "Theft"],
                ["ACCIDENT", "Accident"],
                ["OTHER", "Other"],
              ]}
            />

            <FilterSelect
              label="Verification"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                ["ALL", "All statuses"],
                ["Verified", "Verified"],
                ["Pending review", "Pending review"],
              ]}
            />
          </div>

          {(search ||
            severityFilter !== "ALL" ||
            typeFilter !== "ALL" ||
            statusFilter !== "ALL") && (
            <button
              onClick={resetFilters}
              className="mt-3 text-sm font-semibold text-[#5079B4] hover:text-[#294B78]"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-[#F8FAFD]">
              <tr className="border-b border-[#E8EDF4] text-xs font-bold uppercase tracking-wider text-[#7B8798]">
                <th className="px-6 py-4">Incident</th>
                <th className="px-4 py-4">Severity</th>
                <th className="px-4 py-4">Reported</th>
                <th className="px-4 py-4">Verification</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EDF1F6]">
              {filteredIncidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="transition hover:bg-[#FAFBFE]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F4FA] text-[#5D7394]">
                        <AlertTriangle size={19} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#172033]">
                          {typeLabels[incident.type]}
                        </p>
                        <p className="mt-0.5 text-xs text-[#718096]">
                          #{incident.id}
                        </p>
                        <p className="mt-2 flex items-start gap-1.5 text-sm text-[#526178]">
                          <MapPin
                            size={14}
                            className="mt-0.5 shrink-0 text-[#8492A6]"
                          />
                          <span>
                            {incident.road}
                            <span className="block text-xs text-[#8794A7]">
                              {incident.location}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <SeverityBadge severity={incident.severity} />
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-[#344054]">
                      {formatShortDate(incident.reportedAt)}
                    </p>
                    <p className="mt-1 text-xs text-[#8794A7]">
                      {new Date(incident.reportedAt).toLocaleTimeString(
                        "en-IN",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <VerificationBadge
                      verification={incident.verification}
                    />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedIncident(incident)}
                      aria-label={`View incident ${incident.id}`}
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-[#DCE3ED] px-3 text-sm font-semibold text-[#526178] transition hover:border-[#A5C5F0] hover:bg-[#F0F5FD] hover:text-[#294B78]"
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-[#E8EDF4] md:hidden">
          {filteredIncidents.map((incident) => (
            <button
              key={incident.id}
              onClick={() => setSelectedIncident(incident)}
              className="w-full p-4 text-left transition hover:bg-[#F8FAFD]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F4FA] text-[#5D7394]">
                    <AlertTriangle size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#172033]">
                      {typeLabels[incident.type]}
                    </p>
                    <p className="mt-0.5 text-xs text-[#8794A7]">
                      #{incident.id}
                    </p>
                    <p className="mt-2 text-sm text-[#526178]">
                      {incident.road}
                    </p>
                    <p className="mt-1 text-xs text-[#8794A7]">
                      {formatShortDate(incident.reportedAt)}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={17}
                  className="mt-1 shrink-0 text-[#8794A7]"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <SeverityBadge severity={incident.severity} />
                <VerificationBadge verification={incident.verification} />
              </div>
            </button>
          ))}
        </div>

        {/* Empty state */}
        {filteredIncidents.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0F4FA] text-[#7B8CA6]">
              <Filter size={24} />
            </div>
            <h3 className="mt-4 font-bold text-[#172033]">
              No incidents found
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#718096]">
              Try a different search term or clear your filters to see more
              reports.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-[#5079B4] hover:bg-[#F0F5FD]"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-[#E8EDF4] bg-[#FBFCFE] px-5 py-4 text-xs text-[#8794A7] sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing {filteredIncidents.length} incident
            {filteredIncidents.length === 1 ? "" : "s"}
          </span>
          <span>Demo records · Not connected to a live database</span>
        </div>
      </section>

      {/* Report form modal */}
      {showReportForm && (
        <Modal onClose={closeReportForm} title="Report an incident">
          <form onSubmit={submitReport} className="space-y-5">
            <p className="text-sm leading-6 text-[#64748B]">
              Provide the details of the incident. New reports will be marked
              as pending review in this demonstration.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Incident type">
                <select
                  value={form.type}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      type: event.target.value as IncidentType,
                    })
                  }
                  className={fieldClass}
                >
                  <option value="THEFT">Theft</option>
                  <option value="HARASSMENT">Harassment</option>
                  <option value="ACCIDENT">Accident</option>
                  <option value="OTHER">Other</option>
                </select>
              </FormField>

              <FormField label="Severity">
                <select
                  value={form.severity}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      severity: event.target.value as Severity,
                    })
                  }
                  className={fieldClass}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </FormField>
            </div>

            <FormField label="Road or street name">
              <input
                value={form.road}
                onChange={(event) =>
                  setForm({ ...form, road: event.target.value })
                }
                maxLength={150}
                placeholder="e.g. MG Road"
                className={fieldClass}
                required
              />
            </FormField>

            <FormField label="Specific location">
              <input
                value={form.location}
                onChange={(event) =>
                  setForm({ ...form, location: event.target.value })
                }
                maxLength={200}
                placeholder="e.g. Near the metro entrance"
                className={fieldClass}
                required
              />
            </FormField>

            <FormField label="When did it occur?">
              <input
                type="datetime-local"
                value={form.occurredAt}
                onChange={(event) =>
                  setForm({ ...form, occurredAt: event.target.value })
                }
                max={new Date().toISOString().slice(0, 16)}
                className={fieldClass}
                required
              />
            </FormField>

            <FormField label="Incident description">
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                maxLength={1000}
                rows={4}
                placeholder="Describe what happened and any relevant safety concerns..."
                className={`${fieldClass} resize-y`}
                required
              />
              <p className="mt-1 text-right text-xs text-[#8794A7]">
                {form.description.length}/1000
              </p>
            </FormField>

            {formError && (
              <p
                role="alert"
                className="rounded-lg bg-rose-50 px-3 py-2.5 text-sm text-rose-700"
              >
                {formError}
              </p>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-[#E8EDF4] pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeReportForm}
                className="rounded-xl border border-[#DCE3ED] px-5 py-3 text-sm font-semibold text-[#526178] hover:bg-[#F5F7FB]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172033] px-5 py-3 text-sm font-semibold text-white hover:bg-[#293750]"
              >
                <Plus size={17} />
                Submit report
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Incident detail modal */}
      {selectedIncident && (
        <Modal
          onClose={() => setSelectedIncident(null)}
          title={`Incident #${selectedIncident.id}`}
        >
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#EEF3FA] px-3 py-1 text-xs font-bold text-[#526178]">
                {typeLabels[selectedIncident.type]}
              </span>
              <SeverityBadge severity={selectedIncident.severity} />
              <VerificationBadge
                verification={selectedIncident.verification}
              />
            </div>

            <div className="rounded-xl border border-[#E1E7F0] bg-[#F8FAFD] p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#344054]">
                <MapPin size={17} className="text-[#648CC7]" />
                Location
              </p>
              <p className="mt-2 font-bold text-[#172033]">
                {selectedIncident.road}
              </p>
              <p className="mt-1 text-sm text-[#64748B]">
                {selectedIncident.location}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8794A7]">
                  Occurred at
                </p>
                <p className="mt-1.5 text-sm font-medium leading-6 text-[#344054]">
                  {formatDate(selectedIncident.occurredAt)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8794A7]">
                  Reported at
                </p>
                <p className="mt-1.5 text-sm font-medium leading-6 text-[#344054]">
                  {formatDate(selectedIncident.reportedAt)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8794A7]">
                Description
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#526178]">
                {selectedIncident.description}
              </p>
            </div>

            <div className="rounded-xl border border-[#E1E7F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#8794A7]">
                Review notes
              </p>
              <p className="mt-2 text-sm leading-6 text-[#526178]">
                {selectedIncident.actionTaken}
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-[#E8EDF4] pt-4 sm:flex-row sm:justify-between">
              <button
                onClick={() => setSelectedIncident(null)}
                className="rounded-xl border border-[#DCE3ED] px-5 py-3 text-sm font-semibold text-[#526178] hover:bg-[#F5F7FB]"
              >
                Close
              </button>

              {selectedIncident.verification === "Pending review" && (
                <button
                  onClick={() => markVerified(selectedIncident)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172033] px-5 py-3 text-sm font-semibold text-white hover:bg-[#293750]"
                >
                  <Check size={17} />
                  Mark as verified
                </button>
              )}
            </div>

            <p className="text-xs leading-5 text-[#8794A7]">
              Verification is a demonstration-only action. No actual
              administrator review or external notification occurs.
            </p>
          </div>
        </Modal>
      )}

      {/* Success notification */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-xl"
        >
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0 text-emerald-600"
          />
          <p className="text-sm font-medium leading-6 text-[#344054]">
            {notice}
          </p>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
            className="text-[#8794A7] hover:text-[#344054]"
          >
            <X size={17} />
          </button>
        </div>
      )}
    </div>
  );
}

const fieldClass =
  "w-full rounded-xl border border-[#DCE3ED] bg-white px-3.5 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#98A2B3] focus:border-[#83ACE5] focus:ring-2 focus:ring-[#A5C5F0]/40";

function StatCard({
  label,
  value,
  description,
  icon,
  iconClass,
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E1E7F0] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#64748B]">{label}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033]">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 text-xs text-[#8794A7]">{description}</p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-xs font-semibold text-[#64748B]">
        {label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-[#DCE3ED] bg-white px-3 text-sm text-[#344054] outline-none focus:border-[#83ACE5] focus:ring-2 focus:ring-[#A5C5F0]/40"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#344054]">
        {label}
      </label>
      {children}
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#101828]/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E8EDF4] bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8794A7]">
              Avenza safety
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#172033]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#64748B] transition hover:bg-[#F0F3F8] hover:text-[#172033]"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}
