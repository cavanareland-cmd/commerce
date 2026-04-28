const domain = process.env.SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({ query, variables }: { query: string, variables?: any }) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken!,
    },
    body: JSON.stringify({ query, variables }),
  });

  return res.json();
}

export async function createCart(variantId: string, quantity: number) {
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
  const variables = {
    variantId,
    quantity,
  };

  const res = await shopifyFetch({ query: mutation, variables });
  return res?.data?.cartCreate?.cart?.checkoutUrl;
}