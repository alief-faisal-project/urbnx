import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    category: "Pemesanan",
    questions: [
      {
        q: "Bagaimana cara melakukan pemesanan?",
        a: "Kamu bisa melakukan pemesanan langsung melalui website kami. Pilih produk yang diinginkan, tambahkan ke keranjang, dan ikuti proses checkout. Untuk pertanyaan lebih lanjut, hubungi kami via WhatsApp.",
      },
      {
        q: "Apa saja metode pembayaran yang tersedia?",
        a: "Kami menerima pembayaran melalui transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, Dana, ShopeePay), dan kartu kredit/debit.",
      },
      {
        q: "Apakah bisa melakukan pemesanan via WhatsApp?",
        a: "Ya, kamu bisa melakukan pemesanan langsung via WhatsApp. Tim kami akan membantu proses pemesanan dan pembayaran kamu.",
      },
    ],
  },
  {
    category: "Pengiriman",
    questions: [
      {
        q: "Berapa lama waktu pengiriman?",
        a: "Waktu pengiriman bervariasi tergantung lokasi. Untuk area Jabodetabek biasanya 1-3 hari kerja. Untuk luar Jabodetabek 3-7 hari kerja. Pengiriman ke luar Jawa bisa memakan waktu 5-14 hari kerja.",
      },
      {
        q: "Ekspedisi apa yang digunakan?",
        a: "Kami bekerjasama dengan beberapa ekspedisi terpercaya seperti JNE, J&T, SiCepat, dan Anteraja. Kamu bisa memilih ekspedisi sesuai preferensi saat checkout.",
      },
      {
        q: "Apakah ada gratis ongkir?",
        a: "Ya, kami sering mengadakan promo gratis ongkir untuk pembelian minimum tertentu. Pantau terus media sosial kami untuk info promo terbaru.",
      },
    ],
  },
  {
    category: "Pengembalian & Garansi",
    questions: [
      {
        q: "Bagaimana kebijakan pengembalian produk?",
        a: "Kami memberikan garansi pengembalian 30 hari untuk produk yang cacat atau tidak sesuai pesanan. Produk harus dalam kondisi belum dicuci dan tag masih terpasang.",
      },
      {
        q: "Bagaimana proses klaim pengembalian?",
        a: "Hubungi customer service kami via WhatsApp dengan menyertakan foto produk dan bukti pembelian. Tim kami akan memproses klaim dalam 1-3 hari kerja.",
      },
      {
        q: "Apakah bisa tukar ukuran?",
        a: "Ya, penukaran ukuran bisa dilakukan dalam waktu 7 hari setelah produk diterima. Ongkos kirim penukaran ditanggung pembeli kecuali ada kesalahan dari pihak kami.",
      },
    ],
  },
  {
    category: "Produk",
    questions: [
      {
        q: "Apakah produk URBNX original?",
        a: "Ya, semua produk URBNX adalah 100% original dan diproduksi langsung oleh kami dengan standar kualitas premium.",
      },
      {
        q: "Bagaimana cara merawat produk URBNX?",
        a: "Untuk t-shirt dan hoodie, cuci dengan air dingin dan jangan gunakan pemutih. Jemur dengan bagian dalam menghadap keluar untuk menjaga warna. Untuk tas, bersihkan dengan kain lembab.",
      },
      {
        q: "Apakah tersedia ukuran plus size?",
        a: "Saat ini ukuran terbesar kami adalah XXL. Kami terus berusaha memperluas range ukuran untuk mengakomodasi lebih banyak customer.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-brand max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="heading-display mb-4">FAQ</h1>
            <p className="text-muted-foreground">
              Pertanyaan yang sering diajukan seputar produk dan layanan URBNX.
            </p>
          </div>

          <div className="space-y-10">
            {faqData.map((section) => (
              <div key={section.category}>
                <h2 className="text-lg font-semibold uppercase tracking-wide mb-4 pb-2 border-b border-border">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {section.questions.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${section.category}-${idx}`}
                      className="border border-border px-4"
                    >
                      <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-secondary text-center">
            <h3 className="font-semibold uppercase tracking-wide mb-2">
              Masih ada pertanyaan?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Hubungi tim customer service kami untuk bantuan lebih lanjut.
            </p>
            <a 
              href="/contact" 
              className="btn-primary inline-block"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
