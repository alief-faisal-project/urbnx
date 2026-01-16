import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Premium Quality",
    description: "Material berkualitas tinggi yang tahan lama dan nyaman digunakan sehari-hari.",
  },
  {
    title: "100% Authentic",
    description: "Produk original dengan desain eksklusif yang tidak bisa ditemukan di tempat lain.",
  },
  {
    title: "Limited Edition",
    description: "Setiap koleksi diproduksi terbatas untuk menjaga eksklusivitas brand.",
  },
];

const BrandPhilosophy = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-brand">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
                Filosofi Brand
              </p>
              <h2 className="heading-section mb-6">Be Authentic In Your Own Style</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                URBNX lahir dari semangat untuk mengekspresikan identitas diri melalui fashion. 
                Kami percaya bahwa setiap individu memiliki gaya unik yang patut dirayakan. 
                Dengan produk berkualitas premium dan desain yang berani, kami mengajak kamu 
                untuk tampil percaya diri dan autentik.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="text-left p-6 bg-background animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold uppercase tracking-wide text-sm">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/about" className="btn-primary inline-block">
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPhilosophy;
