import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Fish, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/fish-care", label: "Fish Care" },
    { to: "/cart", label: "Cart" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30" style={{ borderRadius: 0 }}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Fish className="h-7 w-7 text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_10px_hsl(190,100%,50%)]" />
          <span className="font-display font-bold text-lg neon-text tracking-wider">NEEDS AQUARISTS</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive(link.to)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
              {link.to === "/cart" && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Auth / Admin */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {user.isAdmin && (
                <Link to="/admin" className="btn-outline-neon text-xs px-4 py-2">
                  Admin
                </Link>
              )}
              <Link to="/my-orders" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Package className="h-4 w-4" /> Orders
              </Link>
              <span className="text-sm text-muted-foreground">{user.name}</span>
              <button onClick={logout} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              <User className="h-4 w-4" /> Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t border-border/30 animate-slide-down" style={{ borderRadius: 0 }}>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to) ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                {link.label} {link.to === "/cart" && totalItems > 0 && `(${totalItems})`}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="text-left px-4 py-2 text-sm text-muted-foreground">
                Logout ({user.name})
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-2 text-sm text-muted-foreground">
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
