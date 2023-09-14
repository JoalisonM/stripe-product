import { api } from "../lib/axios";

const productUrl = "/products"

export const Product = {
  getAll() {
    return api.get(productUrl);
  },

  get(id: string) {
    return api.get(`${productUrl}/${id}`);
  },

  checkout(priceId: string) {
    return api.post(`${productUrl}/checkout/${priceId}`);
  },
}