import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<any>(null);
  const { toast } = useToast();

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find(
      (o: any) => o.id.toString() === orderId && o.shippingAddress.email === email
    );

    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      toast({
        title: "Order not found",
        description: "Please check your order ID and email address.",
        variant: "destructive",
      });
      setOrder(null);
    }
  };

  const getOrderStatus = (orderDate: string) => {
    const date = new Date(orderDate);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) return { status: "Processing", color: "text-blue-600" };
    if (daysDiff <= 2) return { status: "Shipped", color: "text-purple-600" };
    if (daysDiff <= 5) return { status: "Out for Delivery", color: "text-orange-600" };
    return { status: "Delivered", color: "text-green-600" };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-3xl font-bold text-foreground">Track Your Order</h1>

          <Card>
            <CardHeader>
              <CardTitle>Enter Order Details</CardTitle>
              <CardDescription>
                Enter your order ID and email address to track your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    placeholder="e.g., 1700000000000"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Track Order
                </Button>
              </form>
            </CardContent>
          </Card>

          {order && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="text-lg font-semibold text-foreground">{order.id}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`text-lg font-semibold ${getOrderStatus(order.date).color}`}>
                    {getOrderStatus(order.date).status}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="text-foreground">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Items</p>
                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} (Size: {item.size}) x {item.quantity}
                        </span>
                        <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-foreground">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Shipping Address</p>
                  <div className="text-sm text-foreground">
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
