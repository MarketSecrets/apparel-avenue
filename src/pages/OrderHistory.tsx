import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

const OrderHistory = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const userOrders = allOrders.filter((order: any) => order.shippingAddress.email === user?.email);
    setOrders(userOrders.reverse());
  }, [isAuthenticated, user, navigate]);

  const getOrderStatus = (orderDate: string) => {
    const date = new Date(orderDate);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) return { status: "Processing", variant: "default" as const };
    if (daysDiff <= 2) return { status: "Shipped", variant: "secondary" as const };
    if (daysDiff <= 5) return { status: "Out for Delivery", variant: "outline" as const };
    return { status: "Delivered", variant: "default" as const };
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Order History</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(order.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge variant={getOrderStatus(order.date).variant}>
                      {getOrderStatus(order.date).status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Items</h3>
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

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Shipping Address</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderHistory;
