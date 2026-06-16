/**
 * cookedEngine.ts — UPGRADED "Are You Cooked?" analyzer engine.
 *
 * NEW: Detailed problem analysis, real solutions, subject tracking, video resources.
 * - Identifies exact problem areas (GPA crisis, sleep debt, stress overload, etc.)
 * - Provides actionable solutions with difficulty levels
 * - Subject selector with video resource links
 * - Professional report generation
 */

// =============================================================================
// Types
// =============================================================================

export interface SurvivalInput {
  name: string;
  gpa: number;
  attendance: number;
  sleepHours: number;
  missingAssignments: number;
  examDaysLeft: number;
  stressLevel: number;
  coffeeLevel: number;
  walletStatus: number;
}

export type CookedTier =
  | "LOCKED IN"
  | "MEDIUM COOKED"
  | "EXTRA CRISPY COOKED"
  | "ACADEMICALLY DECEASED";

export interface CookedMetrics {
  mentalHP: number;
  brainBattery: number;
  sleepDebt: number;
  gpaCondition: number;
  survivalProbability: number;
  cookedLevel: number;
}

export interface ProblemArea {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  impact: string;
  metric: keyof CookedMetrics;
  value: number;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  steps: string[];
  timeframe: string;
  difficulty: "easy" | "medium" | "hard";
  impact: string;
  resources?: string[];
}

export interface SubjectResource {
  id: string;
  name: string;
  videoUrl: string;
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
}

export interface RandomEvent {
  emoji: string;
  title: string;
  description: string;
  modifier: number;
}

export interface CookedResult {
  id: string;
  timestamp: number;
  input: SurvivalInput;
  metrics: CookedMetrics;
  tier: CookedTier;
  verdict: string;
  advice: string;
  event: RandomEvent;
  meme: string;
  problems: ProblemArea[];
  solutions: Solution[];
  reportSummary: string;
}

// =============================================================================
// Errors
// =============================================================================

export class InvalidInputError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "InvalidInputError";
  }
}

// =============================================================================
// Subject Resources (video links + study guides)
// =============================================================================

