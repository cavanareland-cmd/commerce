import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const quickLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/ritual", label: "Ritual" },
  { href: "/about", label: "About" },
  { href: "/experiences", label: "Experiences" },
  { href: "/pleasure-room", label: "Pleasure Room" },
  { href: "/faq", label: "FAQ" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
];

export default function NixCollectionFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 text-[#f4f0ec]">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 md:grid-cols-2 md:gap-12 lg:grid-cols-12 lg:px-10 xl:gap-16">
        <div className="lg:col-span-4">
          <Link
            href="/"
            className={`${playfair.className} inline-block text-3xl tracking-[0.35em]`}
          >
            NIX
          </Link>
          <p className="mt-4 max-w-xs text-[10px] uppercase leading-relaxed tracking-[0.2em] text-[#f4f0ec]/80">
            Luxury intimacy perfected by science
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-2">
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#f4f0ec]/90">
              Quick links
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[#f4f0ec]/65 transition-colors hover:text-[#f4f0ec]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#f4f0ec]/90">
              Social
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {socialLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-[#f4f0ec]/65 transition-colors hover:text-[#f4f0ec]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-4 lg:justify-self-end">
          <h3 className="text-[11px] font-medium uppercase tracking-[0.22em]">
            Newsletter
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f4f0ec]/70">
            Sign up to our newsletter to receive exclusive offers and updates.
          </p>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0"
            action="#"
          >
            <label htmlFor="nix-newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="nix-newsletter-email"
              name="email"
              type="email"
              placeholder="EMAIL"
              className="w-full rounded-sm border border-white/25 bg-transparent px-4 py-3 text-sm uppercase tracking-[0.12em] text-[#f4f0ec] placeholder:text-[#f4f0ec]/40 focus:border-[#E8407A] focus:outline-none sm:flex-1"
              autoComplete="email"
            />
            <button
              type="submit"
              className="shrink-0 bg-[#E8407A] px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#d4366d] sm:rounded-none sm:border sm:border-[#E8407A]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-[10px] uppercase tracking-[0.18em] text-[#f4f0ec]/55 md:flex-row md:flex-wrap md:items-center md:justify-between lg:px-10">
          <p>
            NIX {year} All rights reserved
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            <Link href="/privacy" className="hover:text-[#f4f0ec]">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-[#f4f0ec]">
              Terms of service
            </Link>
            <Link href="/cookies" className="hover:text-[#f4f0ec]">
              Cookie policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
