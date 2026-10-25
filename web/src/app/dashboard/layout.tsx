
import Link from "next/link";
import {
  Activity,
  BusFront,
  ChevronDown,
  LayoutDashboard,
  Map,
  MapPin,
  Menu,
  Settings,
  ShieldAlert,
  Signpost,
  Users,
} from "lucide-react";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Routes", href: "/dashboard/routes", icon: Map },
  { label: "Road segments", href: "/dashboard/segments", icon: Signpost },
  { label: "Safety incidents", href: "/dashboard/incidents", icon: ShieldAlert },
  { label: "Transport stops", href: "/dashboard/transport", icon: BusFront },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F7FB] text-[#172033] lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#E1E7F0] bg-white lg:flex">
        <Link href="/" className="flex items-center gap-3 border-b border-[#E1E7F0] px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A5C5F0]">
            <MapPin size={22} />
          </div>
          <div>
            <p className="text-xl font-extrabold tracking-tight">avenza</p>
            <p className="text-[10px] font-semibold tracking-[0.15em] text-[#58677D]">
              URBAN MOBILITY
            </p>
          </div>
        </Link>

        <div className="px-4 pt-8">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.15em] text-[#8A9AB1]">
            Workspace
          </p>
          <nav className="space-y-1">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const active = index === 0;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-[#EAF2FD] text-[#294C7C]"
                      : "text-[#58677D] hover:bg-[#F5F7FB] hover:text-[#172033]"
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-[#EDF3FB] p-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Activity size={18} className="text-[#496FA8]" />
              Project status
            </div>
            <p className="mt-2 text-xs leading-5 text-[#58677D]">
              Avenza urban mobility workspace.
            </p>
            <Link
              href="/"
              className="mt-3 inline-flex text-sm font-bold text-[#294C7C] hover:underline"
            >
              Visit homepage →
            </Link>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-[76px] items-center justify-between border-b border-[#E1E7F0] bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 text-[#58677D] lg:hidden">
              <Menu size={22} />
            </div>
            <div>
              <p className="text-xs font-medium text-[#58677D]">
                Avenza workspace
              </p>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Urban mobility dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">Guest user</p>
              <p className="text-xs text-[#58677D]">Preview mode</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A5C5F0] font-bold text-[#172033]">
              G
            </div>
            <ChevronDown size={16} className="hidden text-[#58677D] sm:block" />
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
