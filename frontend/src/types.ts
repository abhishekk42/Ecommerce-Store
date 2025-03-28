// Product Type
export type Product = {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    price: number;
};

// Cart Item Type
export type CartItem = {
    productId: string;
    name: string;
    price: number;
    quantity: number;
};

// Store Stats Type (for Admin)
export type StoreStats = {
    totalOrders: number;
    totalRevenue: number;
    totalPurchaseAmount: number;
    totalItemsPurchased?: number;
    totalDiscountAmount: number;
    discountCodes: { code: string; used: boolean; discountAmount: number }[];
};

// API Response Type for Checkout
export type CheckoutResponse = {
    success: boolean;
    message: string;
};

// API Response Type for Adding to Cart
export type AddToCartResponse = {
    success: boolean;
    message: string;
    cartItem: CartItem;
};

// API Response Type for Discount Code Generation
export type DiscountResponse = {
    success: boolean;
    code: string;
};

export interface CartContextType {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    loadCart: () => Promise<void>;
}
