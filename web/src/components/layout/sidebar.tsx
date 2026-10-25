
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BusFront,
  LayoutDashboard,
  Map,
  MapPin,
  Menu,
  ShieldAlert,
  Signpost,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Routes", href: "/dashboard/routes", icon: Map },
  { label: "Road segments", href: "/dashboard/segments", icon: Signpost },
  { label: "Safety incidents", href: "/dashboard/incidents", icon: ShieldAlert },
  { label: "Transport stops", href: "/dashboard/transport", icon: BusFront },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function NavigationLinks() {
    return (
      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
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
    );
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-[#58677D] hover:bg-[#F5F7FB] lg:hidden"
      >
        <Menu size={23} />
      </button>

      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#E1E7F0] bg-white lg:flex">
        <Link
          href="/"
          className="flex items-center gap-3 border-b border-[#E1E7F0] px-6 py-6"
        >
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
          <NavigationLinks />
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-[#EDF3FB] p-4">
            <div className="flex items-center gap-2 text-sm font-bold">
              <Activity size={18} className="text-[#496FA8]" />
              Project workspace
            </div>
            <p className="mt-2 text-xs leading-5 text-[#58677D]">
              Explore urban mobility information and safety data.
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

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#172033]/45"
          />

          <aside className="absolute inset-y-0 left-0 flex w-[min(300px,85vw)] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E1E7F0] px-5 py-5">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A5C5F0]">
                  <MapPin size={22} />
                </div>
                <span className="text-xl font-extrabold">avenza</span>
              </Link>

              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-[#F5F7FB]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="px-4 pt-7">
              <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-[#8A9AB1]">
                Workspace
              </p>
              <NavigationLinks />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
