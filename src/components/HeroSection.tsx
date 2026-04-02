import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Waves } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
    <img
      src={heroBg}
      alt="Underwater aquarium"
      width={1920}
      height={1080}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
    <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

    <div className="relative z-10 text-center px-4 animate-slide-up max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Waves className="h-6 w-6 text-primary animate-float" />
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Premium Aquarium Store</span>
        <Waves className="h-6 w-6 text-primary animate-float" style={{ animationDelay: "1s" }} />
      </div>
      <h1 className="font-display text-5xl md:text-7xl font-black mb-4 tracking-tight">
        <span className="gradient-text">NEEDS</span>{" "}
        <span className="text-foreground">AQUARISTS</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
        Healthy Fish. Happy Tanks.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/shop" className="btn-neon flex items-center gap-2 text-base">
          Shop Now <ArrowRight className="h-5 w-5" />
        </Link>
        <Link to="/shop?category=pairs" className="btn-outline-neon flex items-center gap-2 text-base">
          🐟 Fish Pairs
        </Link>
      </div>
    </div>

    {/* Floating bubbles decoration */}
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-primary/20 animate-float"
          style={{
            width: `${8 + Math.random() * 16}px`,
            height: `${8 + Math.random() * 16}px`,
            left: `${10 + i * 12}%`,
            bottom: `${Math.random() * 60}px`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  </section>
);

export default HeroSection;
