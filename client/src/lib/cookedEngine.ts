/**
 * cookedEngine.ts — Core "Are You Cooked?" analyzer engine.
 *
 * Mirrors Python OOP / functions / exception handling concepts in TypeScript:
 *  - `SurvivalInput` (data class equivalent)
 *  - `CookedAnalyzer` class with validation, calculation, and verdict methods
 *  - Custom `InvalidInputError` for exception handling
 *  - Random campus events (like Python's `random.choice`)
 *
 * Design philosophy: NEON DINER TERMINAL — outputs feel like a stove timer.
 */

// =============================================================================
// Types
// =============================================================================

export interface SurvivalInput {
  name: string;
  gpa: number;            // 0.0 – 4.0
  attendance: number;     // 0 – 100 (%)
  sleepHours: number;     // 0 – 14 (avg per night)
  missingAssignments: number; // 0 – 50
  examDaysLeft: number;   // 0 – 60
  stressLevel: number;    // 1 – 10
  coffeeLevel: number;    // 0 – 10 (cups/day equivalent)
  walletStatus: number;   // 0 – 10 (10 = rich, 0 = broke)
}

export type CookedTier =
  | "LOCKED IN"
  | "MEDIUM COOKED"
  | "EXTRA CRISPY COOKED"
  | "ACADEMICALLY DECEASED";

export interface CookedMetrics {
  mentalHP: number;          // 0–100
  brainBattery: number;      // 0–100
  sleepDebt: number;         // 0–100 (higher = worse)
  gpaCondition: number;      // 0–100
  survivalProbability: number; // 0–100
  cookedLevel: number;       // 0–100 (higher = more cooked)
}

export interface RandomEvent {
  emoji: string;
  title: string;
  description: string;
  modifier: number; // applied to cookedLevel (+ worsens, - helps)
}

export interface CookedResult {
  id: string;
  timestamp: number;
  input: SurvivalInput;
  metrics: CookedMetrics;
  tier: CookedTier;
  verdict: string;       // funny one-liner
  advice: string;        // funny survival tip
  event: RandomEvent;    // random plot twist
  meme: string;          // emoji combo
}

// =============================================================================
// Errors (exception handling)
// =============================================================================

export class InvalidInputError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "InvalidInputError";
  }
}

// =============================================================================
// Random campus events (random.choice equivalent)
// =============================================================================

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    emoji: "☕",
    title: "Free Campus Coffee",
    description: "You stumbled into a free coffee event. Brain go BRRR.",
    modifier: -6,
  },
  {
    emoji: "🔥",
    title: "Surprise Pop Quiz",
    description: "Professor hit you with the unannounced quiz. Ouch.",
    modifier: +9,
  },
  {
    emoji: "📵",
    title: "WiFi Died Mid-Submission",
    description: "Your assignment uploaded at 11:59:58. Heart attack mode.",
    modifier: +5,
  },
  {
    emoji: "🛌",
    title: "Accidental 12-Hour Nap",
    description: "You blinked and lost a day. Rested but doomed.",
    modifier: +3,
  },
  {
    emoji: "🧠",
    title: "Galaxy Brain Moment",
    description: "You finally understood the lecture. Big W.",
    modifier: -8,
  },
  {
    emoji: "💸",
    title: "Surprise Textbook Fee",
    description: "Your wallet just got bodied. $89.99 gone.",
    modifier: +4,
  },
  {
    emoji: "🍕",
    title: "Free Pizza in the Lobby",
    description: "Survived on free pizza for 3 days. Iconic.",
    modifier: -4,
  },
  {
    emoji: "📚",
    title: "Library All-Nighter",
    description: "Locked in until 4am. The grind is real.",
    modifier: -2,
  },
  {
    emoji: "💀",
    title: "Group Project Ghosted You",
    description: "Your teammates vanished. You're carrying the team.",
    modifier: +7,
  },
  {
    emoji: "🎯",
    title: "Office Hours Hack",
    description: "Got the answer key vibes from your TA. Sneaky W.",
    modifier: -5,
  },
];

// =============================================================================
// Verdict copy (memes by tier)
// =============================================================================

