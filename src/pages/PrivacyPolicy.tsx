import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-brand max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="heading-display mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">
              Terakhir diperbarui: Januari 2024
            </p>
          </div>

          <div className="prose prose-sm max-w-none space-y-8">
            <section>
              <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">
                1. Informasi yang Kami Kumpulkan
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Kami mengumpulkan informasi yang kamu berikan secara langsung saat melakukan pemesanan atau berinteraksi dengan layanan kami, termasuk nama lengkap, alamat email, nomor telepon, dan alamat pengiriman.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">
                2. Penggunaan Informasi
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Informasi yang kami kumpulkan digunakan untuk:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Memproses dan mengirimkan pesanan kamu
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Mengirimkan update status pesanan
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Merespon pertanyaan dan permintaan bantuan
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  Mengirimkan informasi promosi (dengan persetujuan)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">
                3. Keamanan Data
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Kami berkomitmen untuk melindungi informasi pribadi kamu. Kami menerapkan langkah-langkah keamanan yang wajar untuk mencegah akses tidak sah, pengungkapan, atau modifikasi data pribadi kamu.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">
                4. Pembagian Informasi
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Kami tidak menjual atau menyewakan informasi pribadi kamu kepada pihak ketiga. Informasi hanya dibagikan kepada pihak ketiga yang diperlukan untuk memproses pesanan kamu, seperti jasa pengiriman.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">
                5. Cookie
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Website kami menggunakan cookie untuk meningkatkan pengalaman browsing kamu. Cookie membantu kami mengingat preferensi kamu dan menganalisis traffic website untuk perbaikan layanan.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">
                6. Hak Kamu
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Kamu memiliki hak untuk mengakses, memperbaiki, atau menghapus informasi pribadi yang kami simpan. Untuk permintaan terkait data pribadi, silakan hubungi kami melalui halaman kontak.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">
                7. Perubahan Kebijakan
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan signifikan akan diinformasikan melalui website atau email.
              </p>
            </section>

            <section className="pt-8 border-t border-border">
              <h2 className="text-lg font-semibold uppercase tracking-wide mb-4">
                Hubungi Kami
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Jika kamu memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami melalui halaman{" "}
                <a href="/contact" className="text-foreground underline hover:no-underline">
                  Kontak
                </a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
