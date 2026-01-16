import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Navigate to contact page with email as query parameter
      navigate(`/contact?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-brand">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="heading-section mb-4">Layanan Pelanggan</h2>
          <p className="text-primary-foreground/70 mb-8">
            Jika produk yang kamu terima tidak sesuai, silahkan ajukan komplain
            atau permintaan penukaran melalui formulir ini.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email kamu"
              className="flex-1 px-6 py-4 bg-primary-foreground text-primary placeholder:text-primary/50 outline-none transition-all focus:ring-2 focus:ring-primary-foreground/50"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-primary-foreground text-primary font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-foreground/90 transition-all hover:gap-4"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-xs text-primary-foreground/50">
            Dengan melanjutkan, kamu menyetujui syarat dan ketentuan komplain
            serta penukaran produk yang berlaku.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
