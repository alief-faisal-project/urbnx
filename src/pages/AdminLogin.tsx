import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import logo from "@/assets/logo_urbnx.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/admin/panel");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(email, password);

    if (success) {
      navigate("/admin/panel");
    } else {
      setError(
        "Email atau password salah. Gunakan akun demo: admin@urbnx.com / admin123"
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={logo} alt="URBNX" className="h-10 mx-auto mb-4 invert" />
          <h1 className="text-2xl font-display text-white uppercase tracking-[0.3em]">
            Admin Panel
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Login untuk mengelola produk
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-white/70 text-sm uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@urbnx.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-white/70 text-sm uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>

        {/* Back to Store */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-2
               text-white/50 text-sm
               hover:text-white transition-colors
             "
          >
            <span className="relative w-4 h-4 inline-block">
              {/* default icon */}
              <i
                className="fa-solid fa-arrow-left
                    absolute inset-0
                    opacity-100 group-hover:opacity-0
                    transition-opacity duration-200"
              ></i>

              {/* hover icon */}
              <i
                className="fa-solid fa-arrow-left-long
                    absolute inset-0
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200"
              ></i>
            </span>

            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
