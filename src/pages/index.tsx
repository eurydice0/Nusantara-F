import Image from "next/image";
import localFont from "next/font/local";
import { useRouter } from "next/router"; // Import useRouter untuk navigasi

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter(); // Inisialisasi router

  const goToMenu = () => {
    router.push("/menu"); // Navigasi ke halaman order
  };

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white`}>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mt-20" style={{ maxWidth: "120%" }}>
        <img src="mieayam.png" style={{ width: 175 }} alt="" />

        <center>
          <div>
            <div style={{ backgroundColor: "#772A2A", borderRadius: 5 }} onClick={goToMenu} className="cursor-pointer">
              <h2 style={{ color: "white", fontFamily: "sans-serif", fontWeight: "bold", width: 270, fontSize: 14, padding: 10 }}>ORDER DISINI</h2>
            </div>
          </div>

          <div style={{ marginTop: 30 }}>
            <h2 style={{ color: "black", marginTop: "10%" }}>BISA ORDER JUGA DI</h2>

            <div style={{ marginTop: 10 }}>
              <img src="gofood.png" alt="GoFood" style={{ width: 120 }} />
              <img src="grabfood.png" alt="" style={{ width: 120, marginTop: 1 }} />
            </div>
          </div>
        </center>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h2 style={{ color: "white", fontWeight: "bold", marginRight: 10 }}>Next</h2>
      </footer>
    </div>
  );
}
