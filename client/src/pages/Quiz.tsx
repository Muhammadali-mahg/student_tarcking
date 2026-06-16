/**
 * Quiz.tsx — input form for the analyzer.
 * Design: NEON DINER TERMINAL. Single-column, sliders w/ neon thumb,
 * sticky bottom CTA, snappy button press, exception handling via try/catch.
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  GraduationCap,
  CalendarCheck2,
  Moon,
  FileWarning,
  Timer,
  Activity,
  Coffee,
  Wallet,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  CookedAnalyzer,
  InvalidInputError,
  type SurvivalInput,
} from "@/lib/cookedEngine";
import { saveResult } from "@/lib/storage";

interface FieldConfig {
  key: keyof Omit<SurvivalInput, "name">;
  label: string;
  emoji: string;
  Icon: React.ComponentType<{ className?: string }>;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  hint: string;
  format?: (v: number) => string;
}

const FIELDS: FieldConfig[] = [
  {
    key: "gpa",
    label: "GPA",
    emoji: "🎓",
    Icon: GraduationCap,
    min: 0,
    max: 4,
    step: 0.01,
    hint: "Be honest. Bank doesn't care, we do.",
    format: (v) => v.toFixed(2),
  },
  {
    key: "attendance",
    label: "Attendance",
    emoji: "📅",
    Icon: CalendarCheck2,
    min: 0,
    max: 100,
    step: 1,
    suffix: "%",
    hint: "How often you actually showed up.",
  },
  {
    key: "sleepHours",
    label: "Sleep / night",
    emoji: "🛌",
    Icon: Moon,
    min: 0,
    max: 14,
    step: 0.5,
    suffix: " hrs",
    hint: "Including accidental naps. We don't judge.",
  },
  {
    key: "missingAssignments",
    label: "Missing Work",
    emoji: "📉",
    Icon: FileWarning,
    min: 0,
    max: 30,
    step: 1,
    suffix: " items",
    hint: "Count the ones haunting your inbox.",
  },
  {
    key: "examDaysLeft",
    label: "Exam Days Left",
    emoji: "⏳",
    Icon: Timer,
    min: 0,
    max: 60,
    step: 1,
    suffix: " days",
    hint: "Lower = scarier.",
  },
  {
    key: "stressLevel",
    label: "Stress Level",
    emoji: "😵",
    Icon: Activity,
    min: 1,
    max: 10,
    step: 1,
    suffix: " / 10",
    hint: "1 = chill. 10 = currently crashing out.",
  },
  {
    key: "coffeeLevel",
    label: "Coffee Intake",
    emoji: "☕",
    Icon: Coffee,
    min: 0,
    max: 10,
    step: 1,
    suffix: " cups",
    hint: "Past 4 cups, returns diminish hard.",
  },
  {
    key: "walletStatus",
    label: "Wallet Status",
    emoji: "💸",
    Icon: Wallet,
    min: 0,
    max: 10,
    step: 1,
    suffix: " / 10",
    hint: "0 = ramen arc. 10 = trust fund energy.",
  },
];

const INITIAL: SurvivalInput = {
  name: "",
  gpa: 3.0,
  attendance: 80,
  sleepHours: 6,
  missingAssignments: 3,
  examDaysLeft: 14,
  stressLevel: 6,
  coffeeLevel: 3,
  walletStatus: 5,
};

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [values, setValues] = useState<SurvivalInput>(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof SurvivalInput>(k: K, v: SurvivalInput[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Tiny artificial delay so the loading state can be felt — adds drama.
    setTimeout(() => {
      try {
        const analyzer = new CookedAnalyzer(values);
        const result = analyzer.analyze();
        saveResult(result);
        toast.success("Analysis complete. Buckle up.", {
          description: `${result.tier} · ${result.meme}`,
        });
        setLocation(`/results/${result.id}`);
      } catch (err) {
        if (err instanceof InvalidInputError) {
          toast.error("Invalid input", { description: err.message });
        } else {
          toast.error("Something went sideways", {
            description: (err as Error).message ?? "Unknown error",
          });
        }
        setSubmitting(false);
      }
    }, 450);
  };

  return (
    <form onSubmit={handleSubmit} className="rise-in pb-2">
      {/* Heading */}
      <div className="mb-5">
        <span className="pill text-orange-300 border-orange-500/30 bg-orange-500/10">
          <Sparkles className="w-3 h-3" /> Step 1 · Drop your stats
        </span>
        <h1 className="font-display font-bold text-[1.9rem] leading-tight mt-3">
          Tell me how it's going, <span className="text-orange-400 text-glow-orange">honestly</span>.
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          No screenshots needed. Just vibes-based truthfulness.
        </p>
      </div>

      {/* Name */}
      <div className="neon-card p-4 mb-4">
        <label className="block text-[11px] font-mono-stat tracking-[0.16em] uppercase text-muted-foreground">
          Alias / Name
        </label>
        <input
          type="text"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. ramen_warrior"
          className="mt-2 w-full bg-transparent border-b border-white/10 focus:border-orange-500/60 outline-none font-display text-lg py-2 placeholder:text-muted-foreground/50 transition-colors"
          maxLength={24}
          required
        />
      </div>

      {/* Sliders */}
      <div className="space-y-3">
        {FIELDS.map(({ key, label, emoji, Icon, min, max, step, suffix, hint, format }) => {
          const v = values[key] as number;
          const pct = ((v - min) / (max - min)) * 100;
          return (
            <div key={key} className="neon-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="grid place-items-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 shrink-0">
                    <Icon className="w-4 h-4 text-orange-300" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-[15px] flex items-center gap-1.5">
                      {label} <span className="text-base">{emoji}</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground truncate">{hint}</div>
                  </div>
                </div>
                <div className="stat-num text-orange-300 text-glow-orange text-lg shrink-0">
                  {format ? format(v) : v}
                  {suffix ?? ""}
                </div>
              </div>

              <input
                type="range"
                className="neon-range mt-4"
                min={min}
                max={max}
                step={step}
                value={v}
                onChange={(e) => set(key, parseFloat(e.target.value) as never)}
                style={{ ["--val" as never]: `${pct}%` } as React.CSSProperties}
              />
              <div className="flex justify-between text-[10px] font-mono-stat text-muted-foreground mt-1.5 tracking-wide">
                <span>{min}{suffix ?? ""}</span>
                <span>{max}{suffix ?? ""}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <div
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 w-[min(94vw,560px)] pointer-events-none"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <button
          type="submit"
          disabled={submitting}
          className="pointer-events-auto btn-press w-full h-14 rounded-2xl font-display font-bold text-[15px] tracking-wide bg-gradient-to-b from-orange-500 to-rose-600 text-white shadow-[0_15px_40px_rgba(255,45,85,0.45),inset_0_1px_0_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Cooking the results…
            </>
          ) : (
            <>
              🔥 Reveal My Cooked Level
            </>
          )}
        </button>
      </div>

      {/* Spacer so content doesn't sit under sticky CTA */}
      <div className="h-24" />
    </form>
  );
}