export const SUBJECT_RESOURCES: Record<string, SubjectResource[]> = {
  "Mathematics": [
    {
      id: "math_1",
      name: "Calculus Fundamentals",
      videoUrl: "https://www.youtube.com/watch?v=WUvTyaaNkzM",
      duration: "2:30:00",
      difficulty: "beginner",
      description: "Complete calculus basics from Khan Academy",
    },
    {
      id: "math_2",
      name: "Linear Algebra Crash Course",
      videoUrl: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
      duration: "3:15:00",
      difficulty: "intermediate",
      description: "3Blue1Brown's essential linear algebra series",
    },
    {
      id: "math_3",
      name: "Advanced Calculus",
      videoUrl: "https://www.youtube.com/watch?v=9vKqVkMQHKk",
      duration: "4:00:00",
      difficulty: "advanced",
      description: "Multivariable calculus and differential equations",
    },
  ],
  "Physics": [
    {
      id: "phys_1",
      name: "Mechanics Basics",
      videoUrl: "https://www.youtube.com/watch?v=7RM4HUWnVOE",
      duration: "2:45:00",
      difficulty: "beginner",
      description: "Newton's laws and kinematics explained",
    },
    {
      id: "phys_2",
      name: "Electromagnetism",
      videoUrl: "https://www.youtube.com/watch?v=1TKZfJUNQCs",
      duration: "3:30:00",
      difficulty: "intermediate",
      description: "Electric fields, magnetism, and Maxwell's equations",
    },
    {
      id: "phys_3",
      name: "Quantum Mechanics",
      videoUrl: "https://www.youtube.com/watch?v=MzRCDLHtqrA",
      duration: "4:15:00",
      difficulty: "advanced",
      description: "Wave functions, Schrödinger equation, and more",
    },
  ],
  "Chemistry": [
    {
      id: "chem_1",
      name: "General Chemistry",
      videoUrl: "https://www.youtube.com/watch?v=FSyAehMFAtM",
      duration: "2:00:00",
      difficulty: "beginner",
      description: "Atoms, molecules, and basic reactions",
    },
    {
      id: "chem_2",
      name: "Organic Chemistry",
      videoUrl: "https://www.youtube.com/watch?v=4UNEJrAQcME",
      duration: "3:45:00",
      difficulty: "intermediate",
      description: "Functional groups, mechanisms, and synthesis",
    },
    {
      id: "chem_3",
      name: "Advanced Organic Synthesis",
      videoUrl: "https://www.youtube.com/watch?v=zHbxVrH0MIE",
      duration: "4:30:00",
      difficulty: "advanced",
      description: "Complex synthesis strategies and retrosynthesis",
    },
  ],
  "Biology": [
    {
      id: "bio_1",
      name: "Cell Biology Basics",
      videoUrl: "https://www.youtube.com/watch?v=URUJD5NEXC8",
      duration: "2:30:00",
      difficulty: "beginner",
      description: "Cell structure, function, and processes",
    },
    {
      id: "bio_2",
      name: "Molecular Biology",
      videoUrl: "https://www.youtube.com/watch?v=gG7uCJ-0V3M",
      duration: "3:20:00",
      difficulty: "intermediate",
      description: "DNA, RNA, protein synthesis, and gene expression",
    },
    {
      id: "bio_3",
      name: "Advanced Genetics",
      videoUrl: "https://www.youtube.com/watch?v=Pd4Z8qy8jOY",
      duration: "4:00:00",
      difficulty: "advanced",
      description: "Mendelian genetics, molecular genetics, and evolution",
    },
  ],
  "Computer Science": [
    {
      id: "cs_1",
      name: "Programming Fundamentals",
      videoUrl: "https://www.youtube.com/watch?v=8mei6Jz8j0c",
      duration: "3:00:00",
      difficulty: "beginner",
      description: "Variables, loops, functions, and data structures",
    },
    {
      id: "cs_2",
      name: "Data Structures & Algorithms",
      videoUrl: "https://www.youtube.com/watch?v=8hly31xqFZM",
      duration: "4:00:00",
      difficulty: "intermediate",
      description: "Arrays, linked lists, trees, sorting, and searching",
    },
    {
      id: "cs_3",
      name: "Advanced Algorithms",
      videoUrl: "https://www.youtube.com/watch?v=0IAPZzGSbME",
      duration: "5:00:00",
      difficulty: "advanced",
      description: "Dynamic programming, graphs, and optimization",
    },
  ],
  "History": [
    {
      id: "hist_1",
      name: "World History Overview",
      videoUrl: "https://www.youtube.com/watch?v=Yocja_N3IVE",
      duration: "2:00:00",
      difficulty: "beginner",
      description: "Ancient civilizations to modern era",
    },
    {
      id: "hist_2",
      name: "Modern History Deep Dive",
      videoUrl: "https://www.youtube.com/watch?v=DwKR3Wq6DBE",
      duration: "3:30:00",
      difficulty: "intermediate",
      description: "Industrial revolution through 20th century",
    },
    {
      id: "hist_3",
      name: "Contemporary History Analysis",
      videoUrl: "https://www.youtube.com/watch?v=KfqT6roSKXw",
      duration: "4:00:00",
      difficulty: "advanced",
      description: "21st century geopolitics and global trends",
    },
  ],
  "English": [
    {
      id: "eng_1",
      name: "Writing Fundamentals",
      videoUrl: "https://www.youtube.com/watch?v=I0mbCmrl5c0",
      duration: "1:45:00",
      difficulty: "beginner",
      description: "Grammar, sentence structure, and composition",
    },
    {
      id: "eng_2",
      name: "Literary Analysis",
      videoUrl: "https://www.youtube.com/watch?v=d5CO8Ib1pAI",
      duration: "2:45:00",
      difficulty: "intermediate",
      description: "Themes, symbolism, character analysis, and criticism",
    },
    {
      id: "eng_3",
      name: "Advanced Rhetoric & Argumentation",
      videoUrl: "https://www.youtube.com/watch?v=ZKnvWMrKlqA",
      duration: "3:30:00",
      difficulty: "advanced",
      description: "Persuasion techniques, debate, and critical thinking",
    },
  ],
};

// =============================================================================
// Random campus events
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
// Verdict copy
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
// Problem Detection
// =============================================================================

