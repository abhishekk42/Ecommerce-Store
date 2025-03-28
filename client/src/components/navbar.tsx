import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, Shield } from "lucide-react";

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { name: "Products", path: "/", icon: <Package className="mr-2 h-4 w-4" /> },
        { name: "Admin", path: "/admin", icon: <Shield className="mr-2 h-4 w-4" /> },
        { name: "View Cart", path: "/cart", icon: <ShoppingCart className="mr-2 h-4 w-4" /> },
    ];

    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Ecommerce</h1>
                <div className="flex gap-4">
                    {navItems.map((item) => (
                        <Button
                            key={item.path}
                            variant={location.pathname === item.path ? "outline" : "ghost"}
                            asChild
                        >
                            <Link to={item.path}>{item.icon} {item.name}</Link>
                        </Button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
