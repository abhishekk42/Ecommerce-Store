import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchCart } from "../api";
import { CartContextType, CartItem } from "../types";

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const loadCart = async () => {
        try {
            const cartData = await fetchCart();
            setCart(cartData || []);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            setCart([]);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart, loadCart }}>{children}</CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};