
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  Signpost,
  ShieldAlert,
  BusFront,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Routes",
    href: "/dashboard/routes",
    icon: Map,
  },
  {
    label: "Road segments",
    href: "/dashboard/segments",
    icon: Signpost,
  },
  {
    label: "Safety incidents",
    href: "/dashboard/incidents",
    icon: ShieldAlert,
  },
  {
    label: "Transport stops",
    href: "/dashboard/transport",
    icon: BusFront,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function NavigationLinks() {
    return (
      <nav className="space-y-1">
        {navigation.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-[#EAF2FD] text-[#172033]"
                  : "text-[#344054] hover:bg-[#F5F7FB]"
              }`}
            >
              <Icon size={21} strokeWidth={active ? 2.3 : 2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[#E1E7F0] bg-white px-4 py-3 lg:hidden">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-[#172033]">
          avenza<span className="text-[#83ACE5]">.</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E1E7F0] text-[#172033]"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-[#172033]/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#E1E7F0] bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center border-b border-[#E8EDF4] px-7">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-[#172033]"
          >
            avenza<span className="text-[#83ACE5]">.</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F5F7FB] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-6 sm:px-3">
          <p className="mb-3 px-4 text-xs font-bold uppercase tracking-[0.16em] text-[#8794A7]">
            Workspace
          </p>
          <NavigationLinks />
        </div>

        <div className="border-t border-[#E8EDF4] p-5">
          <div className="rounded-2xl bg-[#F5F7FB] p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#83ACE5]" />
              <p className="text-xs font-bold text-[#344054]">
                Avenza preview
              </p>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#718096]">
              Exploring safer, more accessible urban journeys.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
