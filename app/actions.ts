"use server";

import { shopifyFetch } from "@/lib/shopify";

export async function createCartAction(variantId: string, quantity: number) {
  type CartCreateOperation = {
    data: {
      cartCreate: {
        cart: {
          checkoutUrl: string;
        } | null;
      } | null;
    };
    variables: {
      variantId: string;
      quantity: number;
    };
  };

  const mutation = `
    mutation CartCreate($variantId: ID!, $quantity: Int!) {
      cartCreate(
        input: {
          lines: [
            {
              merchandiseId: $variantId,
              quantity: $quantity
            }
          ]
        }
      ) {
        cart {
          checkoutUrl
        }
      }
    }
  `;

  const res = await shopifyFetch<CartCreateOperation>({
    query: mutation,
    variables: { variantId, quantity },
  });

  return res.body.data.cartCreate?.cart?.checkoutUrl;
}