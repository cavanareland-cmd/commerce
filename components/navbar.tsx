import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const NAV_LINKS = [
  { href: "/collection", label: "COLLECTION" },
  { href: "/ritual", label: "RITUAL" },
  { href: "/about", label: "ABOUT" },
  { href: "/experiences", label: "EXPERIENCES" },
  { href: "/pleasure-room", label: "PLEASURE ROOM" },
  { href: "/faq", label: "FAQ" },
] as const;

const iconClass =
  "h-5 w-5 text-white stroke-[1.15] transition-opacity hover:opacity-80";

export default function Navbar() {
  return (
    <nav className="absolute left-0 top-0 z-50 w-full bg-transparent px-6 py-5 md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-[1920px] items-center gap-4">
        <Link
          href="/"
          className={`${playfair.className} shrink-0 text-lg tracking-[0.32em] text-white md:text-xl`}
        >
          NIX
        </Link>

        <ul className="mx-auto hidden min-w-0 max-w-full flex-1 items-center justify-center gap-5 text-[10px] tracking-[0.2em] text-white lg:flex xl:gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <Link
                href={href}
                className="transition-opacity hover:opacity-80"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-4 text-white md:gap-5">
          <Link
            href="/collection"
            className="hidden items-center gap-1.5 text-[10px] tracking-[0.2em] sm:flex"
          >
            <span className="text-base leading-none" aria-hidden>
              🇮🇩
            </span>
            <span>SGD$</span>
            <ChevronDownIcon className="h-3 w-3 shrink-0" aria-hidden />
          </Link>
          <Link href="/account" aria-label="Account" className="p-0.5">
            <UserIcon className={iconClass} />
          </Link>
          <Link href="/search" aria-label="Search" className="p-0.5">
            <MagnifyingGlassIcon className={iconClass} />
          </Link>
          <Link href="/search" aria-label="Shopping bag" className="p-0.5">
            <ShoppingBagIcon className={iconClass} />
          </Link>
        </div>
      </div>

      <ul className="mt-4 flex gap-5 overflow-x-auto pb-1 text-[10px] tracking-[0.2em] text-white lg:hidden">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href} className="shrink-0">
            <Link href={href} className="whitespace-nowrap hover:opacity-80">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