function detectProblems(input: SurvivalInput, metrics: CookedMetrics): ProblemArea[] {
  const problems: ProblemArea[] = [];

  // GPA Crisis
  if (metrics.gpaCondition < 40) {
    problems.push({
      id: "gpa_crisis",
      name: "GPA Crisis",
      severity: metrics.gpaCondition < 20 ? "critical" : "high",
      description: `Your GPA (${input.gpa.toFixed(2)}) is below target. Missing ${input.missingAssignments} assignments isn't helping.`,
      impact: "Affects academic standing, scholarship eligibility, and job prospects",
      metric: "gpaCondition",
      value: metrics.gpaCondition,
    });
  }

  // Sleep Debt
  if (metrics.sleepDebt > 60) {
    problems.push({
      id: "sleep_debt",
      name: "Critical Sleep Debt",
      severity: metrics.sleepDebt > 80 ? "critical" : "high",
      description: `You're getting ${input.sleepHours} hours/night. Ideal is 8. Your body is running on fumes.`,
      impact: "Weakens immune system, impairs cognitive function, increases stress",
      metric: "sleepDebt",
      value: metrics.sleepDebt,
    });
  }

  // Stress Overload
  if (input.stressLevel >= 8) {
    problems.push({
      id: "stress_overload",
      name: "Stress Overload",
      severity: input.stressLevel >= 9 ? "critical" : "high",
      description: `Stress level at ${input.stressLevel}/10. You're in fight-or-flight mode constantly.`,
      impact: "Mental health deterioration, physical illness, burnout risk",
      metric: "mentalHP",
      value: metrics.mentalHP,
    });
  }

  // Attendance Issues
  if (input.attendance < 70) {
    problems.push({
      id: "attendance",
      name: "Low Attendance",
      severity: input.attendance < 50 ? "critical" : "high",
      description: `You're only attending ${input.attendance}% of classes. You're missing crucial content.`,
      impact: "Falling behind on material, missing announcements, professor concerns",
      metric: "gpaCondition",
      value: metrics.gpaCondition,
    });
  }

  // Missing Assignments
  if (input.missingAssignments > 10) {
    problems.push({
      id: "missing_work",
      name: "Missing Assignments Piling Up",
      severity: input.missingAssignments > 20 ? "critical" : "high",
      description: `${input.missingAssignments} assignments outstanding. Each one is a GPA hit.`,
      impact: "Grade penalties, academic probation risk, stress accumulation",
      metric: "gpaCondition",
      value: metrics.gpaCondition,
    });
  }

  // Exam Pressure
  if (input.examDaysLeft < 7 && input.examDaysLeft > 0) {
    problems.push({
      id: "exam_pressure",
      name: "Imminent Exam Pressure",
      severity: input.examDaysLeft < 3 ? "critical" : "high",
      description: `Exams in ${input.examDaysLeft} days. Time is running out to prepare.`,
      impact: "High stress, sleep deprivation, last-minute cramming",
      metric: "survivalProbability",
      value: metrics.survivalProbability,
    });
  }

  // Low Survival Probability
  if (metrics.survivalProbability < 30) {
    problems.push({
      id: "low_survival",
      name: "Low Survival Probability",
      severity: "critical",
      description: `Overall survival probability: ${metrics.survivalProbability.toFixed(0)}%. Multiple systems failing.`,
      impact: "Academic failure, mental health crisis, need for intervention",
      metric: "survivalProbability",
      value: metrics.survivalProbability,
    });
  }

  return problems;
}

// =============================================================================
// Solution Generation
// =============================================================================

