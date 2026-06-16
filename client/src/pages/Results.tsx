/**
 * Results.tsx — UPGRADED: Professional analysis, problems, solutions, subject resources.
 * Displays detailed breakdown with actionable recommendations and video links.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowLeft,
  Download,
  RotateCcw,
  Share2,
  Trophy,
  Sparkles,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { loadLeaderboard, recordCheckIn } from "@/lib/storage";
import { TIER_STYLES, type CookedResult, SUBJECT_RESOURCES } from "@/lib/cookedEngine";
import { exportJSON } from "@/lib/storage";

export default function Results() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [result, setResult] = useState<CookedResult | null>(null);

  useEffect(() => {
    const all = loadLeaderboard();
    const found = all.find((r) => r.id === params.id);
    if (!found) {
      toast.error("Result not found", { description: "Run a fresh analysis." });
      setLocation("/quiz");
      return;
    }
    setResult(found);
    recordCheckIn(found);
  }, [params.id, setLocation]);

  if (!result) {
    return (
      <div className="py-20 text-center text-muted-foreground">Loading…</div>
    );
  }

  return <ResultsView result={result} />;
}

function ResultsView({ result }: { result: CookedResult }) {
  const style = TIER_STYLES[result.tier];
  const [activeTab, setActiveTab] = useState<"overview" | "problems" | "solutions" | "resources">("overview");
  const [selectedSubject, setSelectedSubject] = useState<string>("Mathematics");

  const radarData = useMemo(
    () => [
      { metric: "Mental HP", value: Math.round(result.metrics.mentalHP) },
      { metric: "Brain Bat.", value: Math.round(result.metrics.brainBattery) },
      { metric: "GPA Cond.", value: Math.round(result.metrics.gpaCondition) },
      { metric: "Sleep Health", value: Math.round(100 - result.metrics.sleepDebt) },
      { metric: "Survival", value: Math.round(result.metrics.survivalProbability) },
    ],
    [result],
  );

  const barData = useMemo(
    () => [
      { name: "GPA", v: (result.input.gpa / 4) * 100, hex: "#fbbf24" },
      { name: "Attend.", v: result.input.attendance, hex: "#34d399" },
      { name: "Sleep", v: (result.input.sleepHours / 14) * 100, hex: "#60a5fa" },
      { name: "Stress", v: result.input.stressLevel * 10, hex: "#fb7185" },
      { name: "Coffee", v: result.input.coffeeLevel * 10, hex: "#FF6A1A" },
    ],
    [result],
  );

  const handleShare = async () => {
    const text = `I'm ${result.tier} ${result.meme}\nCooked Level: ${Math.round(
      result.metrics.cookedLevel,
    )}/100 · Survival: ${Math.round(
      result.metrics.survivalProbability,
    )}%\n— Are You Cooked? 🍳💀`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Are You Cooked?", text });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
      }
    } catch {
      /* user cancelled */
    }
  };

  const handleExportReport = () => {
    const report = `
ARE YOU COOKED? - PROFESSIONAL ACADEMIC HEALTH REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Student: ${result.input.name}
Date: ${new Date(result.timestamp).toLocaleString()}
Status: ${result.tier}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERDICT & ADVICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Verdict: ${result.verdict}
Immediate Action: ${result.advice}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEALTH METRICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cooked Level: ${result.metrics.cookedLevel.toFixed(0)}/100
Survival Probability: ${result.metrics.survivalProbability.toFixed(0)}%
Mental HP: ${result.metrics.mentalHP.toFixed(0)}/100
Brain Battery: ${result.metrics.brainBattery.toFixed(0)}/100
Sleep Debt: ${result.metrics.sleepDebt.toFixed(0)}/100
GPA Condition: ${result.metrics.gpaCondition.toFixed(0)}/100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INPUT ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GPA: ${result.input.gpa.toFixed(2)}/4.0
Attendance: ${result.input.attendance}%
Sleep: ${result.input.sleepHours} hours/night
Missing Assignments: ${result.input.missingAssignments}
Exam Days Left: ${result.input.examDaysLeft}
Stress Level: ${result.input.stressLevel}/10
Coffee Level: ${result.input.coffeeLevel}/10
Wallet Status: ${result.input.walletStatus}/10

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROBLEM AREAS (${result.problems.length} identified)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${result.problems.map(p => `
[${p.severity.toUpperCase()}] ${p.name}
Description: ${p.description}
Impact: ${p.impact}
`).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDED SOLUTIONS (${result.solutions.length})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${result.solutions.map(s => `
SOLUTION: ${s.title}
Difficulty: ${s.difficulty.toUpperCase()}
Timeframe: ${s.timeframe}
Impact: ${s.impact}

Steps:
${s.steps.map((step, i) => `${i + 1}. ${step}`).join("\n")}
`).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RANDOM EVENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${result.event.emoji} ${result.event.title}
${result.event.description}
(Modifier: ${result.event.modifier > 0 ? "+" : ""}${result.event.modifier})

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated by Are You Cooked? - University Survival Analyzer
${new Date().toLocaleString()}
    `;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cooked-report-${result.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report downloaded!");
  };

  const subjectVideos = SUBJECT_RESOURCES[selectedSubject] || [];

  return (
    <div className="rise-in">
      {/* Back row */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/quiz"
          className="btn-press inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="pill text-orange-300 border-orange-500/30 bg-orange-500/10">
          <Sparkles className="w-3 h-3" />
          {new Date(result.timestamp).toLocaleString()}
        </span>
      </div>

      {/* Verdict hero */}
      <section
        className={`neon-card scanlines p-5 ${style.bg} ring-1 ${style.ring}`}
      >
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground">
            Verdict for {result.input.name || "anonymous"}
          </div>
          <div className="text-3xl">{result.meme}</div>
        </div>

        <h1
          className={`font-display font-extrabold mt-2 leading-[0.95] text-[2.1rem] sm:text-[2.4rem] ${style.text}`}
          style={{ textShadow: `0 0 18px ${style.hex}80, 0 0 36px ${style.hex}40` }}
        >
          {result.tier}
        </h1>
        <p className="mt-2 text-foreground/90 text-[15px] leading-snug">
          {result.verdict}
        </p>

        {/* Flame meter */}
        <div className="mt-5">
          <div className="flex justify-between text-[11px] font-mono-stat text-muted-foreground tracking-wider mb-1.5">
            <span>COOKED LEVEL</span>
            <span className="stat-num text-foreground">
              {Math.round(result.metrics.cookedLevel)}/100
            </span>
          </div>
          <div className="h-3 rounded-full bg-white/5 border border-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{
                width: `${result.metrics.cookedLevel}%`,
                background:
                  "linear-gradient(90deg, #34d399 0%, #fbbf24 35%, #FF6A1A 65%, #FF2D55 100%)",
                boxShadow: "0 0 20px rgba(255,106,26,0.45)",
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-3 gap-2">
          <button
            onClick={handleShare}
            className="btn-press h-11 rounded-xl font-display font-semibold text-sm bg-white/5 border border-white/10 inline-flex items-center justify-center gap-2 hover:bg-white/10"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleExportReport}
            className="btn-press h-11 rounded-xl font-display font-semibold text-sm bg-white/5 border border-white/10 inline-flex items-center justify-center gap-2 hover:bg-white/10"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => exportJSON([result])}
            className="btn-press h-11 rounded-xl font-display font-semibold text-sm bg-white/5 border border-white/10 inline-flex items-center justify-center gap-2 hover:bg-white/10"
          >
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {(["overview", "problems", "solutions", "resources"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-mono-stat text-xs uppercase whitespace-nowrap transition ${
              activeTab === tab
                ? "bg-orange-500/30 text-orange-300 border border-orange-500/50"
                : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <>
          {/* Metrics grid */}
          <section className="mt-4 grid grid-cols-2 gap-3">
            <MetricCard
              label="Mental HP"
              value={result.metrics.mentalHP}
              color="#34d399"
              emoji="❤️‍🔥"
            />
            <MetricCard
              label="Brain Battery"
              value={result.metrics.brainBattery}
              color="#60a5fa"
              emoji="🧠"
            />
            <MetricCard
              label="Sleep Debt"
              value={result.metrics.sleepDebt}
              color="#fb7185"
              emoji="😴"
              invert
            />
            <MetricCard
              label="GPA Condition"
              value={result.metrics.gpaCondition}
              color="#fbbf24"
              emoji="🎓"
            />
            <div className="col-span-2">
              <MetricCard
                label="Survival Probability"
                value={result.metrics.survivalProbability}
                color="#FF6A1A"
                emoji="🛟"
                wide
              />
            </div>
          </section>

          {/* Radar chart */}
          <section className="neon-card p-4 mt-4">
            <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground">
              Diagnostic Radar
            </div>
            <div className="font-display font-semibold text-sm mb-3">Vitals at a glance</div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                  <PolarGrid stroke="rgba(255,255,255,0.12)" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fill: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "JetBrains Mono" }}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#FF6A1A"
                    fill="#FF6A1A"
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Bar chart */}
          <section className="neon-card p-4 mt-4">
            <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground">
              Input Breakdown
            </div>
            <div className="font-display font-semibold text-sm mb-3">Normalized stats (0–100)</div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "JetBrains Mono" }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "JetBrains Mono" }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                    {barData.map((d, i) => (
                      <Cell key={i} fill={d.hex} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Advice */}
          <section className="neon-card neon-card-red p-4 mt-4">
            <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-rose-300/90">
              Survival Tip
            </div>
            <div className="mt-1 font-display text-[15px] leading-snug">{result.advice}</div>
          </section>

          {/* Random event */}
          <section className="neon-card neon-card-orange p-4 mt-4">
            <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-orange-300/90">
              Plot Twist
            </div>
            <div className="mt-1 flex items-start gap-3">
              <div className="text-3xl">{result.event.emoji}</div>
              <div>
                <div className="font-display font-bold text-[15px]">
                  {result.event.title}
                </div>
                <div className="text-sm text-foreground/85">{result.event.description}</div>
                <div className="text-[11px] font-mono-stat text-muted-foreground mt-1.5">
                  Modifier: {result.event.modifier > 0 ? "+" : ""}
                  {result.event.modifier} cooked
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* PROBLEMS TAB */}
      {activeTab === "problems" && (
        <section className="mt-4 space-y-3">
          {result.problems.length === 0 ? (
            <div className="neon-card neon-card-green p-6 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-emerald-300">No critical problems detected!</p>
            </div>
          ) : (
            result.problems.map(problem => (
              <div
                key={problem.id}
                className={`neon-card p-4 border-l-4 ${
                  problem.severity === "critical"
                    ? "neon-card-red border-l-rose-500"
                    : "neon-card-orange border-l-orange-500"
                }`}
              >
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-400" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-white">{problem.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                        problem.severity === "critical" ? "bg-rose-500/20 text-rose-300" : "bg-orange-500/20 text-orange-300"
                      }`}>
                        {problem.severity}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mb-2">{problem.description}</p>
                    <p className="text-xs text-white/50 italic">Impact: {problem.impact}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* SOLUTIONS TAB */}
      {activeTab === "solutions" && (
        <section className="mt-4 space-y-3">
          {result.solutions.length === 0 ? (
            <div className="neon-card neon-card-green p-6 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-emerald-300">No solutions needed. You're doing great!</p>
            </div>
          ) : (
            result.solutions.map(solution => (
              <div key={solution.id} className="neon-card p-4">
                <div className="mb-3">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-orange-300">{solution.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded font-mono ${
                      solution.difficulty === "easy"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : solution.difficulty === "medium"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-rose-500/20 text-rose-300"
                    }`}>
                      {solution.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 mb-2">{solution.description}</p>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-mono text-white/50 mb-2">STEPS:</p>
                  <ol className="space-y-1">
                    {solution.steps.map((step, i) => (
                      <li key={i} className="text-xs text-white/60 pl-4 relative">
                        <span className="absolute left-0 text-orange-400">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-black/50 rounded p-2 border border-white/5">
                    <div className="text-white/50 mb-1">Timeframe</div>
                    <div className="text-white font-semibold">{solution.timeframe}</div>
                  </div>
                  <div className="bg-black/50 rounded p-2 border border-white/5">
                    <div className="text-white/50 mb-1">Impact</div>
                    <div className="text-emerald-300 font-semibold text-xs">{solution.impact}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      )}

      {/* RESOURCES TAB */}
      {activeTab === "resources" && (
        <section className="mt-4 space-y-4">
          <div className="text-xs font-mono-stat uppercase text-muted-foreground mb-3">Choose a subject to explore</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "math", name: "📐 Mathematics" },
              { id: "physics", name: "⚛️ Physics" },
              { id: "chemistry", name: "🧪 Chemistry" },
              { id: "biology", name: "🧬 Biology" },
              { id: "computerscience", name: "💻 Computer Science" },
              { id: "english", name: "📚 English" },
              { id: "history", name: "📜 History" },
            ].map(subject => (
              <Link
                key={subject.id}
                href={`/subject/${subject.id}`}
                className="neon-card p-4 text-center hover:bg-white/5 transition-colors"
              >
                <div className="font-display font-semibold text-sm">{subject.name}</div>
                <div className="text-xs text-muted-foreground mt-1">Deep Dive</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer actions */}
      <section className="mt-5 grid grid-cols-2 gap-2 mb-4">
        <Link
          href="/quiz"
          className="btn-press h-12 rounded-xl font-display font-semibold text-sm bg-white/5 border border-white/10 inline-flex items-center justify-center gap-2 hover:bg-white/10"
        >
          <RotateCcw className="w-4 h-4" /> Re-roll
        </Link>
        <Link
          href="/leaderboard"
          className="btn-press h-12 rounded-xl font-display font-semibold text-sm bg-gradient-to-b from-orange-500 to-rose-600 text-white shadow-[0_8px_24px_rgba(255,45,85,0.35)] inline-flex items-center justify-center gap-2"
        >
          <Trophy className="w-4 h-4" /> Leaderboard
        </Link>
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  color,
  emoji,
  invert,
  wide,
}: {
  label: string;
  value: number;
  color: string;
  emoji: string;
  invert?: boolean;
  wide?: boolean;
}) {
  const display = Math.round(value);
  const pct = Math.max(0, Math.min(100, value));
  const goodWhenHigh = !invert;
  return (
    <div className={`neon-card p-4 ${wide ? "" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-mono-stat tracking-[0.16em] uppercase text-muted-foreground">
          {label}
        </div>
        <span className="text-lg leading-none">{emoji}</span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <div
          className="stat-num text-[1.9rem] leading-none"
          style={{
            color,
            textShadow: `0 0 14px ${color}80`,
          }}
        >
          {display}
        </div>
        <div className="text-xs text-muted-foreground font-mono-stat">/ 100</div>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
        <div
          className="h-full rounded-full transition-[width] duration-700"
          style={{
            width: `${pct}%`,
            background: goodWhenHigh
              ? `linear-gradient(90deg, ${color}, ${color}cc)`
              : `linear-gradient(90deg, #34d399, ${color})`,
            boxShadow: `0 0 12px ${color}80`,
          }}
        />
      </div>
    </div>
  );
}
