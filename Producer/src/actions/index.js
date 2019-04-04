export const STORE_PRODUCTS = "STORE_PRODUCTS";

export function storeProducts(supplies) {

  return {
    type: STORE_PRODUCTS,
    payload: supplies
  };
}
