import { getProduct } from "@/lib/shopify";
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import AddToCart from "./AddToCart";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type Params = { handle: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};

  return {
    title: `${product.title} | NIX`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const minPrice = product.priceRange?.minVariantPrice;
  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: minPrice?.currencyCode ?? "USD",
    maximumFractionDigits: 2,
  }).format(Number(minPrice?.amount ?? 0));

  const image = product.featuredImage ?? product.images?.[0];

  return (
    <div className="min-h-screen bg-[#0f0914] text-[#f4f0ec] antialiased selection:bg-[#f5a3b7] selection:text-[#0f0914]">
      <main className="mx-auto w-full max-w-[1600px] lg:h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
          {/* Left: Sticky image */}
          <section aria-label="Product image" className="relative">
            <div className="sticky top-0 h-[70vh] bg-[#140b18] lg:h-screen">
              <div className="relative h-full w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(245,163,183,0.10),transparent_55%)]"
                  aria-hidden
                />
                {image ? (
                  <Image
                    src={image.url}
                    alt={image.altText || product.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                      Image coming soon
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right: Scrollable details */}
          <section
            aria-label="Product details"
            className="bg-[#0f0914] px-8 py-12 sm:px-12 sm:py-16 lg:h-screen lg:overflow-y-auto lg:px-16 lg:py-20 xl:px-20"
          >
            <div className="mx-auto max-w-xl">
              <header>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#f5a3b7]">
                  Elevating intimacy
                </p>

                <h1
                  className={`${playfair.className} mt-5 text-4xl uppercase tracking-[0.2em] text-[#f4f0ec] sm:text-5xl`}
                >
                  {product.title}
                </h1>

                <div className="mt-6 h-px w-16 bg-[#f5a3b7]/35" />

                <div
                  className={`${playfair.className} mt-8 space-y-4 text-sm leading-relaxed text-[#f4f0ec]/70`}
                  dangerouslySetInnerHTML={{
                    __html:
                      product.descriptionHtml ||
                      `<p>${product.description || ""}</p>`,
                  }}
                />
              </header>

              <div className="mt-10">
                <p
                  className={`${playfair.className} text-2xl uppercase tracking-[0.2em]`}
                >
                  {priceFormatted}
                </p>
              </div>

              <div className="mt-10">
                <AddToCart variants={product.variants} />
              </div>

              <div className="mt-12 border-t border-white/10 pt-8">
                <Accordion summary="How to Use">
                  <p className={`${playfair.className} text-sm text-[#f4f0ec]/70`}>
                    Apply 2-3 sprays directly onto clean, dry intimate areas.
                    Wait a few minutes before intimate moments for optimal
                    absorption. Experience the warming sensation as the serum
                    activates.
                  </p>
                </Accordion>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Accordion({
  summary,
  children,
}: {
  summary: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-b border-white/10 py-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xs uppercase tracking-[0.3em] text-[#f4f0ec] transition-colors hover:text-[#f5a3b7]">
        <span className={`${playfair.className}`}>{summary}</span>
        <span className="relative h-4 w-4 text-[#f4f0ec]/70 group-hover:text-[#f5a3b7]">
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:rotate-90" />
        </span>
      </summary>
      <div className="mt-6">{children}</div>
    </details>
  );
}
