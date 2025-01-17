import React, { useState } from "react";
import localFont from "next/font/local";
import { useRouter } from "next/router";

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

export default function LoginKaryawan() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "password123") {
      router.push("/karyawan");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-center min-h-screen px-4`}
      style={{
        backgroundColor: "#F5E9E9",
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="mb-6 flex justify-center">
          <img
            src="mieayam.png" // Pastikan path ini sesuai dengan tempat Anda menyimpan gambar
            alt="Logo Mie Ayam"
            className="w-24 h-auto"
          />
        </div>

        <h1
          className="text-center text-2xl font-bold mb-6"
          style={{
            color: "#772A2A",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Login Karyawan
        </h1>

        {error && (
          <div
            className="mb-4 text-sm text-center"
            style={{
              color: "#D9534F",
              backgroundColor: "#F8D7DA",
              padding: "8px",
              borderRadius: "5px",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            {error}
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium"
            style={{
              color: "#772A2A",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            style={{
              borderColor: "#CABDBD",
              borderRadius: "8px",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              fontFamily: "var(--font-geist-mono)",
            }}
            placeholder="Masukkan username"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium"
            style={{
              color: "#772A2A",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            style={{
              borderColor: "#CABDBD",
              borderRadius: "8px",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              fontFamily: "var(--font-geist-mono)",
            }}
            placeholder="Masukkan password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 text-white rounded font-semibold hover:opacity-90 transition"
          style={{
            backgroundColor: "#772A2A",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            fontFamily: "var(--font-geist-mono)",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
