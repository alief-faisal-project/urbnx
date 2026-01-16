import Layout from "@/components/Layout";

const sizeData = {
  "T-Shirt": {
    headers: ["Size", "Lebar (cm)", "Panjang (cm)", "Berat (kg)"],
    rows: [
      ["S", "48", "68", "50-60"],
      ["M", "51", "70", "60-70"],
      ["L", "54", "72", "70-80"],
      ["XL", "57", "74", "80-90"],
      ["XXL", "60", "76", "90+"],
    ],
  },
  "Hoodie": {
    headers: ["Size", "Lebar (cm)", "Panjang (cm)", "Lengan (cm)", "Berat (kg)"],
    rows: [
      ["S", "54", "66", "59", "50-60"],
      ["M", "57", "68", "61", "60-70"],
      ["L", "60", "70", "63", "70-80"],
      ["XL", "63", "72", "65", "80-90"],
      ["XXL", "66", "74", "67", "90+"],
    ],
  },
};

const SizeGuide = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-brand max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="heading-display mb-4">Size Guide</h1>
            <p className="text-muted-foreground">
              Temukan ukuran yang tepat untuk kamu dengan panduan ukuran berikut.
            </p>
          </div>

          {/* T-Shirt Size Chart */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold uppercase tracking-wide mb-6">T-Shirt</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-border">
                <thead>
                  <tr className="bg-secondary">
                    {sizeData["T-Shirt"].headers.map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide border-b border-border"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeData["T-Shirt"].rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-secondary/50 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={`px-6 py-4 text-sm border-b border-border ${
                            cellIdx === 0 ? "font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hoodie Size Chart */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold uppercase tracking-wide mb-6">Hoodie</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-border">
                <thead>
                  <tr className="bg-secondary">
                    {sizeData["Hoodie"].headers.map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide border-b border-border"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeData["Hoodie"].rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-secondary/50 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td
                          key={cellIdx}
                          className={`px-6 py-4 text-sm border-b border-border ${
                            cellIdx === 0 ? "font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div className="bg-secondary p-8 md:p-10">
            <h2 className="text-xl font-semibold uppercase tracking-wide mb-6">
              Cara Mengukur
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Lebar:</strong> Ukur dari ketiak kiri ke ketiak kanan dalam keadaan datar.
              </p>
              <p>
                <strong className="text-foreground">Panjang:</strong> Ukur dari bagian tertinggi bahu hingga ujung bawah pakaian.
              </p>
              <p>
                <strong className="text-foreground">Lengan:</strong> Ukur dari jahitan bahu hingga ujung lengan.
              </p>
              <p className="pt-4 border-t border-border">
                Tips: Jika kamu berada di antara dua ukuran, kami sarankan untuk memilih ukuran yang lebih besar untuk kenyamanan optimal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SizeGuide;
