import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Fish } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(phone, password)) {
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <div className="glass-card neon-border p-8 w-full max-w-sm animate-scale-in">
        <div className="text-center mb-6">
          <Fish className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">Login to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            required
          />
          <button type="submit" className="btn-neon w-full text-sm">Login</button>
        </form>
        <p className="text-center text-xs text-muted-foreground mt-4">
          New here?{" "}
          <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
        </p>
        <p className="text-center text-[10px] text-muted-foreground mt-3 glass-card p-2 rounded">
          Demo admin: 9999999999 / admin123
        </p>
      </div>
    </div>
  );
};

export default Login;
