"use client";

import { createCartAction } from "@/app/actions";
import type { ProductVariant } from "@/lib/shopify/types";
import { useMemo, useState, useTransition } from "react";

export default function AddToCart({ variants }: { variants: ProductVariant[] }) {
  const initialVariant = useMemo(
    () => variants.find((v) => v.availableForSale) ?? variants[0],
    [variants]
  );

  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(initialVariant);
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    if (!selectedVariant?.id) return;
    startTransition(async () => {
      const checkoutUrl = await createCartAction(selectedVariant.id, quantity);
      if (checkoutUrl) window.location.assign(checkoutUrl);
    });
  };

  return (
    <div>
      {/* Scent Selector */}
      {variants.length > 0 && (
        <div className="mb-8 flex items-center gap-6">
          <span className="w-20 font-serif text-sm uppercase tracking-[0.3em] text-white/60">
            Scent
          </span>
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariant(variant)}
                disabled={!variant.availableForSale}
                className={[
                  "border bg-transparent px-5 py-2.5 text-xs uppercase tracking-[0.3em] transition-colors",
                  selectedVariant?.id === variant.id
                    ? "border-[#f5a3b7] text-[#f5a3b7]"
                    : "border-white/20 text-[#f4f0ec] hover:border-[#f5a3b7] hover:text-[#f5a3b7]",
                  !variant.availableForSale
                    ? "cursor-not-allowed opacity-30"
                    : "cursor-pointer",
                ].join(" ")}
              >
                {variant.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="mb-8 flex items-center gap-6">
        <span className="w-20 font-serif text-sm uppercase tracking-[0.3em] text-white/60">
          Quantity
        </span>
        <div className="flex items-center rounded border border-white/10 bg-transparent px-3 py-2">
          <button
            type="button"
            className="px-3 text-xl text-white/70 transition hover:text-white disabled:opacity-40"
            disabled={isPending || quantity <= 1}
            onClick={() => setQuantity((cur) => Math.max(1, cur - 1))}
          >
            −
          </button>
          <span className="w-12 select-none px-6 text-center font-serif text-lg">
            {quantity}
          </span>
          <button
            type="button"
            className="px-3 text-xl text-white/70 transition hover:text-white disabled:opacity-40"
            disabled={isPending}
            onClick={() => setQuantity((cur) => cur + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isPending || !selectedVariant?.availableForSale}
        className="mb-8 w-full rounded-sm bg-black py-5 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {isPending ? "REDIRECTING..." : "ADD TO CART"}
      </button>

      <div className="flex flex-col gap-2 text-center text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span>FREE SHIPPING ON ORDERS ABOVE $100</span>
      </div>
    </div>
  );
}