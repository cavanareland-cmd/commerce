import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen w-full items-end bg-[#1a0a1e] bg-cover bg-center bg-no-repeat"
      aria-label="NIX hero"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      <div className="relative z-10 max-w-xl pb-20 pl-12 pr-8">
        <h1
          className={`${playfair.className} mb-4 text-5xl leading-[1.1] tracking-tight text-white`}
        >
          Luxury Intimacy,
          <br />
          Perfected by Science.
        </h1>

        <p className="mb-8 text-sm leading-relaxed text-white/70">
          NIX is intimate care, redefined.
          <br />
          Made for bodies, guided by science, and crafted for deeper pleasure.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/collection"
            className="border border-white bg-transparent px-6 py-3 text-xs tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[#1a0a1e]"
          >
            SHOP COLLECTION
          </Link>
          <Link
            href="/ritual"
            className="bg-[#E8407A] px-6 py-3 text-xs tracking-[0.2em] text-white transition-colors hover:bg-[#d4366d]"
          >
            EXPLORE THE RITUAL
          </Link>
        </div>
      </div>
    </section>
  );
}
