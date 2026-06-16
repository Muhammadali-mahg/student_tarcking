import { Link } from "wouter";
import { Flame } from "lucide-react";

export default function NotFound() {
  return (
    <div className="rise-in min-h-[60vh] flex flex-col items-center justify-center text-center">
      <Flame className="w-14 h-14 text-orange-500 pulse-glow" />
      <h1 className="font-display font-bold text-3xl mt-3">404 · Page got cooked</h1>
      <p className="text-muted-foreground mt-1 text-sm max-w-[32ch]">
        Nothing here but smoke. Let's get you back to the kitchen.
      </p>
      <Link
        href="/"
        className="btn-press mt-5 inline-flex items-center gap-2 px-5 h-12 rounded-xl font-display font-semibold text-sm bg-gradient-to-b from-orange-500 to-rose-600 text-white shadow-[0_10px_30px_rgba(255,106,26,0.4)]"
      >
        Go home
      </Link>
    </div>
  );
}