function generateSolutions(input: SurvivalInput, problems: ProblemArea[]): Solution[] {
  const solutions: Solution[] = [];

  for (const problem of problems) {
    switch (problem.id) {
      case "gpa_crisis":
        solutions.push({
          id: "sol_gpa_1",
          title: "Immediate GPA Recovery Plan",
          description: "Focus on completing remaining assignments and studying for upcoming exams.",
          steps: [
            "List all remaining assignments with due dates",
            "Prioritize high-weight assignments (exams, projects)",
            "Create a daily schedule: 2 hours study, 30 min break, repeat",
            "Email professors about extension possibilities",
            "Join study groups or get tutoring",
          ],
          timeframe: "2-4 weeks",
          difficulty: "medium",
          impact: "Can improve GPA by 0.3-0.5 points with consistent effort",
          resources: ["https://www.youtube.com/watch?v=ukLnPbIffxE", "https://www.youtube.com/watch?v=E9uZSxR2-Xk"],
        });
        break;

      case "sleep_debt":
        solutions.push({
          id: "sol_sleep_1",
          title: "Sleep Recovery Protocol",
          description: "Rebuild your sleep schedule gradually and sustainably.",
          steps: [
            "Set a consistent bedtime (even weekends)",
            "Aim for 8-9 hours nightly for 1 week",
            "No screens 1 hour before bed",
            "Keep room cool, dark, and quiet",
            "Avoid caffeine after 2 PM",
            "Exercise 30 min daily (not before bed)",
          ],
          timeframe: "1-2 weeks to reset",
          difficulty: "easy",
          impact: "Improves focus, memory, immune function, and mood by 30-50%",
          resources: ["https://www.youtube.com/watch?v=nm1TxQj9IsQ", "https://www.youtube.com/watch?v=9SVeQwAYwQw"],
        });
        break;

      case "stress_overload":
        solutions.push({
          id: "sol_stress_1",
          title: "Stress Management & Mental Health",
          description: "Implement daily stress-relief techniques and seek support.",
          steps: [
            "Practice 10-min meditation daily (Headspace, Calm app)",
            "Exercise 30 min daily (running, yoga, sports)",
            "Talk to campus counseling (often free)",
            "Limit caffeine and energy drinks",
            "Schedule 1 hour daily for something you enjoy",
            "Practice deep breathing: 4-7-8 technique",
          ],
          timeframe: "Ongoing, effects visible in 3-5 days",
          difficulty: "easy",
          impact: "Reduces stress levels by 20-40%, improves sleep and focus",
          resources: ["https://www.youtube.com/watch?v=ZToicYcHIOU", "https://www.youtube.com/watch?v=_jD0cEnsC3E"],
        });
        break;

      case "attendance":
        solutions.push({
          id: "sol_attend_1",
          title: "Attendance Recovery",
          description: "Commit to attending classes and catching up on notes.",
          steps: [
            "Set phone reminders 15 min before each class",
            "Attend every class for the next 2 weeks",
            "Sit in front row to stay engaged",
            "Take detailed notes (handwritten if possible)",
            "Review notes within 24 hours",
            "Email professor explaining your commitment",
          ],
          timeframe: "2-4 weeks",
          difficulty: "medium",
          impact: "Improves grades by 0.5-1.0 points, increases engagement",
          resources: ["https://www.youtube.com/watch?v=E9uZSxR2-Xk"],
        });
        break;

      case "missing_work":
        solutions.push({
          id: "sol_missing_1",
          title: "Assignment Completion Sprint",
          description: "Systematically complete all outstanding assignments.",
          steps: [
            `You have ${input.missingAssignments} assignments to complete`,
            "Rank by due date and weight (grade impact)",
            "Complete 1-2 per day over next week",
            "Email professors for deadline extensions if needed",
            "Submit partial work if needed (better than nothing)",
            "Ask for help: tutoring, study groups, office hours",
          ],
          timeframe: "1-2 weeks",
          difficulty: "hard",
          impact: "Can recover 5-15 GPA points per assignment submitted",
          resources: ["https://www.youtube.com/watch?v=ukLnPbIffxE"],
        });
        break;

      case "exam_pressure":
        solutions.push({
          id: "sol_exam_1",
          title: "Exam Preparation Strategy",
          description: "Create an intensive study plan for upcoming exams.",
          steps: [
            `You have ${input.examDaysLeft} days until exams`,
            "Review syllabus and exam format",
            "Create study guide with key topics",
            "Study 3-4 hours daily (with breaks)",
            "Take practice exams under timed conditions",
            "Sleep 8+ hours the night before exam",
          ],
          timeframe: `${input.examDaysLeft} days`,
          difficulty: "hard",
          impact: "Can improve exam scores by 10-20% with focused prep",
          resources: ["https://www.youtube.com/watch?v=E9uZSxR2-Xk", "https://www.youtube.com/watch?v=ukLnPbIffxE"],
        });
        break;

      case "low_survival":
        solutions.push({
          id: "sol_crisis_1",
          title: "Academic Crisis Intervention",
          description: "Immediate action needed. Contact support services.",
          steps: [
            "Call campus counseling center TODAY",
            "Email dean of students about your situation",
            "Consider course withdrawal or deferral",
            "Request emergency extension on assignments",
            "Get tutoring or academic coaching",
            "Create 30-day recovery plan with advisor",
          ],
          timeframe: "Immediate (today)",
          difficulty: "hard",
          impact: "Can prevent academic dismissal and provide mental health support",
          resources: ["https://www.youtube.com/watch?v=ZToicYcHIOU"],
        });
        break;
    }
  }

  return solutions;
}

// =============================================================================
// Analyzer class (OOP)
// =============================================================================

export class CookedAnalyzer {
  constructor(private input: SurvivalInput) {}

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

  computeMentalHP(): number {
    const i = this.input;
    const stressDamage = i.stressLevel * 7;
    const sleepBonus = Math.max(0, (i.sleepHours - 4)) * 6;
    const walletBonus = i.walletStatus * 2;
    return clamp(60 - stressDamage + sleepBonus + walletBonus);
  }

  computeBrainBattery(): number {
    const i = this.input;
    const coffeeBoost = i.coffeeLevel <= 4 ? i.coffeeLevel * 8 : 32 - (i.coffeeLevel - 4) * 4;
    const sleepBoost = i.sleepHours * 5;
    const stressDrain = i.stressLevel * 3;
    return clamp(20 + coffeeBoost + sleepBoost - stressDrain);
  }

