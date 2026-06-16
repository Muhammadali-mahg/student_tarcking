/**
 * AppShell.tsx — mobile-first frame.
 * Design: NEON DINER TERMINAL. Sticky top status bar + floating bottom tab nav.
 */
import { Link, useLocation } from "wouter";
import { Flame, Home, ListChecks, Trophy, TrendingUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

const TABS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/quiz", label: "Analyze", Icon: ListChecks },
  { href: "/streaks", label: "Streaks", Icon: TrendingUp },
  { href: "/leaderboard", label: "Board", Icon: Trophy },
  { href: "/about", label: "About", Icon: Info },
];

export default function AppShell({ children }: PropsWithChildren) {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div className="dark relative min-h-[100dvh] text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/65 border-b border-white/5">
        <div className="app-shell flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-rose-600 shadow-[0_0_18px_rgba(255,106,26,0.55)]">
              <Flame className="w-4 h-4 text-white" />
            </span>
            <div className="leading-tight">
              <div className="font-display font-bold text-[15px] tracking-tight">
                Are You Cooked?
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono-stat">
                Survival Analyzer
              </div>
            </div>
          </Link>
          <span className="pill text-orange-300 border-orange-500/30 bg-orange-500/10 flicker">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 pulse-glow" />
            LIVE
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 app-shell pt-4 pb-28">{children}</main>

      {/* Bottom tab bar */}
      <nav
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[min(94vw,560px)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="flex items-center justify-between gap-1 p-1.5 rounded-2xl border border-white/10 bg-[rgba(15,12,13,0.85)] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          {TABS.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className={cn(
                    "btn-press relative flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl text-[11px] font-medium",
                    active
                      ? "bg-gradient-to-b from-orange-500/25 to-rose-500/10 text-orange-200 shadow-[inset_0_0_0_1px_rgba(255,106,26,0.35)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className={cn("w-[18px] h-[18px]", active && "drop-shadow-[0_0_6px_rgba(255,106,26,0.7)]")} />
                  <span className="tracking-wide">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
