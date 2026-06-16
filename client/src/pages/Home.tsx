/**
 * Home.tsx — landing page.
 * Design tokens: obsidian bg, hot-orange + ember-red neon, Space Grotesk display,
 * left-aligned title, asymmetric flame motif top-right.
 */
import { Link } from "wouter";
import { Flame, ArrowRight, Sparkles, Skull, Coffee } from "lucide-react";

const TIERS = [
  { tier: "LOCKED IN", emoji: "🧠⚡️", color: "from-emerald-400/20 to-emerald-500/5", ring: "ring-emerald-400/40", text: "text-emerald-300" },
  { tier: "MEDIUM COOKED", emoji: "🍳😅", color: "from-amber-400/20 to-amber-500/5", ring: "ring-amber-400/40", text: "text-amber-300" },
  { tier: "EXTRA CRISPY", emoji: "🔥💀", color: "from-orange-500/25 to-rose-500/5", ring: "ring-orange-500/50", text: "text-orange-300" },
  { tier: "ACADEMICALLY DECEASED", emoji: "⚰️📉", color: "from-rose-500/25 to-rose-700/5", ring: "ring-rose-500/50", text: "text-rose-300" },
] as const;

export default function Home() {
  return (
    <div className="rise-in">
      {/* Hero */}
      <section className="relative pt-6 pb-8">
        <div className="absolute -top-6 -right-6 select-none pointer-events-none">
          <Flame
            className="w-28 h-28 text-orange-500/70 pulse-glow"
            strokeWidth={1.25}
          />
        </div>

        <span className="pill text-orange-300 border-orange-500/30 bg-orange-500/10">
          <Sparkles className="w-3 h-3" />
          v1.0 · Finals Edition
        </span>

        <h1 className="font-display font-bold mt-3 leading-[0.95] text-[2.6rem] sm:text-[3rem]">
          Are You <span className="text-glow-orange text-orange-400">Cooked</span>?
        </h1>
        <p className="mt-2 text-muted-foreground max-w-[42ch] text-[15px]">
          The brutally honest, slightly unhinged{" "}
          <span className="text-foreground">University Survival Analyzer</span>.
          Drop your stats, get a verdict. No notes.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <Link
            href="/quiz"
            className="btn-press inline-flex items-center gap-2 px-5 h-12 rounded-xl font-display font-semibold text-[15px] bg-gradient-to-b from-orange-500 to-rose-600 text-white shadow-[0_10px_30px_rgba(255,106,26,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]"
          >
            Start the Analysis
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/leaderboard"
            className="btn-press inline-flex items-center gap-2 px-4 h-12 rounded-xl font-display font-semibold text-[14px] bg-white/5 border border-white/10 text-foreground hover:bg-white/10"
          >
            Leaderboard
          </Link>
        </div>

        {/* Mini stats */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { label: "Metrics", value: "6", icon: <Sparkles className="w-3 h-3" /> },
            { label: "Verdicts", value: "4", icon: <Skull className="w-3 h-3" /> },
            { label: "Events", value: "10", icon: <Coffee className="w-3 h-3" /> },
          ].map((s) => (
            <div
              key={s.label}
              className="neon-card p-3"
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1 font-mono-stat">
                {s.icon}
                {s.label}
              </div>
              <div className="font-display text-2xl font-bold mt-1">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Verdicts preview */}
      <section className="mt-2">
        <h2 className="font-display font-semibold text-lg flex items-center gap-2">
          <span className="text-orange-400">▍</span>
          Possible Verdicts
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Where will you land tonight?
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3">
          {TIERS.map((t) => (
            <div
              key={t.tier}
              className={`neon-card scanlines p-4 ring-1 ${t.ring} bg-gradient-to-br ${t.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-display font-bold tracking-tight text-[1.15rem] ${t.text}`}>
                    {t.tier}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-mono-stat">
                    {t.tier === "LOCKED IN" && "Cooked Level < 30"}
                    {t.tier === "MEDIUM COOKED" && "Cooked Level 30 – 54"}
                    {t.tier === "EXTRA CRISPY" && "Cooked Level 55 – 79"}
                    {t.tier === "ACADEMICALLY DECEASED" && "Cooked Level 80+"}
                  </div>
                </div>
                <div className="text-3xl">{t.emoji}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-7">
        <h2 className="font-display font-semibold text-lg flex items-center gap-2">
          <span className="text-orange-400">▍</span>
          How it works
        </h2>
        <ol className="mt-3 space-y-2 text-sm">
          {[
            "Slide your real stats — GPA, sleep, missing work, vibes.",
            "We compute Mental HP, Brain Battery, Sleep Debt, GPA Condition + Survival %.",
            "A random campus event spices the result. Get your verdict + meme advice.",
            "Save to the leaderboard. Export JSON/CSV. Flex on the group chat.",
          ].map((step, idx) => (
            <li key={idx} className="neon-card p-3 flex items-start gap-3">
              <span className="grid place-items-center w-7 h-7 rounded-lg bg-orange-500/15 text-orange-300 font-mono-stat text-xs border border-orange-500/30">
                {idx + 1}
              </span>
              <span className="text-foreground/90">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
