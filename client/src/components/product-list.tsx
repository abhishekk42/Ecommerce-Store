import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { addToCart, fetchProducts } from "@/api"
import { Product } from "@/types"
import { toast } from "sonner"

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetchProducts().then(setProducts).catch((error) => {
            console.error("Failed to fetch products:", error);
        });
    }, []);

    const handleAddToCart = async (product: Product) => {
        try {
            await addToCart(product.id)
            
            toast.success(`${product.name} has been added to your cart.`, {
                action: { label: "X", onClick: () => { }, },
            });
        } catch (error) {
            console.error("Failed to add product to cart:", error);
            toast.error("Failed to add product to cart.", {
                action: { label: "X", onClick: () => { }, },
            });
        }
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id}>
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-500">{product.description}</p>
                            <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

