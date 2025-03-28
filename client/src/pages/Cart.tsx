import CartItems from "@/components/cart-items";

export default function Cart() {
    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <CartItems />
        </main>
    );
}
