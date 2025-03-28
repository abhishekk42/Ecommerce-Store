import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { useEffect, useState } from "react";
import { fetchAdminStats, generateDiscountCode } from "../api";
import { StoreStats } from "@/types";
import { Copy } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState<StoreStats | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchAdminStats();
                console.log("data", data);
                setStats(data);
            } catch (err) {
                console.error("Error:", err);
                toast.error("Failed to load admin stats.", {
                    action: { label: "X", onClick: () => { }, },
                });
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    const handleGenerateDiscountCode = async () => {
        try {
            const response = await generateDiscountCode();
            toast.success(`New Discount Code: ${response.code}`);

            const updatedStats = await fetchAdminStats();
            setStats(updatedStats);
        } catch (err) {
            console.error("Error:", err);
            if (err instanceof Error) {
                toast.error(err.message || "Something went wrong.", {
                    action: { label: "X", onClick: () => { }, },
                });
            } else {
                toast.error("Failed to generate discount code.", {
                    action: { label: "X", onClick: () => { }, },
                });
            }
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    if (!stats) return <div className="text-center py-10">Loading...</div>

    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid gap-6">
                {/* Summary Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    {[
                        { title: "Total Orders", value: stats.totalOrders },
                        { title: "Items Purchased", value: stats.totalItemsPurchased },
                        { title: "Total Revenue", value: `$${stats.totalPurchaseAmount ? stats.totalPurchaseAmount.toFixed(2) : "0.00"}` },
                    ].map(({ title, value }) => (
                        <Card key={title}>
                            <CardHeader>
                                <CardTitle>{title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{value}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Discount Codes */}
                <Card>
                    <CardHeader className="flex items-center justify-between">
                        <CardTitle>Discount Codes</CardTitle>
                        <Button onClick={handleGenerateDiscountCode} disabled={isLoading}>
                            {isLoading ? "Generating..." : "Generate Discount Code"}</Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Discount Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {stats.discountCodes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">
                                            No discount codes generated yet
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    stats.discountCodes.map(({ code, used, discountAmount }) => (
                                        <TableRow key={code}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                {code}
                                                <Button variant="ghost" size="icon" onClick={() => handleCopy(code)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                            <TableCell>{used ? "Used" : "Available"}</TableCell>
                                            <TableCell>${discountAmount ? discountAmount.toFixed(2) : "0.00"}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Total Discount Amount */}
                <Card>
                    <CardHeader>
                        <CardTitle>Total Discount Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">
                            ${stats?.totalDiscountAmount ? stats.totalDiscountAmount.toFixed(2) : "0.00"}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main >
    )
}
