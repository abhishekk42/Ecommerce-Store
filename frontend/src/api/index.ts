import axios from "axios";
import { Product, CartItem, StoreStats, CheckoutResponse, DiscountResponse } from "../types";

const API_URL = "http://localhost:3000/api";

// Fetch products
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
};

// Fetch cart items
export const fetchCart = async (): Promise<CartItem[]> => {
    try {
        const response = await axios.get<CartItem[]>(`${API_URL}/cart`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw new Error("Failed to fetch cart");
    }
};

// Add item to cart
export const addToCart = async (productId: string): Promise<void> => {
    try {
        await axios.post(`${API_URL}/cart`, { productId, quantity: 1 });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw new Error("Failed to add item to cart");
    }
};

// Remove item from cart
export const removeFromCart = async (productId: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/cart/${productId}`);
    } catch (error) {
        console.error("Error removing item from cart:", error);
        throw new Error("Failed to remove item from cart");
    }
};

// Checkout
export const checkout = async (discountCode: string): Promise<CheckoutResponse> => {
    try {
        const response = await axios.post<CheckoutResponse>(`${API_URL}/checkout`, { discountCode });
        return response.data;
    } catch (error) {
        console.error("Error during checkout:", error);
        throw new Error("Checkout failed");
    }
};

// Get admin stats
export const fetchAdminStats = async (): Promise<StoreStats> => {
    try {
        const response = await axios.get<StoreStats>(`${API_URL}/admin/stats`);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        throw new Error("Failed to fetch store stats");
    }
};

// Generate discount code
export const generateDiscountCode = async (): Promise<DiscountResponse> => {
    try {
        const response = await axios.post<DiscountResponse>(`${API_URL}/admin/generate-discount`);
        return response.data;
    } catch (error) {
        console.error("Error generating discount code:", error);

        if (axios.isAxiosError(error)) {
            // Extract and throw the actual error message from backend
            if (error.response?.data?.error) {
                console.log("hit")
                throw new Error(error.response.data.error);
            }
        }

        throw new Error("Failed to generate discount code");
    }
};
