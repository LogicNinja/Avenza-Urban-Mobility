
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Accessibility,
  BusFront,
  MapPin,
  Navigation,
  Route,
  Footprints,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB]">
      <header className="border-b border-[#E1E7F0] bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A5C5F0] text-[#172033]">
              <Navigation size={23} strokeWidth={2.5} />
            </div>
            <div>
              <span className="block text-xl font-extrabold tracking-tight text-[#172033]">
                avenza
              </span>
              <span className="block text-xs font-medium tracking-wide text-[#58677D]">
                MOVE WITH CONFIDENCE
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-9 text-sm font-semibold text-[#58677D] md:flex">
            <a href="#features" className="transition hover:text-[#172033]">
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition hover:text-[#172033]"
            >
              How it works
            </a>
          </div>

          <Link
            href="/dashboard"
            style={{ color: "#172033" }}
            className="flex items-center gap-2 rounded-xl bg-[#A5C5F0] px-5 py-3 text-sm font-bold transition hover:bg-[#8FB5EA]"
          >
            Open dashboard <ArrowUpRight size={17} />
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D4E3F8] bg-[#EAF2FD] px-4 py-2 text-sm font-semibold text-[#294C7C]">
            <span className="h-2 w-2 rounded-full bg-[#739BD3]" />
            Urban mobility, rethought
          </div>

          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.12] tracking-[-0.055em] text-[#172033] sm:text-6xl lg:text-7xl">
            Your city.
            <br />
            Your route.
            <br />
            <span className="text-[#668EC6]">Your confidence.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#58677D] sm:text-xl sm:leading-9">
            A better way to think about getting there. Explore pedestrian
            routes through the lens of infrastructure, accessibility,
            public transport, and reported safety incidents.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              style={{ color: "#FFFFFF" }}
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#172033] px-7 py-4 font-bold transition hover:bg-[#293951] hover:shadow-md"
            >
              Explore Avenza <ArrowRight size={19} />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-[#D6DFEC] bg-white px-7 py-4 font-bold text-[#172033] transition hover:bg-[#EDF3FB]"
            >
              Discover features
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[#58677D]">
            <span className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#668EC6]" />
              Safety-aware insights
            </span>
            <span className="flex items-center gap-2">
              <Accessibility size={18} className="text-[#668EC6]" />
              Accessibility matters
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-4 -top-5 h-32 w-32 rounded-full bg-[#DCE9FA] blur-2xl" />

          <div className="relative overflow-hidden rounded-[28px] border border-[#E1E7F0] bg-white p-5 shadow-[0_20px_70px_rgba(39,64,100,0.10)] sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#58677D]">
                  ROUTE EXPLORER
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#172033]">
                  Find your way
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FD] text-[#496FA8]">
                <MapPin size={24} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#E1E7F0] bg-[#F8FAFD] p-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#58677D]">
                  Start point
                </span>
                <p className="mt-1 font-bold text-[#172033]">
                  Your location
                </p>
              </div>
              <div className="rounded-xl border border-[#E1E7F0] bg-[#F8FAFD] p-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#58677D]">
                  Destination
                </span>
                <p className="mt-1 font-bold text-[#172033]">Where to?</p>
              </div>
            </div>

            <div className="relative mt-5 h-64 overflow-hidden rounded-2xl bg-[#EDF2F8] sm:h-72">
              <div className="absolute inset-0 opacity-70">
                <div className="absolute left-[18%] top-[-10%] h-[120%] w-5 rotate-[25deg] rounded-full bg-white" />
                <div className="absolute left-[56%] top-[-10%] h-[120%] w-7 rotate-[-22deg] rounded-full bg-white" />
                <div className="absolute left-[-10%] top-[35%] h-5 w-[120%] rotate-[8deg] rounded-full bg-white" />
                <div className="absolute left-[-10%] top-[72%] h-7 w-[120%] rotate-[-12deg] rounded-full bg-white" />
                <div className="absolute left-[7%] top-[15%] h-16 w-24 rounded-2xl bg-[#DCE9D9]" />
                <div className="absolute right-[8%] top-[12%] h-20 w-24 rounded-2xl bg-[#DCE9D9]" />
                <div className="absolute bottom-[10%] left-[28%] h-16 w-28 rounded-2xl bg-[#DCE9D9]" />
                <div className="absolute bottom-[14%] right-[8%] h-16 w-20 rounded-2xl bg-[#DCE9D9]" />
              </div>

              <svg
                viewBox="0 0 400 280"
                className="absolute inset-0 h-full w-full"
                fill="none"
                aria-label="Illustration of a route between two map points"
              >
                <path
                  d="M68 222 C90 205 108 185 142 185 S186 215 213 169 S260 118 280 131 S317 91 342 54"
                  stroke="#FFFFFF"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M68 222 C90 205 108 185 142 185 S186 215 213 169 S260 118 280 131 S317 91 342 54"
                  stroke="#668EC6"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle
                  cx="68"
                  cy="222"
                  r="13"
                  fill="#172033"
                  stroke="white"
                  strokeWidth="5"
                />
                <circle
                  cx="342"
                  cy="54"
                  r="15"
                  fill="#A5C5F0"
                  stroke="white"
                  strokeWidth="5"
                />
              </svg>

              <div className="absolute bottom-4 left-4 rounded-xl border border-white/80 bg-white/95 px-3 py-2 shadow-sm">
                <p className="text-xs font-semibold text-[#58677D]">
                  ROUTE PREVIEW
                </p>
                <p className="font-bold text-[#172033]">
                  Explore road segments
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <MapFeature icon={<Route size={18} />} label="Routes" />
              <MapFeature icon={<Footprints size={18} />} label="Walkability" />
              <MapFeature icon={<BusFront size={18} />} label="Transport" />
            </div>

            <p className="mt-4 text-xs leading-5 text-[#58677D]">
              Illustrative preview. Route data and map functionality will be
              connected to the Avenza database as we build the application.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E1E7F0] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3 lg:px-10">
          <Stat
            title="Infrastructure"
            description="Lighting, road condition, and accessibility ratings"
          />
          <Stat
            title="Safety insights"
            description="Reported incidents and their severity"
          />
          <Stat
            title="Urban connectivity"
            description="Pedestrian density and nearby transport stops"
          />
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#668EC6]">
            Built around the journey
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#172033] sm:text-5xl">
            More context.
            <br />
            Better-informed decisions.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#58677D]">
            Avenza brings important urban mobility information together
            so route assessment goes beyond distance alone.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Feature
            icon={<ShieldCheck size={25} />}
            number="01"
            title="Safety-aware routes"
            description="Review reported incidents and severity information associated with road segments."
          />
          <Feature
            icon={<Accessibility size={25} />}
            number="02"
            title="Accessible streets"
            description="Consider street lighting, road conditions, and accessibility ratings."
          />
          <Feature
            icon={<BusFront size={25} />}
            number="03"
            title="Connected mobility"
            description="Explore pedestrian density observations and nearby transport stops."
          />
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 pb-20 lg:px-10"
      >
        <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] bg-[#E4EDFA] p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-[#496FA8]">
              Ready to explore?
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl">
              Get a clearer picture of your city.
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#42536D]">
              Explore the Avenza dashboard and its urban mobility data.
            </p>
          </div>

          <Link
            href="/dashboard"
            style={{ color: "#FFFFFF" }}
            className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#172033] px-7 py-4 font-bold transition hover:bg-[#293951] hover:shadow-md"
          >
            Open dashboard <ArrowRight size={19} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#E1E7F0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-7 text-sm text-[#58677D] sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-bold tracking-wide text-[#172033]">AVENZA</p>
          <p>Urban mobility & pedestrian safety</p>
          <p>Designed to move with confidence.</p>
        </div>
      </footer>
    </main>
  );
}

function MapFeature({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F5F7FB] px-2 py-4 text-center text-sm font-semibold text-[#33435C]">
      <span className="text-[#496FA8]">{icon}</span>
      {label}
    </div>
  );
}

function Stat({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 px-2 py-3">
      <div className="mt-1 h-12 w-1.5 shrink-0 rounded-full bg-[#A5C5F0]" />
      <div>
        <h3 className="text-xl font-bold text-[#172033]">{title}</h3>
        <p className="mt-1 text-base leading-7 text-[#58677D]">
          {description}
        </p>
      </div>
    </div>
  );
}

function Feature({
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="group rounded-2xl border border-[#E1E7F0] bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#A5C5F0] hover:shadow-lg sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2FD] text-[#496FA8] transition group-hover:bg-[#A5C5F0]">
          {icon}
        </div>
        <span className="text-sm font-bold tracking-widest text-[#8A9AB1]">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#172033]">
        {title}
      </h3>
      <p className="mt-3 text-base leading-8 text-[#58677D]">
        {description}
      </p>
    </article>
  );
}
