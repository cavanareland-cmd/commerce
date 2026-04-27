import Link from "next/link";

export type ProductCardProps = {
  title: string;
  priceFormatted: string;
  href?: string;
  badge?: string;
};

export default function ProductCard({
  title,
  priceFormatted,
  href = "#",
  badge,
}: ProductCardProps) {
  return (
    <article className="flex flex-col items-center">
      <Link href={href} className="group relative block w-full">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-[#1a1420] ring-1 ring-white/5">
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#2a1828] via-[#151018] to-[#0a0810]"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(232,64,122,0.08),transparent_50%)]" />
          {badge ? (
            <span className="absolute left-3 top-3 z-10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-widest text-white bg-[#E8407A]">
              {badge}
            </span>
          ) : null}
        </div>
      </Link>

      <div className="mt-5 flex w-full flex-col items-center text-center">
        <p className="text-xs text-[#f4f0ec]/90">
          5.0 <span aria-hidden className="text-[#f4f0ec]">★★★★★</span>
        </p>
        <h2 className="mt-3 max-w-md font-serif text-[11px] font-normal uppercase tracking-[0.14em] text-[#f4f0ec] md:text-xs">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[#f4f0ec]/95">{priceFormatted}</p>
        <button
          type="button"
          className="mt-5 border border-[#f5a3b7] bg-transparent px-8 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-[#f5a3b7] transition-colors hover:bg-[#f5a3b7]/10"
        >
          ADD TO CART
        </button>
      </div>
    </article>
  );
}
