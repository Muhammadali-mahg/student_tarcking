# Are You Cooked? — Design Brainstorm

<response>
<text>
## Idea 1 — "Neon Diner Terminal"
**Design Movement**: Cyberpunk diner fused with retro CRT terminal aesthetics — think a 24-hour neon roadside diner viewed through a glitching monitor.

**Core Principles**
- Dark, almost-black backgrounds with hot orange (#FF6A1A) and ember-red (#FF2D55) neon accents.
- Cards behave like glowing menu signs — soft outer halos, faint scanlines, subtle grain.
- Type is loud and confident, like a meme caption — Space Grotesque (display) + JetBrains Mono (numbers/labels).
- Every metric is presented like a vital sign on a stove timer — playful but legible.

**Color Philosophy**: A canvas of obsidian (`oklch(0.16 0.01 60)`) lets neon orange/red "burn" through. The orange evokes warmth/cooking, red signals danger ("cooked"), green flashes only for `LOCKED IN` victories.

**Layout Paradigm**: Vertical, single-column, mobile-first stack. The form is a multi-step "stove" with a sticky bottom CTA. Results are a vertical "receipt" of glowing cards. No centered hero — instead a left-aligned title with the flame emoji bleeding off the top-right.

**Signature Elements**
- A "flame meter" SVG that fills based on Cooked Level.
- Scanline overlay (very subtle, opacity 0.04) over result cards.
- Number readouts in monospace with a soft glow shadow.

**Interaction Philosophy**: Tap = sizzle. Buttons compress with a small `scale(0.97)` and emit a brief orange ring. Sliders feel like temperature dials.

**Animation**: Result cards stagger in (60ms apart) with `translateY(8px) → 0` + `opacity 0 → 1` over 220ms `cubic-bezier(0.23,1,0.32,1)`. Flame meter fills with a 700ms ease-out. Verdict emoji does a single bounce.

**Typography System**: `Space Grotesque` 700 for headings, `Inter` 400/500 for body, `JetBrains Mono` 600 for stats and percentages. No more than 3 weights per screen.
</text>
<probability>0.07</probability>
</response>

<response>
<text>
## Idea 2 — "Brutalist Meme Lab"
**Design Movement**: Swiss brutalism × shitpost. Heavy borders, oversized type, deadpan layout, with absurd emoji bursts as the only "decoration."

**Core Principles**: Thick 2px borders, blocky cards, no gradients, hard shadows offset 4px. Orange/red used as solid fills, not glows. Humor lives in the copy, not the chrome.

**Color Philosophy**: Pure black background, paper-white text, a single orange (#FF5A1F) and a single red (#E11D2E). Stark, uncompromising.

**Layout Paradigm**: Asymmetric magazine-style grid even on mobile — labels overlap card edges, numbers run huge.

**Signature Elements**: Oversized verdict typography (10vw), rotating sticker emojis pinned to card corners, "REDACTED" style black bars on bad stats.

**Interaction Philosophy**: Instant, no easing. Press states just invert colors. Feels confrontational.

**Animation**: Minimal — only the verdict slams in with a single 120ms snap.

**Typography**: `Archivo Black` for everything loud, `IBM Plex Mono` for stats, `Inter` only for help text.
</text>
<probability>0.05</probability>
</response>

<response>
<text>
## Idea 3 — "Liquid Ember Glassmorphism"
**Design Movement**: Apple-style frosted glass + lava-lamp gradients, mobile-app polish (Things 3 / Linear vibes).

**Core Principles**: Blurred translucent cards floating over animated ember gradients, generous radii (24px), warm shadows. Feels premium and calm despite the chaotic topic.

**Color Philosophy**: Layered embers — deep maroon → orange → coral gradient blob behind everything, glass cards (`backdrop-blur` + white 6% fill) on top.

**Layout Paradigm**: Single-column with floating bottom tab bar (Quiz / Results / Leaderboard).

**Signature Elements**: Animated radial gradient blob that drifts slowly, glass cards with 1px inner white stroke, ring-shaped progress meters.

**Interaction Philosophy**: Soft, springy. Everything has slight parallax on scroll.

**Animation**: Spring physics (framer-motion) on card mount, ring meters animate from 0 with 900ms ease-out.

**Typography**: `Instrument Serif` for the verdict (italic, dramatic), `Inter` for everything else.
</text>
<probability>0.04</probability>
</response>

---

## ✅ Chosen Direction: **Idea 1 — Neon Diner Terminal**

This direction best fits the brief (dark + orange/red neon, meme-y, mobile phone-friendly, "cooking" metaphor). It allows expressive humor without sacrificing readability of the many numeric stats. Every file from here on will reinforce: obsidian bg, hot-orange/ember-red neon, Space Grotesque + JetBrains Mono, glowing cards, flame meter, subtle scanlines, snappy 180–250ms motion.
