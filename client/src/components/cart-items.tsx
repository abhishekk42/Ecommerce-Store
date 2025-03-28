import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useCart } from "@/context/CartContext"
import { checkout, fetchCart, removeFromCart } from "@/api"
import { Link } from "react-router-dom"

export default function CartItems() {
    const [discountCode, setDiscountCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);
    const { cart, setCart, loadCart } = useCart();

    useEffect(() => {
        loadCart();
    }, []);

    const handleRemoveItem = async (id: string) => {
        console.log("Removing item:", id);
        try {
            await removeFromCart(id);

            const updatedCart = await fetchCart();
            setCart(updatedCart || []);
            toast.error("The item has been successfully removed from your cart.", {
                action: { label: "X", onClick: () => { }, },
            });
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Failed to remove item.", {
                action: { label: "X", onClick: () => { }, },
            });
        }
    };


    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const result = await checkout(discountCode);
            setCart([]);
            setDiscountCode("");
            setCheckoutSuccess(true);

            toast.success("Order placed successfully!", {
                description: result.message,
                action: { label: "X", onClick: () => { }, },
            });
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Checkout failed", {
                description: error instanceof Error ? error.message : "An unknown error occurred",
                action: { label: "X", onClick: () => { }, },
            });
        } finally {
            setIsLoading(false);
        }
    };

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div>
            {cart.length === 0 ? (
                <div className="text-center py-10">
                    {
                        checkoutSuccess &&
                        <div className="text-center py-6">
                            <h1 className="text-5xl font-semibold text-green-600">Checkout Successful!</h1>
                        </div>
                    }

                    <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-4">Add some products to your cart to continue shopping.</p>
                    <Button asChild>
                        <Link to="/">Browse Products</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Cart Items</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                {cart.map((item) => (
                                    <div key={item.productId} className="flex items-center justify-between py-2">
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button variant="outline" size="icon" className="ml-2" onClick={() => handleRemoveItem(item.productId)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="discount-code">Discount Code</Label>
                                    <Input
                                        id="discount-code"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value)}
                                        placeholder="Enter discount code"
                                    />
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
                                    {isLoading ? "Processing..." : "Checkout"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}

