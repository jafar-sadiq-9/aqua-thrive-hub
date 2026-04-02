import { Fish, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/30 bg-card/40 backdrop-blur-xl mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Fish className="h-6 w-6 text-primary" />
            <span className="font-display font-bold neon-text">NEEDS AQUARISTS</span>
          </div>
          <p className="text-sm text-muted-foreground">Premium aquarium fish, tanks, and accessories. Healthy fish, happy tanks.</p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link to="/fish-care" className="hover:text-primary transition-colors">Fish Care Guide</Link>
            <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Categories</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/shop?category=beginner" className="hover:text-primary transition-colors">Beginner Fish</Link>
            <Link to="/shop?category=exotic" className="hover:text-primary transition-colors">Exotic Fish</Link>
            <Link to="/shop?category=pairs" className="hover:text-primary transition-colors">Fish Pairs</Link>
            <Link to="/shop?category=aquariums" className="hover:text-primary transition-colors">Aquariums</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 text-foreground">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@needsaquarists.com</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Aqua Street, Fish Town</span>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NEEDS AQUARISTS. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
