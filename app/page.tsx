import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-16">
      <section className="card relative w-full overflow-hidden p-10 md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-coral/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-sage/25 blur-3xl" />

        <p className="inline-flex rounded-full border border-slateBlue/20 bg-slateBlue/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slateBlue">
          MVP Scanner
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-tight md:text-5xl">
          Client Automation Opportunity Scanner
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--ink-soft)] md:text-lg">
          A fast assessment for small businesses to identify the top workflows worth automating first, based on impact,
          effort, and execution practicality.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="button-primary" href="/assessment">
            Start Assessment
          </Link>
        </div>
      </section>
    </main>
  );
}
