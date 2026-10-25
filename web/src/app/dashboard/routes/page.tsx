
"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Clock3,
  MapPin,
  Route as RouteIcon,
  Search,
  X,
} from "lucide-react";

type RouteRecord = {
  id: number;
  name: string;
  origin: string;
  destination: string;
  segments: number;
  distance: number;
  status: "Available" | "Under review";
};

const sampleRoutes: RouteRecord[] = [
  {
    id: 1,
    name: "Central Walkway",
    origin: "Central Square",
    destination: "City Library",
    segments: 4,
    distance: 1.2,
    status: "Available",
  },
  {
    id: 2,
    name: "Market Connector",
    origin: "Market Street",
    destination: "Transit Hub",
    segments: 5,
    distance: 1.8,
    status: "Available",
  },
  {
    id: 3,
    name: "Parkside Route",
    origin: "Community Park",
    destination: "Residential Block",
    segments: 3,
    distance: 0.9,
    status: "Under review",
  },
  {
    id: 4,
    name: "Campus Link",
    origin: "University Gate",
    destination: "Metro Entrance",
    segments: 6,
    distance: 2.1,
    status: "Available",
  },
  {
    id: 5,
    name: "Riverside Walk",
    origin: "River Promenade",
    destination: "Bus Terminal",
    segments: 4,
    distance: 1.5,
    status: "Under review",
  },
];

