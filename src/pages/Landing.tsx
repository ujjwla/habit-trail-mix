import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="relative border-b bg-card/60 backdrop-blur backdrop-blur-ios supports-[backdrop-filter]:bg-card/40 sticky top-0 z-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-10 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-2xl">🌿</div>
              <div className="leading-tight">
                <div className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Habit Trail Mix
                </div>
                <div className="text-xs text-muted-foreground">Private • Fast • Free</div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
              <a href="#how" className="text-muted-foreground hover:text-foreground">How it works</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</a>
            </nav>

            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="hidden sm:inline-flex">
                <Link to="/tracker">Live Demo</Link>
              </Button>
              <Button asChild className="bg-gradient-primary hover:opacity-90 shadow-medium">
                <Link to="/tracker">Start Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              No sign-up. Local-first. Start in seconds.
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Build habits that last—
              <span className="bg-gradient-primary bg-clip-text text-transparent"> without friction</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Check off habits, visualize streaks, and unlock badges. Private by default, designed for speed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
                <Link to="/tracker">Start Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/tracker">See Live Demo</Link>
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-background" src="/favicon.ico" alt="avatar" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-background" src="/favicon.ico" alt="avatar" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-background" src="/favicon.ico" alt="avatar" />
                </span>
                <span>Trusted by focused people</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="aspect-[4/3] w-full rounded-lg bg-emerald-500 grid place-items-center text-black">
              <div className="text-center">
                <div className="text-6xl mb-3">🌱</div>
                <div className="font-medium">Your habit dashboard preview</div>
                <div className="text-sm">Create habits and watch your streaks grow</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          <Stat label="Local-first" value="100%" sub="Your data stays on your device" />
          <Stat label="Lightning-fast" value="<50ms" sub="Snappy interactions" />
          <Stat label="No sign-up" value="0 forms" sub="Start tracking instantly" />
        </div>

        <div id="features" className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            title="Daily Focus"
            emoji="✨"
            description="Quickly check off your habits and keep the momentum."
          />
          <Feature
            title="Monthly View"
            emoji="📅"
            description="Visualize streaks and spot patterns over time."
          />
          <Feature
            title="Achievements"
            emoji="🏆"
            description="Unlock badges as you hit meaningful milestones."
          />
        </div>

        <section id="how" className="mt-24">
          <h3 className="text-2xl font-bold mb-6">How it works</h3>
          <ol className="grid gap-6 sm:grid-cols-3">
            <Step index={1} title="Create habits" desc="Add the routines you want to build." />
            <Step index={2} title="Check them off" desc="Mark completion each day in seconds." />
            <Step index={3} title="See progress" desc="View streaks, insights, and badges." />
          </ol>
        </section>

        <section className="mt-24">
          <h3 className="text-2xl font-bold mb-6">What users are saying</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Testimonial quote="Finally a tracker that gets out of my way." name="Samira" />
            <Testimonial quote="The monthly view made my streaks click." name="Jordan" />
            <Testimonial quote="Love that it's private and super fast." name="Alex" />
          </div>
        </section>

        <section id="faq" className="mt-24">
          <h3 className="text-2xl font-bold mb-6">Frequently asked questions</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Where is my data stored?</AccordionTrigger>
              <AccordionContent>
                All data is stored locally in your browser. No account or server needed.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it free?</AccordionTrigger>
              <AccordionContent>
                Yes. This app is open and free to use.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I export my data?</AccordionTrigger>
              <AccordionContent>
                Export is on the roadmap. For now, you can back up your browser storage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <footer className="mt-24 border-t py-8 text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>© {new Date().getFullYear()} Habit Trail Mix</div>
            <div className="flex items-center gap-4">
              <Link to="/tracker" className="hover:underline">Open Tracker</Link>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:underline">Source</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

function Feature({ title, description, emoji }: { title: string; description: string; emoji?: string }) {
  return (
    <div className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary/40">
      <div className="text-xl font-semibold mb-2 flex items-center gap-2">
        {title}
        {emoji ? (
          <span
            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
            aria-hidden
          >
            {emoji}
          </span>
        ) : null}
      </div>
      <div className="text-muted-foreground">{description}</div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm mt-1">{label}</div>
      {sub ? <div className="text-muted-foreground text-xs mt-1">{sub}</div> : null}
    </div>
  );
}

function Step({ index, title, desc }: { index: number; title: string; desc: string }) {
  return (
    <li className="rounded-xl border bg-card p-6">
      <div className="text-primary font-semibold">Step {index}</div>
      <div className="text-lg font-medium mt-1">{title}</div>
      <div className="text-muted-foreground mt-1">{desc}</div>
    </li>
  );
}

function Testimonial({ quote, name }: { quote: string; name: string }) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="italic">“{quote}”</div>
      <div className="mt-3 text-sm text-muted-foreground">— {name}</div>
    </div>
  );
}

export default Landing;


