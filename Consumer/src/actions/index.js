export const STORE_PRODUCTS = "STORE_PRODUCTS";

export function storeProducts(products) {

  return {
    type: STORE_PRODUCTS,
    payload: products
  };
}