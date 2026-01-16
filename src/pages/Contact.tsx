import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill email from URL params (from newsletter)
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setFormData((prev) => ({ ...prev, email: emailParam }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@urbnx.id",
      link: "mailto:hello@urbnx.id",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      value: "+62 812 3456 7890",
      link: "https://wa.me/6281234567890",
    },
    {
      icon: MapPin,
      title: "Lokasi",
      value: "Jakarta, Indonesia",
      link: null,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-secondary">
        <div className="container-brand">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="heading-display mb-6">Hubungi Kami</h1>
            <p className="text-muted-foreground">
              Ada pertanyaan mengenai produk Kami? Jangan ragu untuk
              menghubungi kami. Tim kami siap membantu kamu.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-brand">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-section mb-4">Info Kontak</h2>
                <p className="text-muted-foreground text-sm">
                  Kami siap melayani kamu setiap hari kerja, Senin - Jumat,
                  pukul 09:00 - 18:00 WIB.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium uppercase tracking-wide text-sm mb-1">
                        {info.title}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          target={
                            info.link.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.link.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-secondary p-8 md:p-10">
                <h2 className="heading-section mb-6">Kirim Pesan</h2>

                {isSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl uppercase tracking-wide mb-2">
                      Pesan Terkirim!
                    </h3>
                    <p className="text-muted-foreground">
                      Terima kasih sudah menghubungi kami. Kami akan segera
                      membalas pesan kamu.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wide mb-2">
                          Nama
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none transition-colors"
                          placeholder="Nama lengkap"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium uppercase tracking-wide mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none transition-colors"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium uppercase tracking-wide mb-2">
                        Subjek
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none transition-colors"
                      >
                        <option value="">Pilih subjek</option>
                        <option value="order">Pertanyaan Pesanan</option>
                        <option value="product">Pertanyaan Produk</option>
                        <option value="collaboration">Komplain Produk</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium uppercase tracking-wide mb-2">
                        Pesan
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-background border border-border focus:border-primary outline-none transition-colors resize-none"
                        placeholder="Tulis pesan kamu di sini..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary flex items-center gap-3"
                    >
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
