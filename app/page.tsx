import Navbar from "@/components/navbar";
import { getProducts } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default async function HomePage() {
  // Fetch all products from Shopify API
  const products = await getProducts({});

  return (
    <div className="relative min-h-screen bg-[#0f0914] text-[#f4f0ec] antialiased selection:bg-[#f5a3b7] selection:text-[#0f0914]">
      <Navbar />

      <main className="mx-auto max-w-screen-xl px-6 py-16 md:px-10 lg:px-14">
        <h1
          className={`${playfair.className} mb-10 text-3xl uppercase tracking-[0.2em] text-[#f4f0ec]`}
        >
          Collection
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {products.length === 0 && (
            <div className="col-span-full text-center text-white/60">No products found.</div>
          )}
          {products.map((product) => (
            <div key={product.handle} className="flex flex-col bg-[#1a0f25] rounded shadow overflow-hidden">
              {product.featuredImage ? (
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.featuredImage.url}
                    alt={product.title}
                    width={400}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center aspect-[4/5] opacity-30 text-xs uppercase">No Image</div>
              )}
              <div className="flex flex-col flex-1 p-6">
                <h2
                  className={`${playfair.className} mb-2 text-lg uppercase tracking-[0.14em]`}
                >
                  {product.title}
                </h2>
                {product.priceRange?.minVariantPrice && (
                  <p className="mb-3 text-md text-[#f5a3b7]">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: product.priceRange.minVariantPrice.currencyCode || "IDR",
                      minimumFractionDigits: 0,
                    }).format(Number(product.priceRange.minVariantPrice.amount))}
                  </p>
                )}
                {product.description && (
                  <p className="text-sm mb-4 text-white/70 line-clamp-2">{product.description}</p>
                )}

                {/* Luxury CTA: link to product detail */}
                <Link
                  href={`/product/${product.handle}`}
                  className="mt-auto inline-block w-full rounded-sm bg-black px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-90"
                  prefetch={false}
                >
                  ADD TO CART
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
