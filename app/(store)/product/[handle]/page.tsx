import { shopifyFetch } from "@/lib/shopify/shopify";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

// --- 1. TYPE DEFINITIONS ---
export type Product = {
  title: string;
  description: string;
  featuredImage: {
    url: string;
    width: number;
    height: number;
    altText: string | null;
  } | null;
  price: string;
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
  }[];
};

// --- 2. DATA FETCHER (SHOPIFY API) ---
async function getProduct(handle: string): Promise<Product | null> {
  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        title
        description
        images(first: 1) {
          nodes {
            url
            width
            height
            altText
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 10) {
          nodes {
            id
            title
            availableForSale
          }
        }
      }
    }
  `;
  const variables = { handle };
  const res = await shopifyFetch({ query, variables });

  const p = res?.data?.productByHandle;
  if (!p) return null;

  const image = p.images?.nodes?.[0] ?? null;

  // Format the price directly to string (e.g., "IDR 120000.0")
  const priceFormatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: p.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 0,
  }).format(Number(p.priceRange.minVariantPrice.amount));

  return {
    title: p.title,
    description: p.description,
    featuredImage: image
      ? {
          url: image.url,
          width: image.width,
          height: image.height,
          altText: image.altText || null,
        }
      : null,
    price: priceFormatted,
    variants: p.variants?.nodes?.map((v: any) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
    })) || [],
  };
}

// --- 3. METADATA (SEO) ---
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>; // Menggunakan 'slug' sesuai nama folder [slug]
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.slug);

  if (!product) return {};

  return {
    title: `${product.title} | NIX`,
    description: product.description,
  };
}

// --- 4. MAIN PAGE COMPONENT ---
export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.slug);

  // Jika produk tidak ditemukan di Shopify, arahkan ke 404
  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-[#0f0914] text-[#f4f0ec]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* KOLOM KIRI - IMAGE GALLERY */}
        <div className="relative h-[60vh] lg:h-screen w-full bg-black/50">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-900">
              No Image
            </div>
          )}
        </div>

        {/* KOLOM KANAN - PRODUCT DETAILS */}
        <div className="flex flex-col justify-center p-8 lg:p-16 xl:p-24">
          <span className="text-[#f5a3b7] text-sm uppercase tracking-[0.2em] mb-4">
            Dominate,
          </span>
          
          <h1 className="text-4xl lg:text-5xl font-serif uppercase tracking-widest mb-6 leading-tight">
            {product.title}
          </h1>

          <div className="text-base lg:text-lg font-serif leading-relaxed mb-8 border-b border-white/10 pb-8 opacity-80">
            {product.description}
          </div>

          <div className="text-2xl font-serif mb-10 tracking-wider">
            {product.price}
          </div>

          {/* Scent Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex items-center gap-6 mb-8">
              <span className="w-20 text-sm uppercase tracking-widest opacity-60">Scent</span>
              <div className="flex flex-wrap gap-4">
                {product.variants.map((variant, index) => (
                  <button 
                    key={variant.id} 
                    className={`px-6 py-3 text-sm uppercase tracking-widest transition-all ${
                      // Asumsi index 1 adalah Lollipop untuk state aktif (statis visual)
                      index === 1 
                        ? "bg-[#f5a3b7] text-[#0f0914] font-bold" 
                        : "border border-white/20 hover:border-white/60"
                    } ${!variant.availableForSale ? "opacity-30 cursor-not-allowed" : ""}`}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector (Static Visuals) */}
          <div className="flex items-center gap-6 mb-10">
            <span className="w-20 text-sm uppercase tracking-widest opacity-60">Quantity</span>
            <div className="flex items-center border border-white/20 px-4 py-2">
              <button className="px-3 opacity-50 hover:opacity-100 transition-opacity">-</button>
              <span className="px-6 font-serif">1</span>
              <button className="px-3 opacity-50 hover:opacity-100 transition-opacity">+</button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-[#050308] text-white py-5 uppercase tracking-[0.2em] text-sm border border-white/10 mb-6 hover:bg-[#f5a3b7] hover:text-[#0f0914] transition-colors duration-300">
            Add to Cart
          </button>

          <p className="text-center text-xs tracking-widest uppercase opacity-50 mb-12">
            Free shipping on orders above $100
          </p>

          {/* Accordions (Static for Visuals) */}
          <div className="border-t border-white/10">
            <div className="flex justify-between items-center py-5 border-b border-white/10 cursor-pointer hover:opacity-70 transition-opacity">
              <span className="uppercase tracking-widest text-sm">How to Use</span>
              <span className="text-xl font-light">+</span>
            </div>
            <div className="flex justify-between items-center py-5 border-b border-white/10 cursor-pointer hover:opacity-70 transition-opacity">
              <span className="uppercase tracking-widest text-sm">Scientific Formula</span>
              <span className="text-xl font-light">-</span>
            </div>
            <div className="pt-4 pb-6 text-sm font-serif leading-relaxed opacity-70">
              This advanced serum utilizes a potent blend of aphrodisiac extracts and vasodilator compounds to increase blood flow and heighten sensitivity.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}