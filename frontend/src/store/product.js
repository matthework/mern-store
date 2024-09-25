import { create } from "zustand";
import apiFetch from "../controllers/apiFetch";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all fields." };
    }
    const res = await apiFetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Successfully created." };
  },
  fetchProducts: async () => {
    const res = await apiFetch("/api/products");
    const data = await res.json();
    // const data = json.success ? json : Promise.reject(json);
    set({ products: data.data });
    // return { success: true, message: "Successfully loaded." };
  },
  deleteProduct: async (pid) => {
    const res = await apiFetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    // update UI immediately, without needing a refresh
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: "Successfully deleted." };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await apiFetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    // update UI immediately, without needing a refresh
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: "Successfully updated." };
  },
}));