export default function RoutesPage() {
  const [routes, setRoutes] = useState(sampleRoutes);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("name");
  const [selected, setSelected] = useState<RouteRecord | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [message, setMessage] = useState("");

  const filteredRoutes = useMemo(() => {
    const query = search.trim().toLowerCase();

    return routes
      .filter((route) => {
        const matchesSearch = [
          route.name,
          route.origin,
          route.destination,
        ].some((value) => value.toLowerCase().includes(query));

        const matchesStatus =
          status === "All" || route.status === status;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sort === "distance") return a.distance - b.distance;
        if (sort === "segments") return a.segments - b.segments;
        return a.name.localeCompare(b.name);
      });
  }, [routes, search, status, sort]);

  function addRoute(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedDistance = Number(distance);

    if (!name.trim() || !origin.trim() || !destination.trim()) {
      setMessage("Please complete all fields.");
      return;
    }

    if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) {
      setMessage("Origin and destination must be different.");
      return;
    }

    if (!Number.isFinite(parsedDistance) || parsedDistance <= 0) {
      setMessage("Distance must be greater than zero.");
      return;
    }

    const newRoute: RouteRecord = {
      id: Math.max(0, ...routes.map((route) => route.id)) + 1,
      name: name.trim(),
      origin: origin.trim(),
      destination: destination.trim(),
      segments: 0,
      distance: parsedDistance,
      status: "Under review",
    };

    setRoutes((current) => [...current, newRoute]);
    setName("");
    setOrigin("");
    setDestination("");
    setDistance("");
    setMessage("");
    setShowForm(false);
  }

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-[#668EC6]">
            MOBILITY MANAGEMENT
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Routes
          </h2>
          <p className="mt-2 text-base text-[#58677D]">
            Explore predefined walking routes and their connections.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setMessage("");
          }}
          className="rounded-xl bg-[#172033] px-5 py-3 font-bold text-white transition hover:bg-[#293951]"
        >
          {showForm ? "Cancel" : "+ Add route"}
        </button>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Summary label="Matching routes" value={filteredRoutes.length.toString()} />
        <Summary
          label="Available"
          value={filteredRoutes.filter((r) => r.status === "Available").length.toString()}
        />
        <Summary
          label="Under review"
          value={filteredRoutes.filter((r) => r.status === "Under review").length.toString()}
        />
      </div>

      {showForm && (
        <form
          onSubmit={addRoute}
          className="space-y-5 rounded-2xl border border-[#E1E7F0] bg-white p-6 sm:p-8"
        >
          <div>
            <h3 className="text-xl font-bold">Add a route</h3>
            <p className="mt-1 text-sm text-[#58677D]">
              This creates a temporary local entry, not a database record.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Route name">
              <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="e.g. Riverside Connector" />
            </Field>
            <Field label="Distance (km)">
              <input required type="number" min="0.01" step="0.01" value={distance} onChange={(e) => setDistance(e.target.value)} className={inputClass} placeholder="e.g. 1.4" />
            </Field>
            <Field label="Origin">
              <input required value={origin} onChange={(e) => setOrigin(e.target.value)} className={inputClass} placeholder="Starting point" />
            </Field>
            <Field label="Destination">
              <input required value={destination} onChange={(e) => setDestination(e.target.value)} className={inputClass} placeholder="Ending point" />
            </Field>
          </div>

          {message && <p className="text-sm font-semibold text-red-600">{message}</p>}

          <button type="submit" className="rounded-xl bg-[#A5C5F0] px-6 py-3 font-bold text-[#172033] hover:bg-[#8FB5EA]">
            Save demo route
          </button>
        </form>
      )}

      <section className="overflow-hidden rounded-2xl border border-[#E1E7F0] bg-white">
        <div className="border-b border-[#E1E7F0] p-5 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9AB1]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search routes, origins, destinations..."
                className={`${inputClass} pl-11`}
              />
            </div>

            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
              <option value="All">All statuses</option>
              <option value="Available">Available</option>
              <option value="Under review">Under review</option>
            </select>

            <select value={sort} onChange={(e) => setSort(e.target.value)} className={inputClass}>
              <option value="name">Sort by name</option>
              <option value="distance">Sort by distance</option>
              <option value="segments">Sort by segments</option>
            </select>
          </div>

          <p className="mt-3 text-sm text-[#58677D]">
            Showing {filteredRoutes.length} of {routes.length} demo routes
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-[#F8FAFD] text-xs uppercase tracking-wider text-[#58677D]">
              <tr>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Distance</th>
                <th className="px-6 py-4">Segments</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1E7F0]">
              {filteredRoutes.map((route) => (
                <tr key={route.id} className="transition hover:bg-[#F8FAFD]">
                  <td className="px-6 py-5">
                    <p className="font-bold">{route.name}</p>
                    <p className="mt-1 text-sm text-[#58677D]">
                      {route.origin} → {route.destination}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold">{route.distance.toFixed(1)} km</td>
                  <td className="px-6 py-5 text-sm">{route.segments}</td>
                  <td className="px-6 py-5">
                    <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${route.status === "Available" ? "bg-[#E6F4EC] text-[#237451]" : "bg-[#FFF3D9] text-[#8A5B0A]"}`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <button onClick={() => setSelected(route)} className="font-bold text-[#496FA8] hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRoutes.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <RouteIcon size={28} className="mx-auto text-[#8A9AB1]" />
                    <p className="mt-3 font-bold">No matching routes</p>
                    <p className="mt-1 text-sm text-[#58677D]">Try changing your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172033]/40 p-4" onClick={() => setSelected(null)}>
          <section role="dialog" aria-modal="true" aria-labelledby="route-dialog-title" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#668EC6]">ROUTE DETAILS</p>
                <h3 id="route-dialog-title" className="mt-2 text-2xl font-extrabold">{selected.name}</h3>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Close details" className="rounded-lg p-2 hover:bg-[#F5F7FB]">
                <X size={21} />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <Detail label="Origin" value={selected.origin} />
              <Detail label="Destination" value={selected.destination} />
              <Detail label="Distance" value={`${selected.distance.toFixed(1)} km`} />
              <Detail label="Road segments" value={selected.segments.toString()} />
              <Detail label="Status" value={selected.status} />
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-[#58677D]">
              <Clock3 size={15} />
              Sample information only. Database integration is pending.
            </p>

            <button onClick={() => setSelected(null)} className="mt-6 w-full rounded-xl bg-[#172033] py-3 font-bold text-white hover:bg-[#293951]">
              Close
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#D6DFEC] bg-white px-4 py-3 text-sm text-[#172033] outline-none transition placeholder:text-[#8A9AB1] focus:border-[#83ACE5] focus:ring-2 focus:ring-[#A5C5F0]/40";

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E1E7F0] bg-white p-5">
      <p className="text-sm font-semibold text-[#58677D]">{label}</p>
      <p className="mt-3 text-3xl font-extrabold">{value}</p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-bold">{label}</span>
      {children}
    </label>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#E1E7F0] pb-3">
      <span className="text-sm text-[#58677D]">{label}</span>
      <span className="text-right text-sm font-bold">{value}</span>
    </div>
  );
}
