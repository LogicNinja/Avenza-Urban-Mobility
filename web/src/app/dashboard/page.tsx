
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BusFront,
  Map,
  MapPin,
  ShieldAlert,
  Signpost,
} from "lucide-react";

const metrics = [
  {
    label: "Registered routes",
    value: "—",
    note: "Predefined walking routes",
    icon: Map,
  },
  {
    label: "Road segments",
    value: "—",
    note: "Tracked road infrastructure",
    icon: Signpost,
  },
  {
    label: "Safety incidents",
    value: "—",
    note: "Reported incidents",
    icon: ShieldAlert,
  },
  {
    label: "Transport stops",
    value: "—",
    note: "Nearby mobility connections",
    icon: BusFront,
  },
];

const shortcuts = [
  {
    title: "Explore routes",
    description: "Review predefined routes and their road segments.",
    href: "/dashboard/routes",
    icon: Map,
  },
  {
    title: "Road infrastructure",
    description: "Inspect road conditions, lighting, and accessibility.",
    href: "/dashboard/segments",
    icon: Signpost,
  },
  {
    title: "Safety incidents",
    description: "Review reported incidents and their severity.",
    href: "/dashboard/incidents",
    icon: ShieldAlert,
  },
  {
    title: "Transport network",
    description: "Explore stops and their connections to road segments.",
    href: "/dashboard/transport",
    icon: BusFront,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 rounded-3xl bg-[#172033] p-7 text-white sm:p-9 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#C9DDF8]">
            <span className="h-2 w-2 rounded-full bg-[#A5C5F0]" />
            URBAN MOBILITY OVERVIEW
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Understand the streets around you.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">
            Explore routes, infrastructure quality, pedestrian density,
            public transport, and reported safety incidents in one place.
          </p>
        </div>

        <Link
          href="/dashboard/routes"
          style={{ color: "#172033" }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#A5C5F0] px-5 py-3.5 font-bold transition hover:bg-[#C0D7F5]"
        >
          Explore routes <ArrowRight size={18} />
        </Link>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Database overview
            </h2>
            <p className="mt-1 text-sm text-[#58677D]">
              Key resources tracked by Avenza.
            </p>
          </div>
          <span className="rounded-lg border border-[#E1E7F0] bg-white px-3 py-2 text-xs font-semibold text-[#58677D]">
            Awaiting database connection
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="rounded-2xl border border-[#E1E7F0] bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[#58677D]">
                    {metric.label}
                  </p>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FD] text-[#496FA8]">
                    <Icon size={20} />
                  </div>
                </div>
                <p className="mt-5 text-4xl font-extrabold tracking-tight text-[#172033]">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-[#58677D]">{metric.note}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-[#E1E7F0] bg-white p-6 sm:p-7 xl:col-span-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Explore the database</h2>
              <p className="mt-1 text-sm text-[#58677D]">
                Jump into the data behind each part of Avenza.
              </p>
            </div>
            <div className="rounded-xl bg-[#EAF2FD] p-3 text-[#496FA8]">
              <MapPin size={22} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {shortcuts.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-xl border border-[#E1E7F0] p-4 transition hover:border-[#A5C5F0] hover:bg-[#F8FAFD]"
                >
                  <div className="flex items-center justify-between">
                    <Icon size={21} className="text-[#668EC6]" />
                    <ArrowUpRight
                      size={18}
                      className="text-[#8A9AB1] transition group-hover:text-[#294C7C]"
                    />
                  </div>
                  <h3 className="mt-4 font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#58677D]">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E1E7F0] bg-white p-6 sm:p-7">
          <h2 className="text-xl font-bold">Data quality checklist</h2>
          <p className="mt-1 text-sm leading-6 text-[#58677D]">
            Important checks for a reliable mobility database.
          </p>

          <div className="mt-6 space-y-5">
            <ChecklistItem
              title="Infrastructure ratings"
              description="Check lighting, road condition, and accessibility."
            />
            <ChecklistItem
              title="Incident integrity"
              description="Verify incident timestamps and severity values."
            />
            <ChecklistItem
              title="Transport connections"
              description="Check stop distances and segment associations."
            />
            <ChecklistItem
              title="Pedestrian observations"
              description="Validate density levels and observation timestamps."
            />
          </div>

          <div className="mt-6 rounded-xl bg-[#EDF3FB] p-4">
            <p className="text-sm font-bold text-[#294C7C]">
              Next step
            </p>
            <p className="mt-1 text-sm leading-6 text-[#42536D]">
              Connect the MySQL database to replace placeholders with live
              counts and verification results.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E1E7F0] bg-white p-6 sm:p-7">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">Recent activity</h2>
            <p className="mt-1 text-sm text-[#58677D]">
              Database activity will appear here once connected.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#F1F4F8] px-3 py-1.5 text-xs font-semibold text-[#58677D]">
            <span className="h-2 w-2 rounded-full bg-[#9AA9BC]" />
            No live activity yet
          </span>
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-[#D6DFEC] px-5 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF2FD] text-[#496FA8]">
            <ShieldAlert size={23} />
          </div>
          <h3 className="mt-4 font-bold">Activity feed not connected</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#58677D]">
            Once the API is connected to MySQL, we can display real incident
            reports, infrastructure changes, and other database activity.
          </p>
        </div>
      </section>

      <p className="text-center text-xs text-[#8A9AB1]">
        AVENZA · URBAN MOBILITY & PEDESTRIAN SAFETY
      </p>
    </div>
  );
}

function ChecklistItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF2FD] text-[#496FA8]">
        <ArrowDownRight size={15} />
      </div>
      <div>
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#58677D]">
          {description}
        </p>
      </div>
    </div>
  );
}
