import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Queue() {
  const router = useRouter();

  const { transactionId = "", customer = "", purchaseDate = "", items = "", totalAmount = 0, paymentMethod = "" } = router.query;

  const [transactionStatus, setTransactionStatus] = useState({
    text: "Silahkan lanjut pembayaranmu di kasir",
    type: "pending",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTransactionStatus({
        text: "Pesananmu sedang dibuat, tunggu sebentar ya",
        type: "success",
      });
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const formatCurrency = (amount) => `Rp. ${Number(amount).toLocaleString()}`;

  const handleClose = () => router.push("/");

  const renderStatusIcon = () => (
    <div className={`flex items-center gap-2 ${transactionStatus.type === "pending" ? "text-yellow-600" : "text-green-600"}`}>
      <span>{transactionStatus.type === "pending" ? "⏳" : "✔️"}</span>
      <span>{transactionStatus.text}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Image src="/mieayam.png" alt="Logo Mie Ayam" width={50} height={50} />
          <h2 className="text-xl font-bold text-[#772A2A] text-center mt-4">Detail Transaksi</h2>
        </div>

        {/* Transaction Details */}
        <div className="mb-6">
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-black">ID Transaksi:</span>
            <span className="text-sm text-[#772A2A]">{transactionId}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-black">Pelanggan:</span>
            <span className="text-sm text-[#772A2A]">{customer}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-black">Tanggal Pembelian:</span>
            <span className="text-sm text-[#772A2A]">{purchaseDate}</span>
          </div>
          <div className="py-2 border-b">
            <span className="text-sm text-black">Items:</span>
            <div>
              {items.split(", ").map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-sm text-black">•</span>
                  <span className="text-sm text-[#772A2A]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-black">Metode Pembayaran:</span>
            <span className="text-sm text-[#772A2A]">{paymentMethod}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-black">Total:</span>
            <span className="text-sm text-[#772A2A]">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {/* Status Display */}
        <div className="flex flex-col items-center mb-6">{renderStatusIcon()}</div>

        {/* Close Button */}
        <div className="flex justify-center mt-4">
          <button onClick={handleClose} className="px-6 py-2 bg-[#772A2A] text-white rounded-lg">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
