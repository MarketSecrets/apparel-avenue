import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Truck, Shield, Heart } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container py-20 text-center">
        <h1 className="mb-6 text-5xl font-bold text-foreground">
          Discover Your Style
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Explore our curated collection of premium clothing designed for comfort and style. 
          From casual wear to elegant pieces, find your perfect outfit today.
        </p>
        <Link to="/shop">
          <Button size="lg" className="text-lg">
            Shop Now
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Quality Products</h3>
              <p className="text-sm text-muted-foreground">
                Premium materials and craftsmanship in every piece
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Quick and reliable shipping to your doorstep
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">
                Safe and encrypted payment processing
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">Made with Love</h3>
              <p className="text-sm text-muted-foreground">
                Carefully selected items just for you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Ready to Upgrade Your Wardrobe?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          Join thousands of satisfied customers who trust us for their fashion needs
        </p>
        <Link to="/shop">
          <Button size="lg" variant="outline">
            Browse Collection
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
