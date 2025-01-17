import Image from "next/image";
import localFont from "next/font/local";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Ensure to import useRouter here

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

export default function Order() {
  const [quantities, setQuantities] = useState({
    mieAyamBiasa: 0,
    mieAyamBakso: 0,
    mieAyamPangsit: 0,
    mieAyamBaksoPangsit: 0,
    esTeh: 0,
    airMineral: 0,
  });
  const router = useRouter(); // Declare the router here
  const [showModal, setShowModal] = useState(false); // State for showing the checkout modal
  const [showTransactionDetails, setShowTransactionDetails] = useState(false); // State for showing transaction details modal
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>(""); // State for customer name
  const [transactionData, setTransactionData] = useState<any>({
    transactionId: "T000004",
    customer: "", // Initially empty
    purchaseDate: "20/12/2024",
    items: "Mie Ayam Bakso x 2",
    paymentMethod: "QRIS",
    timeAgo: "19 menit yang lalu",
  });

  const handleCloseModal = () => {
    setShowModal(false); // Tutup modal checkout
    setShowTransactionDetails(false); // Tutup modal transaksi
    router.push({
      pathname: "/queue",
      query: {
        transactionId: transactionData.transactionId,
        customer: transactionData.customer,
        purchaseDate: transactionData.purchaseDate,
        items: transactionData.items,
        totalAmount: transactionData.totalAmount,
        paymentMethod: paymentMethod, // Kirim metode pembayaran yang dipilih
      },
    });
  };

  const increaseQuantity = (item) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: prev[item] + 1,
    }));
  };

  const decreaseQuantity = (item) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: prev[item] > 0 ? prev[item] - 1 : 0,
    }));
  };

  const prices = {
    mieAyamBiasa: 10000,
    mieAyamBakso: 15000,
    mieAyamPangsit: 12000,
    mieAyamBaksoPangsit: 17000,
    esTeh: 5000,
    airMineral: 5000,
  };

  const getTotalPayment = () => {
    return Object.keys(quantities).reduce((total, item) => total + quantities[item] * prices[item], 0);
  };

  const formatCurrency = (amount) => {
    return `Rp. ${amount.toLocaleString()}`;
  };

  useEffect(() => {
    // Generate a list of items and quantities
    const selectedItems = Object.keys(quantities)
      .filter((item) => quantities[item] > 0)
      .map((item) => `${quantities[item]} x ${item.replace(/([A-Z])/g, " $1").toLowerCase()}`)
      .join(", ");

    setTransactionData((prevData) => ({
      ...prevData,
      customer: customerName,
      items: selectedItems || "No items selected",
      totalAmount: getTotalPayment(),
    }));
  }, [quantities, customerName]);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowTransactionDetails(false);
    }
  };

  const [transactionStatus, setTransactionStatus] = useState("Menunggu Konfirmasi");

  return (
    <div className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start mt-10" style={{ maxWidth: "100%" }}>
        <div>
          <img src="/mieayam.png" style={{ width: 100 }} alt="Mie Ayam" />
        </div>

        <div>
          <h2 style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>Menu</h2>
        </div>

        <div>
          <h3 style={{ color: "black" }}>Makanan</h3>

          <div className="flex flex-col gap-8 mt-2">
            {[
              { name: "mieAyamBiasa", label: "Mie Ayam Biasa", price: 10000, image: "mie.jpg" },
              { name: "mieAyamBakso", label: "Mie Ayam Bakso", price: 15000, image: "mie.jpg" },
              { name: "mieAyamPangsit", label: "Mie Ayam Pangsit", price: 12000, image: "mie.jpg" },
              { name: "mieAyamBaksoPangsit", label: "Mie Ayam Bakso Pangsit", price: 17000, image: "mie.jpg" },
            ].map((item) => (
              <div key={item.name} className="flex flex-row" style={{ backgroundColor: "#CABDBD", padding: 15, borderRadius: 10 }}>
                <img src={item.image} style={{ width: 70, height: 65, borderRadius: 10 }} alt={item.label} />
                <div>
                  <div className="flex flex-col ml-4">
                    <h2 style={{ color: "black", fontFamily: "sans-serif", fontWeight: "bold", width: 270, fontSize: 14 }}>{item.label}</h2>
                    <h3 style={{ color: "black" }}>{formatCurrency(item.price)}</h3>
                  </div>
                  <div className="flex flex-row ml-36 mt-2">
                    <IoRemoveCircleOutline onClick={() => decreaseQuantity(item.name)} className="cursor-pointer" />
                    <h3 className="ml-2 -mt-1 mr-2">{quantities[item.name]}</h3>
                    <IoAddCircleOutline onClick={() => increaseQuantity(item.name)} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ color: "black" }}>Minuman</h3>

          <div className="flex flex-col gap-8 mt-2">
            {[
              { name: "esTeh", label: "Es Teh", price: 5000, image: "esteh.png" },
              { name: "airMineral", label: "Air Mineral", price: 5000, image: "airmineral.jpg" },
            ].map((item) => (
              <div key={item.name} className="flex flex-row" style={{ backgroundColor: "#CABDBD", padding: 15, borderRadius: 10 }}>
                <img src={item.image} style={{ width: 70, height: 65, borderRadius: 10 }} alt={item.label} />
                <div>
                  <div className="flex flex-col ml-4">
                    <h2 style={{ color: "black", fontFamily: "sans-serif", fontWeight: "bold", width: 270, fontSize: 14 }}>{item.label}</h2>
                    <h3 style={{ color: "black" }}>{formatCurrency(item.price)}</h3>
                  </div>
                  <div className="flex flex-row ml-36 mt-2">
                    <IoRemoveCircleOutline onClick={() => decreaseQuantity(item.name)} className="cursor-pointer" />
                    <h3 className="ml-2 -mt-1 mr-2">{quantities[item.name]}</h3>
                    <IoAddCircleOutline onClick={() => increaseQuantity(item.name)} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer with Next button */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 20px",
          backgroundColor: "#772A2A",
          borderRadius: "10px 10px 0 0",
          color: "white",
        }}
      >
        <div>
          <h3 style={{ color: "white", fontWeight: "bold" }}>Total: {formatCurrency(getTotalPayment())}</h3>
        </div>

        <div>
          <h2 onClick={() => setShowModal(true)} style={{ color: "white", cursor: "pointer", fontWeight: "bold" }}>
            Lanjut Pembayaran
          </h2>
        </div>
      </footer>

      {/* Modal for Transaction Details */}
      {showTransactionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20" onClick={handleOutsideClick}>
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg grid place-items-center" onClick={(e) => e.stopPropagation()}>
            <img src="mieayam.png" alt="Logo Mie Ayam" className="w-32 mb-4" />
            <h2 className="text-xl font-bold text-[#772A2A] text-center mb-4">Detail Transaksi</h2>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">ID Transaksi:</span>
                <span className="text-sm text-[#772A2A]">{transactionData.transactionId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Pelanggan:</span>
                <span className="text-sm text-[#772A2A]">{transactionData.customer}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Tanggal Pembelian:</span>
                <span className="text-sm text-[#772A2A]">{transactionData.purchaseDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Waktu:</span>
                <span className="text-sm text-[#772A2A]">{transactionData.timeAgo}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Items:</span>
                <div className="flex flex-col gap-2 ml-4">
                  {transactionData.items.split(", ").map((item, index) => (
                    <span key={index} className="text-sm text-[#772A2A] text-right">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Jenis Pembayaran:</span>
                <span className="text-sm text-[#772A2A]">{transactionData.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Total:</span>
                <span className="text-sm text-[#772A2A]">{formatCurrency(transactionData.totalAmount)}</span>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button onClick={handleCloseModal} className="px-6 py-2 bg-[#772A2A] text-white rounded-lg">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Checkout */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-[#772A2A] text-center mb-4">Checkout</h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-sm text-black">
                  <strong>Total Pembayaran:</strong>
                </span>
                <span className="text-sm text-[#772A2A]">{formatCurrency(getTotalPayment())}</span>
              </div>

              <div className="mt-4">
                <label htmlFor="customerName" className="text-sm" style={{ color: "black" }}>
                  Nama Pelanggan
                </label>
                <input id="customerName" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={{ color: "black" }} className="w-full border p-2 mt-2 rounded" placeholder="Masukkan nama" />
              </div>

              <div className="mt-4">
                <label htmlFor="paymentMethod" className="text-sm text-black">
                  Metode Pembayaran
                </label>
                <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ color: "black" }} className="w-full border p-2 mt-2 rounded">
                  <option value="" style={{ color: "black" }}>
                    Pilih Metode Pembayaran
                  </option>
                  <option value="QRIS" style={{ color: "black" }}>
                    QRIS
                  </option>
                  <option value="Tunai" style={{ color: "black" }}>
                    Tunai
                  </option>
                </select>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => {
                    // Check if no items are selected
                    if (getTotalPayment() === 0) {
                      alert("Pilih makanan atau minuman terlebih dahulu!");
                    }
                    // Check if customer name is missing
                    else if (customerName.trim() === "") {
                      alert("Nama harus diisi!");
                    }
                    // Check if payment method is not selected
                    else if (paymentMethod === "") {
                      alert("Pilih metode pembayaran terlebih dahulu!");
                    } else {
                      setTransactionData({
                        ...transactionData,
                        customer: customerName,
                        paymentMethod: paymentMethod,
                        totalAmount: getTotalPayment(),
                      });
                      setShowTransactionDetails(true);
                      setShowModal(false);
                    }
                  }}
                  className="px-6 py-2 bg-[#772A2A] text-white rounded-lg"
                >
                  Konfirmasi Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
