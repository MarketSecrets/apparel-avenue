import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>("M");

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    toast({
      title: "Added to cart",
      description: `${product.name} (Size: ${selectedSize}) has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <h3 className="mt-1 font-semibold text-foreground">{product.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
        <p className="mt-2 text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-24">
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
        <Button onClick={handleAddToCart} className="flex-1">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