const VERDICTS: Record<CookedTier, { lines: string[]; advice: string[]; meme: string }> = {
  "LOCKED IN": {
    meme: "🧠⚡️📚",
    lines: [
      "You are LOCKED IN, no notes. Built different fr.",
      "Sigma grindset detected. Professors fear you.",
      "GPA glowing, sleep schedule cooking, you're THAT student.",
      "Main character energy. The syllabus works for YOU.",
    ],
    advice: [
      "Keep the streak. Touch grass occasionally so you don't peak too early.",
      "Mentor a cooked friend. Karma points = bonus survival XP.",
      "Bookmark this and flex it on the group chat.",
    ],
  },
  "MEDIUM COOKED": {
    meme: "🍳😅📒",
    lines: [
      "You're mid. Not cooked, not raw — al dente academic.",
      "Vibes are surviving but not thriving. Classic.",
      "Functional human, mildly fried. We've all been there.",
      "Slightly toasted but still edible. Salvageable arc.",
    ],
    advice: [
      "Pick ONE missing assignment and finish it tonight. Tiny W = big mood.",
      "Sleep 7 hours for 3 nights straight. Watch your HP regen.",
      "Cancel one obligation. Free up brain RAM.",
    ],
  },
  "EXTRA CRISPY COOKED": {
    meme: "🔥💀☠️",
    lines: [
      "Bro you are EXTRA CRISPY. Smoke alarm going off.",
      "Cooked to the studs. Send help and electrolytes.",
      "Your stress hormones started a union. Solidarity.",
      "Burnt offering to the GPA gods. Cooked™.",
    ],
    advice: [
      "Email ONE professor today. Extensions exist, use them.",
      "Sleep tonight. No Netflix, no doomscroll. SLEEP.",
      "Cut coffee by half. Your nervous system is begging.",
    ],
  },
  "ACADEMICALLY DECEASED": {
    meme: "⚰️📉🪦",
    lines: [
      "You are ACADEMICALLY DECEASED. F in chat.",
      "RIP. The transcript is a crime scene.",
      "You skipped past cooked into well-done charcoal.",
      "Six feet under the bell curve. Press F.",
    ],
    advice: [
      "Go to the dean's office. Withdraw, defer, or negotiate — but DO something.",
      "Call a friend or counselor TODAY. This isn't a meme anymore.",
      "Sleep 9 hours. Eat real food. Reboot the human.",
    ],
  },
};

// =============================================================================
// Utility
// =============================================================================

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// =============================================================================
// Analyzer class (OOP)
// =============================================================================

export class CookedAnalyzer {
  constructor(private input: SurvivalInput) {}

  /** Validate inputs — throws InvalidInputError if anything's off. */
  validate(): void {
    const i = this.input;
    if (!i.name || i.name.trim().length === 0) {
      throw new InvalidInputError("name", "Bro, drop a name or alias.");
    }
    if (i.gpa < 0 || i.gpa > 4) {
      throw new InvalidInputError("gpa", "GPA must be between 0.0 and 4.0.");
    }
    if (i.attendance < 0 || i.attendance > 100) {
      throw new InvalidInputError("attendance", "Attendance must be 0–100%.");
    }
    if (i.sleepHours < 0 || i.sleepHours > 14) {
      throw new InvalidInputError("sleepHours", "Sleep must be 0–14 hours.");
    }
    if (i.missingAssignments < 0 || i.missingAssignments > 50) {
      throw new InvalidInputError("missingAssignments", "Missing assignments must be 0–50.");
    }
    if (i.examDaysLeft < 0 || i.examDaysLeft > 60) {
      throw new InvalidInputError("examDaysLeft", "Exam days must be 0–60.");
    }
    if (i.stressLevel < 1 || i.stressLevel > 10) {
      throw new InvalidInputError("stressLevel", "Stress level must be 1–10.");
    }
    if (i.coffeeLevel < 0 || i.coffeeLevel > 10) {
      throw new InvalidInputError("coffeeLevel", "Coffee level must be 0–10.");
    }
    if (i.walletStatus < 0 || i.walletStatus > 10) {
      throw new InvalidInputError("walletStatus", "Wallet status must be 0–10.");
    }
  }

  /** Mental HP — based on stress, sleep, wallet. */
  computeMentalHP(): number {
    const i = this.input;
    const stressDamage = i.stressLevel * 7;             // up to 70
    const sleepBonus = Math.max(0, (i.sleepHours - 4)) * 6; // up to 60
    const walletBonus = i.walletStatus * 2;             // up to 20
    return clamp(60 - stressDamage + sleepBonus + walletBonus);
  }

  /** Brain Battery — coffee + sleep, minus stress. */
  computeBrainBattery(): number {
    const i = this.input;
    const coffeeBoost = i.coffeeLevel <= 4 ? i.coffeeLevel * 8 : 32 - (i.coffeeLevel - 4) * 4;
    const sleepBoost = i.sleepHours * 5;
    const stressDrain = i.stressLevel * 3;
    return clamp(20 + coffeeBoost + sleepBoost - stressDrain);
  }

  /** Sleep Debt — higher = worse. */
  computeSleepDebt(): number {
    const i = this.input;
    const ideal = 8;
    const deficit = Math.max(0, ideal - i.sleepHours);
    return clamp(deficit * 14 + i.stressLevel * 2);
  }

