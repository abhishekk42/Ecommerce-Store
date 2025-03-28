import { useState } from "react";
import { checkout } from "../api";

export default function Checkout() {
    const [discountCode, setDiscountCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            setError(null);
            await checkout(discountCode);
            alert("Order placed successfully!");
            setDiscountCode(""); // Clear the input after successful checkout
        } catch (err) {
            console.error("Error during checkout:", err);
            setError("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter Discount Code"
                disabled={loading}
            />
            <button onClick={handleCheckout} disabled={loading}>
                {loading ? "Placing Order..." : "Place Order"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
