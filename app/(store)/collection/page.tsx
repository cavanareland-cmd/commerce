import NixCollectionFooter from "components/nix-collection-footer";
import ProductCard from "components/product-card";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Collection",
};

const CATEGORY_LINKS = [
  { href: "#water-based", label: "WATER-BASED LUBRICANT" },
  { href: "#silicon-based", label: "SILICON-BASED LUBRICANT" },
  { href: "#libido-serum", label: "LIBIDO SERUM" },
  { href: "#horny-butter", label: "HORNY BUTTER" },
  { href: "#aromatic-oil", label: "AROMATIC MASSAGE OIL" },
  { href: "#coming-soon", label: "COMING SOON" },
] as const;

const PRODUCTS = [
  {
    title: "ORION LIBIDO SERUM",
    priceFormatted: "$110.00",
    badge: "BESTSELLER",
    href: "#orion-libido-serum",
  },
  {
    title: "SIRIUS AROMATIC MASSAGE OIL & LUBRICANT",
    priceFormatted: "$99.00",
    badge: "BACK IN STOCK",
    href: "#sirius-aromatic-massage",
  },
  {
    title: "CAPELLA SILICONE-BASED LUBRICANT",
    priceFormatted: "$89.00",
    href: "#capella-silicone",
  },
  {
    title: "VENUS HORNY BUTTER",
    priceFormatted: "$110.00",
    href: "#venus-horny-butter",
  },
] as const;

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-[#0f0914] text-[#f4f0ec] antialiased">
      <nav
        aria-label="Product categories"
        className="border-b border-white/10 px-6 py-4 md:px-10 lg:px-14"
      >
        <ul className="mx-auto flex max-w-[1600px] flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-between lg:gap-x-4">
          {CATEGORY_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-xs uppercase tracking-widest text-white/70 transition-colors hover:text-[#f4f0ec]"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="px-6 pb-12 pt-14 md:px-10 md:pb-16 md:pt-16 lg:px-14 lg:pb-24 lg:pt-[4.75rem]">
        <p
          className={`${playfair.className} mx-auto max-w-4xl text-center text-lg font-light leading-[1.75] tracking-wide text-[#f4f0ec] md:text-left md:text-xl md:leading-[1.8]`}
        >
          Luxury intimacy products, from lubricants and massage oils to libido
          serums, made for bodies, guided by science, and crafted for deeper
          pleasure whether used solo or together.
        </p>
      </section>

      <section
        aria-label="Products"
        className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 pb-20 md:px-10 md:gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20 lg:pb-28 lg:px-14"
      >
        {PRODUCTS.map((product) => (
          <ProductCard key={product.href} {...product} />
        ))}
      </section>

      <NixCollectionFooter />
    </div>
  );
}
