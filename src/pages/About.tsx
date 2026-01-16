import Layout from "@/components/Layout";
import { Check } from "lucide-react";

const values = [
  {
    title: "Kualitas Tanpa Kompromi",
    description: "Setiap produk URBNX dibuat dengan standar kualitas tertinggi. Kami memilih material terbaik dan proses produksi yang teliti untuk memastikan kepuasan pelanggan.",
  },
  {
    title: "Autentik & Original",
    description: "Desain eksklusif yang lahir dari kreativitas tim kami. Tidak ada tiruan, hanya karya original yang mencerminkan identitas brand URBNX.",
  },
  {
    title: "Eksklusivitas",
    description: "Kami percaya bahwa nilai terletak pada kelangkaan. Setiap koleksi diproduksi dalam jumlah terbatas untuk menjaga eksklusivitas.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary">
        <div className="container-brand">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
              Tentang Kami
            </p>
            <h1 className="heading-display mb-6">Be Authentic In Your Own Style</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              URBNX adalah brand fashion streetwear Indonesia yang lahir dari semangat 
              untuk mengekspresikan identitas diri melalui fashion. Kami menghadirkan 
              produk berkualitas premium dengan desain yang berani dan autentik.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-brand">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                Cerita Kami
              </p>
              <h2 className="heading-section mb-6">Dari Passion Menjadi Brand</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  URBNX didirikan oleh sekelompok anak muda Indonesia yang memiliki 
                  passion dalam dunia fashion dan streetwear. Berawal dari kecintaan 
                  terhadap gaya urban yang bold dan maskulin, kami memutuskan untuk 
                  menciptakan brand yang bisa merepresentasikan generasi muda Indonesia.
                </p>
                <p>
                  Nama URBNX sendiri merupakan singkatan dari "Urban X" - simbol dari 
                  generasi yang berani tampil beda dan tidak takut mengekspresikan 
                  diri. Huruf X melambangkan variabel tak terbatas, menunjukkan bahwa 
                  setiap individu memiliki potensi unik yang patut dirayakan.
                </p>
                <p>
                  Sejak berdiri, kami berkomitmen untuk menghadirkan produk berkualitas 
                  tinggi dengan harga yang terjangkau. Kami percaya bahwa fashion 
                  berkualitas seharusnya bisa diakses oleh semua orang.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-brand-blue to-background flex items-center justify-center">
                <p className="heading-display text-8xl md:text-9xl opacity-10">X</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-brand">
          <div className="text-center mb-12">
            <p className="text-sm text-primary-foreground/70 uppercase tracking-widest mb-2">
              Nilai Kami
            </p>
            <h2 className="heading-section">Apa Yang Kami Pegang Teguh</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="p-8 border border-primary-foreground/20 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 bg-primary-foreground text-primary flex items-center justify-center mb-6">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl uppercase tracking-wide mb-3">
                  {value.title}
                </h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="section-padding">
        <div className="container-brand">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 bg-secondary">
              <h3 className="heading-section mb-4">Visi</h3>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi brand streetwear terdepan di Indonesia yang dikenal karena 
                kualitas, keaslian, dan desain yang berani. Kami ingin menginspirasi 
                generasi muda untuk tampil percaya diri dengan gaya mereka sendiri.
              </p>
            </div>
            <div className="p-8 bg-secondary">
              <h3 className="heading-section mb-4">Misi</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  Menghadirkan produk fashion berkualitas premium dengan harga terjangkau
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  Menciptakan desain original yang mencerminkan karakter urban Indonesia
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  Membangun komunitas yang saling mendukung dan menginspirasi
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
