# Are You Cooked? 🍳💀 — University Survival Analyzer

A mobile-first, dark/neon web app that asks for your GPA, attendance, sleep, missing assignments, exam days left, stress, coffee, and wallet — and roasts you with a verdict:

- 🧠⚡️ **LOCKED IN**
- 🍳😅 **MEDIUM COOKED**
- 🔥💀 **EXTRA CRISPY COOKED**
- ⚰️📉 **ACADEMICALLY DECEASED**

It also computes **Mental HP**, **Brain Battery**, **Sleep Debt**, **GPA Condition**, **Survival Probability**, and **Cooked Level**, throws in a random campus event for chaos, draws a radar + bar chart, and keeps a local **Leaderboard** with **JSON / CSV** export.

---

## 🔧 Tech stack

- **React 19 + TypeScript** (Vite)
- **Tailwind CSS 4** (custom Neon Diner Terminal theme)
- **Recharts** for visuals
- **wouter** for routing
- **sonner** for toasts
- Class-based engine (`CookedAnalyzer`) with custom `InvalidInputError` — mirrors Python OOP / exception handling
- `localStorage` persistence + Blob downloads for JSON/CSV exports

---

## 📂 Project structure

```
are-you-cooked/
├── client/
│   ├── index.html             # mobile-first meta, fonts
│   └── src/
│       ├── App.tsx            # routes
│       ├── main.tsx           # entry
│       ├── index.css          # NEON DINER TERMINAL theme
│       ├── components/
│       │   └── AppShell.tsx   # header + bottom tab bar
│       ├── pages/
│       │   ├── Home.tsx
│       │   ├── Quiz.tsx
│       │   ├── Results.tsx
│       │   ├── Leaderboard.tsx
│       │   ├── About.tsx
│       │   └── NotFound.tsx
│       └── lib/
│           ├── cookedEngine.ts  # OOP analyzer + random events
│           └── storage.ts       # localStorage + JSON/CSV export
├── server/index.ts             # static prod server (optional)
├── package.json
└── README.md
```

---

## 🚀 Run it locally in VS Code

> Requires Node.js **20+** and `pnpm` (or use npm/yarn — pnpm is the official one).

```bash
# 1. Install pnpm (one time)
npm install -g pnpm

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm dev
```

Open <http://localhost:3000>. The dev server prints a Network URL as well — open that on your phone (same Wi-Fi) for instant phone testing.

### Production build

```bash
pnpm build      # bundles client + server
pnpm start      # runs the static prod server
```

The static bundle lives in `dist/public/` after `pnpm build` — that's what you upload to Netlify / Vercel / GitHub Pages.

---

## 📱 Install on your phone

1. Open the live URL in **Safari** (iOS) or **Chrome** (Android).
2. Tap **Share** → **Add to Home Screen**.
3. Launch it like a native app — dark, neon, full-screen.

The viewport is already tuned for notches (`viewport-fit=cover`) and the bottom tab bar respects `env(safe-area-inset-bottom)`.

---

## 🧠 The math (kind of)

| Metric                  | Formula (clamped 0–100)                                                |
| ----------------------- | ---------------------------------------------------------------------- |
| **Mental HP**           | `60 − stress·7 + max(0,sleep−4)·6 + wallet·2`                           |
| **Brain Battery**       | `20 + coffeeRamp(coffee) + sleep·5 − stress·3`                          |
| **Sleep Debt**          | `max(0, 8−sleep)·14 + stress·2`                                         |
| **GPA Condition**       | `gpa/4 · 70 + attendance·0.2 + 10 − missing·3`                          |
| **Survival Probability**| weighted blend (Mental 0.25, Brain 0.2, Sleep-health 0.2, GPA 0.35) − examPressure |
| **Cooked Level**        | `100 − survival + sleepDebt·0.1 + missing·1.5 + randomEvent.modifier`  |

Cooked Level → tier:

| Range   | Verdict                  |
| ------- | ------------------------ |
| 0–29    | LOCKED IN                |
| 30–54   | MEDIUM COOKED            |
| 55–79   | EXTRA CRISPY COOKED      |
| 80–100  | ACADEMICALLY DECEASED    |

---

## 🐍 Python-flavored concepts mapped to TS

| Python concept       | Where it lives                                |
| -------------------- | --------------------------------------------- |
| Classes / OOP        | `CookedAnalyzer` in `cookedEngine.ts`         |
| Functions            | `analyzeStudent`, helpers like `clamp`, `pick`|
| Exception handling   | `InvalidInputError` + `try/catch` in `Quiz`   |
| `random.choice`      | `pick(RANDOM_EVENTS)` in `cookedEngine.ts`    |
| JSON save            | `exportJSON()` in `storage.ts`                |
| CSV save             | `exportCSV()` in `storage.ts`                 |
| Charts               | Recharts (radar + bar) in `Results.tsx`       |
| Leaderboard          | `loadLeaderboard / saveResult` in `storage.ts`|

---

## 🚀 Deploy options

### Netlify (drag & drop)
1. `pnpm build`
2. Drag the `dist/public/` folder onto <https://app.netlify.com/drop>.

### Vercel
1. Push the repo to GitHub.
2. Import in Vercel — framework: **Vite**. Build command: `pnpm build`. Output dir: `dist/public`.

### GitHub Pages
1. `pnpm build`
2. Push `dist/public/` to a `gh-pages` branch (or use `gh-pages` npm package).

---

## ⚠️ Disclaimer

This is a meme. If you're genuinely struggling at uni, please talk to your campus counseling center or someone you trust. Real help > internet diagnosis.

---

Made with 🔥 + 💀.
