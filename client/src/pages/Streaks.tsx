/**
 * Streaks.tsx — 30-day trend tracking with line chart and streak stats.
 * Shows cooked level progression, current/longest streaks, and health metrics over time.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ArrowLeft,
  Flame,
  Trophy,
  TrendingUp,
  Calendar,
  Zap,
} from "lucide-react";
import { loadStreakData, type StreakData, type DailyCheckIn } from "@/lib/storage";

export default function Streaks() {
  const [streak, setStreak] = useState<StreakData | null>(null);

  useEffect(() => {
    const data = loadStreakData();
    setStreak(data);
  }, []);

  if (!streak) {
    return (
      <div className="py-20 text-center text-muted-foreground">Loading…</div>
    );
  }

  return <StreaksView streak={streak} />;
}

function StreaksView({ streak }: { streak: StreakData }) {
  // Prepare chart data with all 30 days (fill gaps)
  const chartData = useMemo(() => {
    if (streak.checkIns.length === 0) return [];

    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 29);

    const allDays: DailyCheckIn[] = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(thirtyDaysAgo);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().slice(0, 10);
      const existing = streak.checkIns.find((c) => c.date === dateStr);
      if (existing) {
        allDays.push(existing);
      } else {
        allDays.push({
          date: dateStr,
          cookedLevel: 0,
          mentalHP: 0,
          brainBattery: 0,
          sleepDebt: 0,
          gpaCondition: 0,
          survivalProbability: 0,
          tier: "—",
        });
      }
    }

    return allDays.map((d) => ({
      date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      cookedLevel: Math.round(d.cookedLevel),
      mentalHP: Math.round(d.mentalHP),
      brainBattery: Math.round(d.brainBattery),
      survivalProbability: Math.round(d.survivalProbability),
      hasData: d.cookedLevel > 0,
    }));
  }, [streak.checkIns]);

  const avgCookedLevel = useMemo(() => {
    if (streak.checkIns.length === 0) return 0;
    const sum = streak.checkIns.reduce((acc, c) => acc + c.cookedLevel, 0);
    return Math.round(sum / streak.checkIns.length);
  }, [streak.checkIns]);

  const avgMentalHP = useMemo(() => {
    if (streak.checkIns.length === 0) return 0;
    const sum = streak.checkIns.reduce((acc, c) => acc + c.mentalHP, 0);
    return Math.round(sum / streak.checkIns.length);
  }, [streak.checkIns]);

  const avgBrainBattery = useMemo(() => {
    if (streak.checkIns.length === 0) return 0;
    const sum = streak.checkIns.reduce((acc, c) => acc + c.brainBattery, 0);
    return Math.round(sum / streak.checkIns.length);
  }, [streak.checkIns]);

  const trend = useMemo(() => {
    if (streak.checkIns.length < 2) return 0;
    const recent = streak.checkIns.slice(-7);
    const older = streak.checkIns.slice(0, Math.max(1, streak.checkIns.length - 7));
    const recentAvg = recent.reduce((acc, c) => acc + c.cookedLevel, 0) / recent.length;
    const olderAvg = older.reduce((acc, c) => acc + c.cookedLevel, 0) / older.length;
    return Math.round(recentAvg - olderAvg);
  }, [streak.checkIns]);

  const trendDirection = trend > 0 ? "improving" : trend < 0 ? "declining" : "stable";
  const trendColor = trend > 0 ? "text-emerald-400" : trend < 0 ? "text-rose-400" : "text-amber-400";

  return (
    <div className="rise-in">
      {/* Back row */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="btn-press inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="pill text-orange-300 border-orange-500/30 bg-orange-500/10">
          <Calendar className="w-3 h-3" />
          30-Day Trend
        </span>
      </div>

      {/* Hero card */}
      <section className="neon-card neon-card-orange p-5 mb-4">
        <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-orange-300/90">
          Streak Status
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-xs text-white/50 mb-1">Current Streak</div>
            <div className="stat-num text-xl text-orange-400">{streak.currentStreak}</div>
            <div className="text-[10px] text-white/40">days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs text-white/50 mb-1">Longest Streak</div>
            <div className="stat-num text-xl text-amber-400">{streak.longestStreak}</div>
            <div className="text-[10px] text-white/40">days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-xs text-white/50 mb-1">Total Check-Ins</div>
            <div className="stat-num text-xl text-emerald-400">{streak.totalCheckIns}</div>
            <div className="text-[10px] text-white/40">times</div>
          </div>
        </div>
      </section>

      {/* Trend indicator */}
      <section className={`neon-card p-4 mb-4 ${trend > 0 ? "neon-card-green" : trend < 0 ? "neon-card-red" : "neon-card-orange"}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-white/70 mb-1">
              7-Day Trend
            </div>
            <div className={`text-lg font-semibold ${trendColor}`}>
              {trend > 0 ? "↑" : trend < 0 ? "↓" : "→"} {Math.abs(trend)} points {trendDirection}
            </div>
          </div>
          <TrendingUp className={`w-8 h-8 ${trendColor}`} />
        </div>
      </section>

      {/* Averages */}
      <section className="grid grid-cols-3 gap-3 mb-4">
        <div className="neon-card p-3">
          <div className="text-[10px] font-mono-stat text-muted-foreground mb-1">AVG COOKED</div>
          <div className="stat-num text-xl text-orange-400">{avgCookedLevel}</div>
          <div className="text-[10px] text-white/40">/100</div>
        </div>
        <div className="neon-card p-3">
          <div className="text-[10px] font-mono-stat text-muted-foreground mb-1">AVG MENTAL HP</div>
          <div className="stat-num text-xl text-emerald-400">{avgMentalHP}</div>
          <div className="text-[10px] text-white/40">/100</div>
        </div>
        <div className="neon-card p-3">
          <div className="text-[10px] font-mono-stat text-muted-foreground mb-1">AVG BATTERY</div>
          <div className="stat-num text-xl text-blue-400">{avgBrainBattery}</div>
          <div className="text-[10px] text-white/40">/100</div>
        </div>
      </section>

      {/* Chart */}
      {chartData.length > 0 ? (
        <section className="neon-card p-4 mb-4">
          <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground mb-3">
            30-Day Cooked Level Trend
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  interval={Math.floor(chartData.length / 6)}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)",
                    border: "1px solid rgba(255,106,26,0.5)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                  formatter={(value) => [Math.round(value as number), "Cooked Level"]}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "12px" }}
                  iconType="line"
                />
                <Line
                  type="monotone"
                  dataKey="cookedLevel"
                  stroke="#FF6A1A"
                  strokeWidth={3}
                  dot={{ fill: "#FF6A1A", r: 4 }}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      ) : (
        <section className="neon-card neon-card-green p-6 text-center mb-4">
          <Calendar className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-sm text-emerald-300">No check-ins yet. Run an analysis to start tracking!</p>
        </section>
      )}

      {/* Multi-metric chart */}
      {chartData.length > 0 && (
        <section className="neon-card p-4 mb-4">
          <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground mb-3">
            Health Metrics Over Time
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  interval={Math.floor(chartData.length / 6)}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "JetBrains Mono" }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)",
                    border: "1px solid rgba(255,106,26,0.5)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.8)" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "12px" }}
                  iconType="line"
                />
                <Line
                  type="monotone"
                  dataKey="mentalHP"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={800}
                />
                <Line
                  type="monotone"
                  dataKey="brainBattery"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={800}
                />
                <Line
                  type="monotone"
                  dataKey="survivalProbability"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Recent check-ins */}
      {streak.checkIns.length > 0 && (
        <section className="mb-4">
          <div className="text-[11px] font-mono-stat tracking-[0.18em] uppercase text-muted-foreground mb-3">
            Recent Check-Ins
          </div>
          <div className="space-y-2">
            {streak.checkIns.slice().reverse().slice(0, 10).map((checkIn) => (
              <div key={checkIn.date} className="neon-card p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">
                    {new Date(checkIn.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-xs text-white/50">{checkIn.tier}</div>
                </div>
                <div className="text-right">
                  <div className="stat-num text-lg text-orange-400">{Math.round(checkIn.cookedLevel)}</div>
                  <div className="text-xs text-white/40">cooked</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer actions */}
      <section className="grid grid-cols-2 gap-2 mb-4">
        <Link
          href="/"
          className="btn-press h-12 rounded-xl font-display font-semibold text-sm bg-white/5 border border-white/10 inline-flex items-center justify-center gap-2 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <Link
          href="/quiz"
          className="btn-press h-12 rounded-xl font-display font-semibold text-sm bg-gradient-to-b from-orange-500 to-rose-600 text-white shadow-[0_8px_24px_rgba(255,45,85,0.35)] inline-flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> New Check-In
        </Link>
      </section>
    </div>
  );
}
