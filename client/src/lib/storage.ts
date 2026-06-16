/**
 * storage.ts — leaderboard persistence + JSON/CSV export.
 * Mirrors Python's json/csv save patterns, in the browser via localStorage + Blob downloads.
 */

import type { CookedResult } from "./cookedEngine";

const KEY = "are_you_cooked_leaderboard_v1";
const STREAK_KEY = "are_you_cooked_streaks_v1";

export interface DailyCheckIn {
  date: string; // YYYY-MM-DD
  cookedLevel: number;
  mentalHP: number;
  brainBattery: number;
  sleepDebt: number;
  gpaCondition: number;
  survivalProbability: number;
  tier: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCheckInDate: string | null;
  totalCheckIns: number;
  checkIns: DailyCheckIn[];
}

export function loadLeaderboard(): CookedResult[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CookedResult[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (err) {
    console.warn("Leaderboard parse failed, resetting.", err);
    return [];
  }
}

export function saveResult(result: CookedResult): CookedResult[] {
  const existing = loadLeaderboard();
  const next = [result, ...existing].slice(0, 50); // cap at 50
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearLeaderboard(): void {
  localStorage.removeItem(KEY);
}

export function deleteEntry(id: string): CookedResult[] {
  const next = loadLeaderboard().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

// -------- Exports --------

function triggerDownload(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportJSON(results: CookedResult[]) {
  triggerDownload(
    `are-you-cooked-${new Date().toISOString().slice(0, 10)}.json`,
    JSON.stringify(results, null, 2),
    "application/json",
  );
}

export function exportCSV(results: CookedResult[]) {
  const headers = [
    "id",
    "timestamp",
    "name",
    "gpa",
    "attendance",
    "sleepHours",
    "missingAssignments",
    "examDaysLeft",
    "stressLevel",
    "coffeeLevel",
    "walletStatus",
    "mentalHP",
    "brainBattery",
    "sleepDebt",
    "gpaCondition",
    "survivalProbability",
    "cookedLevel",
    "tier",
    "event",
    "verdict",
  ];

  const escape = (v: unknown) => {
    const s = String(v ?? "");
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const rows = results.map((r) =>
    [
      r.id,
      new Date(r.timestamp).toISOString(),
      r.input.name,
      r.input.gpa,
      r.input.attendance,
      r.input.sleepHours,
      r.input.missingAssignments,
      r.input.examDaysLeft,
      r.input.stressLevel,
      r.input.coffeeLevel,
      r.input.walletStatus,
      r.metrics.mentalHP.toFixed(1),
      r.metrics.brainBattery.toFixed(1),
      r.metrics.sleepDebt.toFixed(1),
      r.metrics.gpaCondition.toFixed(1),
      r.metrics.survivalProbability.toFixed(1),
      r.metrics.cookedLevel.toFixed(1),
      r.tier,
      `${r.event.emoji} ${r.event.title}`,
      r.verdict,
    ]
      .map(escape)
      .join(","),
  );

  triggerDownload(
    `are-you-cooked-${new Date().toISOString().slice(0, 10)}.csv`,
    [headers.join(","), ...rows].join("\n"),
    "text/csv",
  );
}

// -------- Streak Tracking --------

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDaysDiff(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

export function loadStreakData(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastCheckInDate: null,
        totalCheckIns: 0,
        checkIns: [],
      };
    }
    const parsed = JSON.parse(raw) as StreakData;
    return parsed;
  } catch (err) {
    console.warn("Streak data parse failed, resetting.", err);
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastCheckInDate: null,
      totalCheckIns: 0,
      checkIns: [],
    };
  }
}

export function recordCheckIn(result: CookedResult): StreakData {
  const streak = loadStreakData();
  const today = getToday();

  // Check if already checked in today
  const alreadyToday = streak.checkIns.some((c) => c.date === today);
  if (alreadyToday) {
    // Update today's entry
    streak.checkIns = streak.checkIns.map((c) =>
      c.date === today
        ? {
            date: today,
            cookedLevel: result.metrics.cookedLevel,
            mentalHP: result.metrics.mentalHP,
            brainBattery: result.metrics.brainBattery,
            sleepDebt: result.metrics.sleepDebt,
            gpaCondition: result.metrics.gpaCondition,
            survivalProbability: result.metrics.survivalProbability,
            tier: result.tier,
          }
        : c,
    );
  } else {
    // Add new check-in
    const newCheckIn: DailyCheckIn = {
      date: today,
      cookedLevel: result.metrics.cookedLevel,
      mentalHP: result.metrics.mentalHP,
      brainBattery: result.metrics.brainBattery,
      sleepDebt: result.metrics.sleepDebt,
      gpaCondition: result.metrics.gpaCondition,
      survivalProbability: result.metrics.survivalProbability,
      tier: result.tier,
    };
    streak.checkIns.push(newCheckIn);

    // Update streak counts
    if (streak.lastCheckInDate) {
      const daysDiff = getDaysDiff(streak.lastCheckInDate, today);
      if (daysDiff === 1) {
        // Consecutive day
        streak.currentStreak += 1;
      } else if (daysDiff > 1) {
        // Streak broken
        streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
        streak.currentStreak = 1;
      }
    } else {
      // First check-in
      streak.currentStreak = 1;
    }

    streak.lastCheckInDate = today;
    streak.totalCheckIns += 1;

    // Keep only last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoff = thirtyDaysAgo.toISOString().slice(0, 10);
    streak.checkIns = streak.checkIns.filter((c) => c.date >= cutoff);
  }

  localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
  return streak;
}

export function clearStreaks(): void {
  localStorage.removeItem(STREAK_KEY);
}
