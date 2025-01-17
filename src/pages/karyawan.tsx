import React, { useState } from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import localFont from "next/font/local";

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

export default function Karyawan() {
  const now = new Date();

  const transactions = [
    {
      id: "T000001",
      name: "Andi",
      time: new Date(now.getTime() - 5 * 60 * 1000),
      items: "Mie Ayam Biasa x 2",
      total: 20000,
      paymentMethod: "QRIS",
    },
    {
      id: "T000002",
      name: "Budi",
      time: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      items: "Mie Ayam Bakso x 1",
      total: 15000,
      paymentMethod: "Tunai",
    },
    {
      id: "T000003",
      name: "Citra",
      time: new Date(now.getTime() - 15 * 60 * 60 * 1000),
      items: "Es Teh x 3",
      total: 15000,
      paymentMethod: "QRIS",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTransactions, setNewTransactions] = useState([
    {
      id: "T000004",
      name: "Dewi",
      time: new Date(now.getTime() - 10 * 60 * 1000),
      items: "Mie Ayam Bakso x 2",
      total: 25000,
      paymentMethod: "QRIS",
      status: "pending",
    },
  ]);

  const getRelativeTime = (transactionTime) => {
    const diffInMs = now.getTime() - transactionTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    } else if (diffInMinutes < 60 * 20) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} jam yang lalu`;
    } else {
      return "Lebih dari 20 jam yang lalu";
    }
  };

  const formatDate = (transactionTime) => {
    const day = transactionTime.getDate().toString().padStart(2, "0");
    const month = (transactionTime.getMonth() + 1).toString().padStart(2, "0");
    const year = transactionTime.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const dailyEarnings = transactions.reduce((sum, transaction) => sum + transaction.total, 0);

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleApproval = (id, approve) => {
    setNewTransactions((prevTransactions) => prevTransactions.map((transaction) => (transaction.id === id ? { ...transaction, status: approve ? "approved" : "rejected" } : transaction)));
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 font-[family-name:var(--font-geist-sans)] relative">
      <header className="fixed top-0 left-0 w-full bg-[#772A2A] text-white p-4 shadow-md z-10 rounded-b-lg">
        <h1 className="text-xl font-[family-name:var(--font-geist-sans)] text-center">Kasir Cabang A</h1>
        <p className="text-sm text-center font-[family-name:var(--font-geist-sans)]">Selamat bekerja! 😊</p>
      </header>

      <div className="h-24"></div>

      <section className="bg-[#CABDBD] rounded-lg w-full p-4 flex items-center gap-4 shadow-md mb-6" style={{ maxWidth: "400px" }}>
        <FaRegMoneyBillAlt size={32} className="text-[#772A2A]" />
        <div>
          <h2 className="text-lg font-[family-name:var(--font-geist-sans)] text-black">Pendapatan Hari Ini</h2>
          <p className="text-2xl font-[family-name:var(--font-geist-sans)] text-[#772A2A]">Rp. {dailyEarnings.toLocaleString()}</p>
        </div>
      </section>

      <section className="w-full" style={{ maxWidth: "400px" }}>
        <h2 className="text-lg font-bold font-[family-name:var(--font-geist-sans)] text-[#772A2A] mb-2">Transaksi Baru (Menunggu Persetujuan)</h2>
        <div className="bg-[#CABDBD] rounded-lg p-4 shadow-lg">
          {newTransactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center py-2 border-b last:border-b-0 cursor-pointer" onClick={() => openModal(transaction)}>
              <div>
                <p className="text-sm font-[family-name:var(--font-geist-sans)] font-bold text-black">Pelanggan: {transaction.name}</p>
                <p className="text-sm font-[family-name:var(--font-geist-sans)] text-black">{transaction.items}</p>
              </div>
              <div>
                <p className="text-sm font-[family-name:var(--font-geist-sans)] text-[#772A2A]">Rp. {transaction.total.toLocaleString()}</p>
                <div className="flex gap-4 mt-2">
                  <MdCheckCircle size={24} className="text-green-500 cursor-pointer" onClick={() => handleApproval(transaction.id, true)} />
                  <MdCancel size={24} className="text-red-500 cursor-pointer " onClick={() => handleApproval(transaction.id, false)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full" style={{ maxWidth: "400px" }}>
        <h2 className="text-lg font-[family-name:var(--font-geist-sans)] font-bold text-[#772A2A] mb-2">Riwayat Pembelian</h2>
        <div className="bg-[#CABDBD] rounded-lg p-4 shadow-lg">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center py-2 border-b last:border-b-0 cursor-pointer" onClick={() => openModal(transaction)}>
              <div>
                <p className="text-sm font-bold text-black">Pelanggan: {transaction.name}</p>
                <p className="text-sm text-black">{transaction.items}</p>
                <p className="text-xs text-gray-600">{getRelativeTime(transaction.time)}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#772A2A]">Rp. {transaction.total.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20" onClick={handleOutsideClick}>
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg grid place-items-center" onClick={(e) => e.stopPropagation()}>
            <img src="mieayam.png" alt="Logo Mie Ayam" className="w-32 mb-4" />
            <h2 className="text-xl font-bold text-[#772A2A] mb-4">Detail Transaksi</h2>
            <div className="grid grid-cols-2 gap-2 w-full">
              <p className="text-sm text-black">
                <strong>ID Transaksi:</strong>
              </p>
              <p className="text-sm text-black">{selectedTransaction.id}</p>
              <p className="text-sm text-black">
                <strong>Pelanggan:</strong>
              </p>
              <p className="text-sm text-black">{selectedTransaction.name}</p>
              <p className="text-sm text-black">
                <strong>Tanggal Pembelian:</strong>
              </p>
              <p className="text-sm text-black">{formatDate(selectedTransaction.time)}</p>
              <p className="text-sm text-black">
                <strong>Waktu:</strong>
              </p>
              <p className="text-sm text-black">{getRelativeTime(selectedTransaction.time)}</p>
              <p className="text-sm text-black">
                <strong>Items:</strong>
              </p>
              <p className="text-sm text-black">{selectedTransaction.items}</p>
              <p className="text-sm text-black">
                <strong>Jenis Pembayaran:</strong>
              </p>
              <p className="text-sm text-black">{selectedTransaction.paymentMethod}</p>
              <p className="text-sm text-[#772A2A] font-bold">
                <strong>Total:</strong>
              </p>
              <p className="text-sm text-[#772A2A] font-bold">Rp. {selectedTransaction.total.toLocaleString()}</p>
            </div>
            <div className="flex justify-between gap-4 mt-4">
              {selectedTransaction.status === "pending" ? (
                <>
                  <button onClick={() => handleApproval(selectedTransaction.id, true)} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                    Setujui
                  </button>
                  <button onClick={() => handleApproval(selectedTransaction.id, false)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                    Batalkan
                  </button>
                </>
              ) : (
                <button onClick={closeModal} className="px-4 py-2 bg-[#772A2A] text-white rounded-lg">
                  Tutup
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      

      <footer className="mt-auto w-full text-center p-4 bg-[#772A2A] text-white rounded-t-lg shadow-lg">
        <IoReceiptOutline size={24} className="mx-auto mb-2" />
        <p className="text-sm font-bold">Powered by Mie Ayam Dashboard</p>
      </footer>
    </div>
  );
}
