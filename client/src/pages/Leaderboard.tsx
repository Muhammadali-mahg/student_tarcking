/**
 * Leaderboard.tsx — saved analyses, sortable & exportable (JSON/CSV).
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  Download,
  FileJson,
  Sheet,
  Trash2,
  Trophy,
  X,
  ArrowDownUp,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  clearLeaderboard,
  deleteEntry,
  exportCSV,
  exportJSON,
  loadLeaderboard,
} from "@/lib/storage";
import {
  TIER_STYLES,
  type CookedResult,
  type CookedTier,
} from "@/lib/cookedEngine";

type SortKey = "cookedLevel" | "survival" | "recent";

export default function Leaderboard() {
  const [entries, setEntries] = useState<CookedResult[]>([]);
  const [sort, setSort] = useState<SortKey>("recent");

  useEffect(() => {
    setEntries(loadLeaderboard());
  }, []);

  const sorted = useMemo(() => {
    const arr = [...entries];
    if (sort === "cookedLevel") {
      arr.sort((a, b) => b.metrics.cookedLevel - a.metrics.cookedLevel);
    } else if (sort === "survival") {
      arr.sort((a, b) => b.metrics.survivalProbability - a.metrics.survivalProbability);
    } else {
      arr.sort((a, b) => b.timestamp - a.timestamp);
    }
    return arr;
  }, [entries, sort]);

  const stats = useMemo(() => {
    if (entries.length === 0) return null;
    const avgCooked =
      entries.reduce((s, e) => s + e.metrics.cookedLevel, 0) / entries.length;
    const tiers: Record<CookedTier, number> = {
      "LOCKED IN": 0,
      "MEDIUM COOKED": 0,
      "EXTRA CRISPY COOKED": 0,
      "ACADEMICALLY DECEASED": 0,
    };
    entries.forEach((e) => (tiers[e.tier] += 1));
    const worst = entries.reduce((a, b) =>
      a.metrics.cookedLevel > b.metrics.cookedLevel ? a : b,
    );
    return { avgCooked, tiers, worst };
  }, [entries]);

  const handleDelete = (id: string) => {
    setEntries(deleteEntry(id));
    toast.success("Entry yeeted from the board.");
  };

  const handleClear = () => {
    if (!confirm("Clear all leaderboard entries? This can't be undone.")) return;
    clearLeaderboard();
    setEntries([]);
    toast.success("Leaderboard wiped.");
  };

  return (
    <div className="rise-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="pill text-orange-300 border-orange-500/30 bg-orange-500/10">
            <Trophy className="w-3 h-3" /> Hall of Fame & Shame
          </span>
          <h1 className="font-display font-bold text-[1.9rem] leading-tight mt-3">
            The <span className="text-orange-400 text-glow-orange">Cooked</span> Board
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Saved locally on your phone. Export anytime.
          </p>
        </div>
      </div>

      {/* Empty state */}
      {entries.length === 0 ? (
        <div className="neon-card scanlines p-8 text-center">
          <div className="text-5xl mb-3">🥚</div>
          <div className="font-display font-semibold text-lg">
            Nothing on the grill yet.
          </div>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Run your first analysis and you'll show up here.
          </p>
          <Link
            href="/quiz"
            className="btn-press inline-flex items-center gap-2 px-5 h-12 rounded-xl font-display font-semibold text-sm bg-gradient-to-b from-orange-500 to-rose-600 text-white shadow-[0_10px_30px_rgba(255,106,26,0.4)]"
          >
            <Sparkles className="w-4 h-4" /> Take the quiz
          </Link>
        </div>
      ) : (
        <>
          {/* Stats summary */}
          {stats && (
            <div className="neon-card p-4 mb-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-[10px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground">
                    Entries
                  </div>
                  <div className="stat-num text-2xl text-orange-300 text-glow-orange">
                    {entries.length}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground">
                    Avg Cooked
                  </div>
                  <div className="stat-num text-2xl text-rose-300 text-glow-red">
                    {Math.round(stats.avgCooked)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground">
                    Worst Tier
                  </div>
                  <div className="font-display font-bold text-sm leading-tight mt-1 text-amber-300">
                    {stats.worst.tier}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <button
              onClick={() =>
                setSort((s) =>
                  s === "recent"
                    ? "cookedLevel"
                    : s === "cookedLevel"
                      ? "survival"
                      : "recent",
                )
              }
              className="btn-press inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-mono-stat tracking-wide bg-white/5 border border-white/10 hover:bg-white/10"
            >
              <ArrowDownUp className="w-3.5 h-3.5" />
              SORT:{" "}
              {sort === "recent"
                ? "RECENT"
                : sort === "cookedLevel"
                  ? "MOST COOKED"
                  : "TOP SURVIVAL"}
            </button>
            <button
              onClick={() => exportJSON(entries)}
              className="btn-press inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-mono-stat tracking-wide bg-white/5 border border-white/10 hover:bg-white/10"
            >
              <FileJson className="w-3.5 h-3.5" /> JSON
            </button>
            <button
              onClick={() => exportCSV(entries)}
              className="btn-press inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-mono-stat tracking-wide bg-white/5 border border-white/10 hover:bg-white/10"
            >
              <Sheet className="w-3.5 h-3.5" /> CSV
            </button>
            <button
              onClick={handleClear}
              className="btn-press inline-flex items-center gap-1.5 h-9 px-3 rounded-lg text-xs font-mono-stat tracking-wide bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/15 ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>

          {/* Entries */}
          <ul className="space-y-2.5">
            {sorted.map((entry, idx) => {
              const style = TIER_STYLES[entry.tier];
              return (
                <li
                  key={entry.id}
                  className={`neon-card p-3.5 ring-1 ${style.ring}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid place-items-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 stat-num text-sm">
                      #{idx + 1}
                    </div>
                    <Link
                      href={`/results/${entry.id}`}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-display font-bold truncate">
                          {entry.input.name || "anonymous"}
                        </div>
                        <div className="text-xl shrink-0">{entry.meme}</div>
                      </div>
                      <div className={`text-[12px] font-mono-stat ${style.text} truncate`}>
                        {entry.tier}
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] font-mono-stat text-muted-foreground">
                        <span>
                          COOKED{" "}
                          <span className="text-foreground">
                            {Math.round(entry.metrics.cookedLevel)}
                          </span>
                        </span>
                        <span>
                          SURV{" "}
                          <span className="text-foreground">
                            {Math.round(entry.metrics.survivalProbability)}%
                          </span>
                        </span>
                        <span>
                          GPA{" "}
                          <span className="text-foreground">
                            {entry.input.gpa.toFixed(2)}
                          </span>
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="btn-press grid place-items-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-rose-300 hover:border-rose-500/40"
                      aria-label="Delete entry"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-5">
            <button
              onClick={() => exportJSON(entries)}
              className="btn-press w-full h-12 rounded-xl font-display font-semibold text-sm bg-white/5 border border-white/10 inline-flex items-center justify-center gap-2 hover:bg-white/10"
            >
              <Download className="w-4 h-4" /> Export full leaderboard (JSON)
            </button>
          </div>
        </>
      )}
    </div>
  );
}
