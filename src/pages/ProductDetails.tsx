import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>("M");

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Product not found</h1>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    toast({
      title: "Added to cart",
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/shop")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <h1 className="mt-2 text-3xl font-bold text-foreground">
                {product.name}
              </h1>
              <p className="mt-4 text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Product Details</h2>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Premium quality fabric</li>
                <li>• Comfortable fit</li>
                <li>• Machine washable</li>
                <li>• Available in multiple sizes</li>
              </ul>
            </div>

            <div className="space-y-4 border-t border-border pt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Select Size
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAddToCart} size="lg" className="w-full">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
