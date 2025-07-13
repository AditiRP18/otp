import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../components/ui/table";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
}

const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#A28BFE", "#FF6699", "#FFB347", "#B6E880"];

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("isAuthenticated")) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, []);

  // --- Analytics Data ---
  // Category Distribution
  const categoryData = React.useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [products]);

  // Price Ranges
  const priceData = React.useMemo(() => {
    const ranges = [
      { name: "< $10", min: 0, max: 10 },
      { name: "$10 - $20", min: 10, max: 20 },
      { name: "$20 - $50", min: 20, max: 50 },
      { name: ">$50", min: 50, max: Infinity },
    ];
    const counts = [0, 0, 0, 0];
    products.forEach((p) => {
      for (let i = 0; i < ranges.length; i++) {
        if (p.price >= ranges[i].min && p.price < ranges[i].max) {
          counts[i]++;
          break;
        }
      }
    });
    return ranges.map((r, i) => ({ name: r.name, value: counts[i] }));
  }, [products]);

  // Rating Analysis
  const ratingData = React.useMemo(() => {
    const buckets = [
      { name: "< 2", min: 0, max: 2 },
      { name: "2 - 3.5", min: 2, max: 3.5 },
      { name: "3.5 - 4.5", min: 3.5, max: 4.5 },
      { name: ">= 4.5", min: 4.5, max: 5.1 },
    ];
    const counts = [0, 0, 0, 0];
    products.forEach((p) => {
      for (let i = 0; i < buckets.length; i++) {
        if (p.rating >= buckets[i].min && p.rating < buckets[i].max) {
          counts[i]++;
          break;
        }
      }
    });
    return buckets.map((b, i) => ({ name: b.name, value: counts[i] }));
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300 p-8">
      <Card className="w-full max-w-7xl p-8 shadow-2xl bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Products Dashboard</h1>
          <Button
            variant="destructive"
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </div>
        {loading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>All Products</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <Table className="text-xs">
                <TableCaption>All product data from the API</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount (%)</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Dimensions</TableHead>
                    <TableHead>Warranty</TableHead>
                    <TableHead>Shipping</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Return Policy</TableHead>
                    <TableHead>Min Order Qty</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Barcode</TableHead>
                    <TableHead>QR</TableHead>
                    <TableHead>Thumb</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead>Reviews</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id} className="align-top">
                      <TableCell>{p.id}</TableCell>
                      <TableCell>{p.title}</TableCell>
                      <TableCell className="max-w-[120px] truncate" title={p.description}>{p.description}</TableCell>
                      <TableCell>{p.category}</TableCell>
                      <TableCell>${p.price}</TableCell>
                      <TableCell>{p.discountPercentage}</TableCell>
                      <TableCell>{p.rating}</TableCell>
                      <TableCell>{p.stock}</TableCell>
                      <TableCell>{p.tags?.join(", ")}</TableCell>
                      <TableCell>{p.brand}</TableCell>
                      <TableCell>{p.sku}</TableCell>
                      <TableCell>{p.weight}</TableCell>
                      <TableCell>{p.dimensions ? `${p.dimensions.width}x${p.dimensions.height}x${p.dimensions.depth}` : "-"}</TableCell>
                      <TableCell>{p.warrantyInformation}</TableCell>
                      <TableCell>{p.shippingInformation}</TableCell>
                      <TableCell>{p.availabilityStatus}</TableCell>
                      <TableCell>{p.returnPolicy}</TableCell>
                      <TableCell>{p.minimumOrderQuantity}</TableCell>
                      <TableCell className="whitespace-nowrap">{p.meta?.createdAt?.slice(0, 10)}</TableCell>
                      <TableCell className="whitespace-nowrap">{p.meta?.updatedAt?.slice(0, 10)}</TableCell>
                      <TableCell>{p.meta?.barcode}</TableCell>
                      <TableCell>{p.meta?.qrCode ? <img src={p.meta.qrCode} alt="QR" className="w-5 h-5" /> : "-"}</TableCell>
                      <TableCell><img src={p.thumbnail} alt={p.title} className="w-6 h-6 object-cover rounded" /></TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap max-w-[80px] overflow-x-auto">
                          {p.images?.map((img, idx) => (
                            <img key={idx} src={img} alt={p.title + " image " + (idx + 1)} className="w-5 h-5 object-cover rounded" />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {p.reviews?.length ? (
                          <ul className="text-[10px] max-w-[120px]">
                            {p.reviews.slice(0, 2).map((r, i) => (
                              <li key={i}>
                                <b>{r.reviewerName}:</b> {r.comment} ({r.rating}/5)
                              </li>
                            ))}
                            {p.reviews.length > 2 && <li>...and {p.reviews.length - 2} more</li>}
                          </ul>
                        ) : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