  /** GPA Condition — how healthy the GPA is. */
  computeGpaCondition(): number {
    const i = this.input;
    const gpaScore = (i.gpa / 4) * 70;       // up to 70
    const attendanceScore = (i.attendance / 100) * 20; // up to 20
    const missingPenalty = Math.min(30, i.missingAssignments * 3);
    return clamp(gpaScore + attendanceScore + 10 - missingPenalty);
  }

  /** Survival Probability — combined score. */
  computeSurvivalProbability(
    mentalHP: number,
    brainBattery: number,
    sleepDebt: number,
    gpaCondition: number,
  ): number {
    const i = this.input;
    const examPressure = Math.max(0, (14 - i.examDaysLeft)) * 2; // up to 28
    const base =
      mentalHP * 0.25 +
      brainBattery * 0.2 +
      (100 - sleepDebt) * 0.2 +
      gpaCondition * 0.35;
    return clamp(base - examPressure);
  }

  /** Cooked Level — inverse-ish of survival, but with its own flavor. */
  computeCookedLevel(survival: number, sleepDebt: number, missingAssignments: number): number {
    const base = 100 - survival;
    const debtPenalty = sleepDebt * 0.1;
    const missingPenalty = Math.min(15, missingAssignments * 1.5);
    return clamp(base + debtPenalty + missingPenalty);
  }

  /** Determine tier from cooked level. */
  determineTier(cookedLevel: number): CookedTier {
    if (cookedLevel < 30) return "LOCKED IN";
    if (cookedLevel < 55) return "MEDIUM COOKED";
    if (cookedLevel < 80) return "EXTRA CRISPY COOKED";
    return "ACADEMICALLY DECEASED";
  }

  /** Pull a random event and bake its modifier into the cooked level. */
  rollEvent(): RandomEvent {
    return pick(RANDOM_EVENTS);
  }

  /** Main entry point — orchestrates everything. */
  analyze(): CookedResult {
    this.validate();

    const mentalHP = this.computeMentalHP();
    const brainBattery = this.computeBrainBattery();
    const sleepDebt = this.computeSleepDebt();
    const gpaCondition = this.computeGpaCondition();
    const survivalProbability = this.computeSurvivalProbability(
      mentalHP,
      brainBattery,
      sleepDebt,
      gpaCondition,
    );

    const event = this.rollEvent();
    const rawCooked = this.computeCookedLevel(
      survivalProbability,
      sleepDebt,
      this.input.missingAssignments,
    );
    const cookedLevel = clamp(rawCooked + event.modifier);
    const tier = this.determineTier(cookedLevel);

    const verdictBank = VERDICTS[tier];
    const verdict = pick(verdictBank.lines);
    const advice = pick(verdictBank.advice);

    return {
      id: `cooked_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      timestamp: Date.now(),
      input: this.input,
      metrics: {
        mentalHP,
        brainBattery,
        sleepDebt,
        gpaCondition,
        survivalProbability,
        cookedLevel,
      },
      tier,
      verdict,
      advice,
      event,
      meme: verdictBank.meme,
    };
  }
}

// =============================================================================
// Helper functions
// =============================================================================

/** Convenience wrapper — feels like a Python top-level function. */
export function analyzeStudent(input: SurvivalInput): CookedResult {
  return new CookedAnalyzer(input).analyze();
}

/** Tier color tokens (Tailwind class fragments + raw hex). */
export const TIER_STYLES: Record<
  CookedTier,
  { glow: string; ring: string; text: string; hex: string; bg: string }
> = {
  "LOCKED IN": {
    glow: "shadow-[0_0_30px_rgba(74,222,128,0.35)]",
    ring: "ring-emerald-400/60",
    text: "text-emerald-300",
    hex: "#4ade80",
    bg: "bg-emerald-500/10",
  },
  "MEDIUM COOKED": {
    glow: "shadow-[0_0_30px_rgba(255,170,40,0.4)]",
    ring: "ring-amber-400/60",
    text: "text-amber-300",
    hex: "#fbbf24",
    bg: "bg-amber-500/10",
  },
  "EXTRA CRISPY COOKED": {
    glow: "shadow-[0_0_36px_rgba(255,90,30,0.55)]",
    ring: "ring-orange-500/70",
    text: "text-orange-300",
    hex: "#fb923c",
    bg: "bg-orange-500/10",
  },
  "ACADEMICALLY DECEASED": {
    glow: "shadow-[0_0_44px_rgba(255,45,85,0.6)]",
    ring: "ring-rose-500/70",
    text: "text-rose-300",
    hex: "#fb7185",
    bg: "bg-rose-500/10",
  },
};
