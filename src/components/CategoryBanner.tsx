import { Link } from "react-router-dom";
import { Fish, Sparkles, Heart, Box, Wrench } from "lucide-react";

const categories = [
  { key: "beginner", label: "Beginner Fish", icon: Fish, desc: "Easy to care for" },
  { key: "exotic", label: "Exotic Fish", icon: Sparkles, desc: "Rare & stunning" },
  { key: "pairs", label: "Fish Pairs", icon: Heart, desc: "Breeding combos" },
  { key: "aquariums", label: "Aquariums", icon: Box, desc: "Premium tanks" },
  { key: "accessories", label: "Accessories", icon: Wrench, desc: "Filters, lights & more" },
];

const CategoryBanner = () => (
  <section className="container mx-auto px-4 py-16">
    <h2 className="font-display text-2xl font-bold text-center mb-10">
      Shop by <span className="gradient-text">Category</span>
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.key}
          to={`/shop?category=${cat.key}`}
          className="glass-card-hover p-6 text-center group"
        >
          <cat.icon className="h-8 w-8 mx-auto mb-3 text-primary transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_hsl(190,100%,50%)]" />
          <h3 className="font-display text-sm font-semibold mb-1 text-foreground">{cat.label}</h3>
          <p className="text-xs text-muted-foreground">{cat.desc}</p>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryBanner;
