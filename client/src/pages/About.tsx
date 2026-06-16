/**
 * About.tsx — explains the formulas + tech stack + how to install on phone.
 */
import { Link } from "wouter";
import { Code2, Cpu, FlaskConical, Smartphone } from "lucide-react";

export default function About() {
  return (
    <div className="rise-in pb-2">
      <span className="pill text-orange-300 border-orange-500/30 bg-orange-500/10">
        <FlaskConical className="w-3 h-3" /> The Science (kind of)
      </span>
      <h1 className="font-display font-bold text-[1.9rem] leading-tight mt-3">
        How we calculate the <span className="text-orange-400 text-glow-orange">cook</span>.
      </h1>
      <p className="text-sm text-muted-foreground mt-1">
        Pseudo-scientific, fully unserious. Tuned to roast, not diagnose.
      </p>

      <section className="neon-card p-4 mt-5">
        <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground">
          Metrics
        </div>
        <ul className="mt-2 space-y-3 text-sm">
          <li>
            <span className="font-display font-semibold">Mental HP ❤️‍🔥</span>
            <div className="text-muted-foreground text-[13px]">
              60 − (stress × 7) + ((sleep − 4) × 6) + (wallet × 2), clamped 0–100.
            </div>
          </li>
          <li>
            <span className="font-display font-semibold">Brain Battery 🧠</span>
            <div className="text-muted-foreground text-[13px]">
              Coffee gives ramping returns until 4 cups, then diminishes. Sleep adds, stress drains.
            </div>
          </li>
          <li>
            <span className="font-display font-semibold">Sleep Debt 😴</span>
            <div className="text-muted-foreground text-[13px]">
              (8 − sleepHours) × 14 + stress × 2. Higher = worse.
            </div>
          </li>
          <li>
            <span className="font-display font-semibold">GPA Condition 🎓</span>
            <div className="text-muted-foreground text-[13px]">
              (gpa/4 × 70) + (attendance × 0.2) + 10 − missing × 3.
            </div>
          </li>
          <li>
            <span className="font-display font-semibold">Survival Probability 🛟</span>
            <div className="text-muted-foreground text-[13px]">
              Weighted blend of all metrics, minus exam-pressure penalty.
            </div>
          </li>
          <li>
            <span className="font-display font-semibold">Cooked Level 🔥</span>
            <div className="text-muted-foreground text-[13px]">
              100 − Survival + sleepDebt × 0.1 + missing × 1.5, then a random campus event modifies it.
            </div>
          </li>
        </ul>
      </section>

      <section className="neon-card neon-card-orange p-4 mt-4">
        <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-orange-300/90">
          Verdict Tiers
        </div>
        <ul className="mt-2 text-sm space-y-1.5 font-mono-stat">
          <li>0 – 29 → <span className="text-emerald-300">LOCKED IN 🧠⚡️</span></li>
          <li>30 – 54 → <span className="text-amber-300">MEDIUM COOKED 🍳😅</span></li>
          <li>55 – 79 → <span className="text-orange-300">EXTRA CRISPY COOKED 🔥💀</span></li>
          <li>80 – 100 → <span className="text-rose-300">ACADEMICALLY DECEASED ⚰️📉</span></li>
        </ul>
      </section>

      <section className="neon-card p-4 mt-4">
        <div className="flex items-center gap-2 text-[11px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground">
          <Cpu className="w-3.5 h-3.5" /> Tech
        </div>
        <p className="text-sm text-foreground/90 mt-2">
          Built with <strong>React 19 + TypeScript + Vite + Tailwind 4</strong>,
          Recharts for graphs, wouter for routing, sonner for toasts. Logic lives
          in a class-based engine (<code>CookedAnalyzer</code>) with custom
          exception handling (<code>InvalidInputError</code>) — mirrors Python
          OOP patterns. Data persists in <code>localStorage</code> and exports as
          JSON/CSV.
        </p>
      </section>

      <section className="neon-card neon-card-red p-4 mt-4">
        <div className="flex items-center gap-2 text-[11px] font-mono-stat tracking-[0.18em] uppercase text-rose-300/90">
          <Smartphone className="w-3.5 h-3.5" /> Install on phone
        </div>
        <ol className="mt-2 list-decimal pl-5 text-sm text-foreground/90 space-y-1">
          <li>Open the live URL in <strong>Safari</strong> (iOS) or <strong>Chrome</strong> (Android).</li>
          <li>Tap the <strong>Share</strong> button → <strong>Add to Home Screen</strong>.</li>
          <li>Launch it like a native app, full-screen, dark, neon.</li>
        </ol>
      </section>

      <section className="neon-card p-4 mt-4">
        <div className="flex items-center gap-2 text-[11px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground">
          <Code2 className="w-3.5 h-3.5" /> Disclaimer
        </div>
        <p className="text-sm text-foreground/85 mt-2">
          This is a meme. If you're genuinely struggling, please talk to your
          campus counseling center or someone you trust. Real help &gt;
          internet diagnosis.
        </p>
      </section>

      <div className="mt-5">
        <Link
          href="/quiz"
          className="btn-press w-full h-12 rounded-xl font-display font-semibold text-sm bg-gradient-to-b from-orange-500 to-rose-600 text-white shadow-[0_10px_30px_rgba(255,106,26,0.4)] inline-flex items-center justify-center gap-2"
        >
          🔥 Run the analysis
        </Link>
      </div>
    </div>
  );
}
