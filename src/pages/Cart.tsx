import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to proceed with checkout.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold text-foreground">Your Cart is Empty</h1>
          <p className="mb-8 text-muted-foreground">Add some products to get started!</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.id}-${item.size}`}>
                <CardContent className="flex gap-4 p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    <p className="mt-1 font-semibold text-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center text-foreground">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