  computeSleepDebt(): number {
    const i = this.input;
    const ideal = 8;
    const deficit = Math.max(0, ideal - i.sleepHours);
    return clamp(deficit * 14 + i.stressLevel * 2);
  }

  computeGpaCondition(): number {
    const i = this.input;
    const gpaScore = (i.gpa / 4) * 70;
    const attendanceScore = (i.attendance / 100) * 20;
    const missingPenalty = Math.min(30, i.missingAssignments * 3);
    return clamp(gpaScore + attendanceScore + 10 - missingPenalty);
  }

  computeSurvivalProbability(
    mentalHP: number,
    brainBattery: number,
    sleepDebt: number,
    gpaCondition: number,
  ): number {
    const i = this.input;
    const examPressure = Math.max(0, (14 - i.examDaysLeft)) * 2;
    const base =
      mentalHP * 0.25 +
      brainBattery * 0.2 +
      (100 - sleepDebt) * 0.2 +
      gpaCondition * 0.35;
    return clamp(base - examPressure);
  }

  computeCookedLevel(survival: number, sleepDebt: number, missingAssignments: number): number {
    const base = 100 - survival;
    const debtPenalty = sleepDebt * 0.1;
    const missingPenalty = Math.min(15, missingAssignments * 1.5);
    return clamp(base + debtPenalty + missingPenalty);
  }

  determineTier(cookedLevel: number): CookedTier {
    if (cookedLevel < 30) return "LOCKED IN";
    if (cookedLevel < 55) return "MEDIUM COOKED";
    if (cookedLevel < 80) return "EXTRA CRISPY COOKED";
    return "ACADEMICALLY DECEASED";
  }

  rollEvent(): RandomEvent {
    return pick(RANDOM_EVENTS);
  }

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

    const metrics: CookedMetrics = {
      mentalHP,
      brainBattery,
      sleepDebt,
      gpaCondition,
      survivalProbability,
      cookedLevel: 0, // Will be set below
    };

    const event = this.rollEvent();
    const rawCooked = this.computeCookedLevel(
      survivalProbability,
      sleepDebt,
      this.input.missingAssignments,
    );
    const cookedLevel = clamp(rawCooked + event.modifier);
    metrics.cookedLevel = cookedLevel;

    const tier = this.determineTier(cookedLevel);
    const verdictBank = VERDICTS[tier];
    const verdict = pick(verdictBank.lines);
    const advice = pick(verdictBank.advice);

    // NEW: Detect problems and generate solutions
    const problems = detectProblems(this.input, metrics);
    const solutions = generateSolutions(this.input, problems);

    // Generate report summary
    const reportSummary = this.generateReportSummary(metrics, problems, tier);

    return {
      id: `cooked_${Date.now()}_${Math.floor(Math.random() * 9999)}`,
      timestamp: Date.now(),
      input: this.input,
      metrics,
      tier,
      verdict,
      advice,
      event,
      meme: verdictBank.meme,
      problems,
      solutions,
      reportSummary,
    };
  }

  private generateReportSummary(metrics: CookedMetrics, problems: ProblemArea[], tier: CookedTier): string {
    const criticalCount = problems.filter(p => p.severity === "critical").length;
    const highCount = problems.filter(p => p.severity === "high").length;

    return `
ACADEMIC HEALTH REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Status: ${tier}
Survival Probability: ${metrics.survivalProbability.toFixed(0)}%
Cooked Level: ${metrics.cookedLevel.toFixed(0)}/100

CRITICAL ISSUES: ${criticalCount}
HIGH PRIORITY: ${highCount}

KEY METRICS:
• Mental HP: ${metrics.mentalHP.toFixed(0)}/100
• Brain Battery: ${metrics.brainBattery.toFixed(0)}/100
• Sleep Debt: ${metrics.sleepDebt.toFixed(0)}/100
• GPA Condition: ${metrics.gpaCondition.toFixed(0)}/100

RECOMMENDATION:
${criticalCount > 0 ? "⚠️ IMMEDIATE ACTION REQUIRED - Contact academic support services" : "✓ Monitor situation and implement recommended solutions"}

Generated: ${new Date().toLocaleString()}
    `.trim();
  }
}

// =============================================================================
// Helper functions
// =============================================================================

export function analyzeStudent(input: SurvivalInput): CookedResult {
  return new CookedAnalyzer(input).analyze();
}

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
