import { Link } from "react-router-dom";
import { Fish, Box } from "lucide-react";

const categories = [
  { key: "fishes", label: "Fishes", icon: Fish, desc: "Freshwater & exotic fish" },
  { key: "aquariums-accessories", label: "Aquariums & Accessories", icon: Box, desc: "Tanks, filters, lights & more" },
];

const CategoryBanner = () => (
  <section className="container mx-auto px-4 py-16">
    <h2 className="font-display text-2xl font-bold text-center mb-10">
      Shop by <span className="gradient-text">Category</span>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
      {categories.map((cat) => (
        <Link
          key={cat.key}
          to={`/shop?category=${cat.key}`}
          className="glass-card-hover p-8 text-center group"
        >
          <cat.icon className="h-10 w-10 mx-auto mb-3 text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary))]" />
          <h3 className="font-display text-lg font-semibold mb-1 text-foreground">{cat.label}</h3>
          <p className="text-sm text-muted-foreground">{cat.desc}</p>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryBanner;
