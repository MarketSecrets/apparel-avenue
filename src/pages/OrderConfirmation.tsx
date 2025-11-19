import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      window.location.href = "/";
    }
  }, [order]);

  if (!order) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
          <h1 className="mt-4 text-3xl font-bold text-foreground">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order has been placed successfully.
          </p>

          <Card className="mt-8 text-left">
            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Order Details</h2>
                <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground">Items</h3>
                <div className="mt-2 space-y-2">
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
                <h3 className="font-semibold text-foreground">Shipping Address</h3>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.phone}</p>
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

          <Link to="/" className="mt-8 inline-block">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
