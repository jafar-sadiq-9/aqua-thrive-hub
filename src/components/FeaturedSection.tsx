import { useProducts } from "@/context/ProductContext";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedSection = () => {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">Featured</span> Products
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Hand-picked selection of our finest fish, tanks, and gear.
        </p>
      </div>
      {featured.length === 0 ? (
        <p className="text-center text-muted-foreground">No featured products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-10">
        <Link to="/shop" className="btn-outline-neon inline-flex items-center gap-2">
          View All Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSection;
