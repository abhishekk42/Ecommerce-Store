import ProductList from "@/components/product-list";

export default function Home() {
    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Products</h1>
            <ProductList />
        </main>
    );
}
