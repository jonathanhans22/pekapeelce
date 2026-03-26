"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const GROUP_MEMBERS = [
  "jonathanhans.2205@gmail.com",
  "email.anggota.lain@ui.ac.id"
];

const membersData = [
  { id: 1, name: "Jonathan Hans Emanuelle", npm: "2406414025" },
  { id: 2, name: "Bryan Christopher Kurniadi ", npm: "2406346011" },
  { id: 3, name: "Rusydan Mujtaba Ibnu R.", npm: "2406421081" },
  { id: 4, name: "Jefferson Tirza Liman", npm: "2406435963" },
  { id: 5, name: "Jessevan Gerard Vito Uisan", npm: "2406495496" }
];

const THEMES = {
  terang: {
    bg: "bg-white",
    text: "text-gray-900",
    font: "font-sans",
    cardBg: "bg-gray-50",
    borderColor: "border-gray-300"
  },
  gelap: {
    bg: "bg-gray-900",
    text: "text-white",
    font: "font-mono",
    cardBg: "bg-gray-800",
    borderColor: "border-gray-700"
  },
  biru: {
    bg: "bg-blue-50",
    text: "text-blue-900",
    font: "font-serif",
    cardBg: "bg-blue-100",
    borderColor: "border-blue-300"
  }
};

export default function Home() {
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState(THEMES.terang);

  const isAuthorizedMember = session?.user?.email && GROUP_MEMBERS.includes(session.user.email);

  const handleThemeChange = (selectedTheme: keyof typeof THEMES) => {
    if (isAuthorizedMember) {
      setTheme(THEMES[selectedTheme]);
    } else {
      alert("Otorisasi ditolak: Anda bukan anggota kelompok.");
    }
  };

  return (
    <main className={`min-h-screen p-8 transition-colors duration-300 ${theme.bg} ${theme.text} ${theme.font}`}>
      <div className="max-w-4xl mx-auto space-y-8">

        <div className={`flex justify-between items-center border-b pb-4 ${theme.borderColor}`}>
          <h1 className="text-3xl font-bold">Tugas 2 Kelompok</h1>
          <div>
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <span>Halo, {session.user?.name}</span>
                <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => signIn("google")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Login via Google
              </button>
            )}
          </div>
        </div>

        {status === "authenticated" && (
          <div className={`p-4 rounded border shadow-sm ${theme.cardBg} ${theme.borderColor}`}>
            <h2 className="text-xl font-semibold mb-2">Panel Kontrol Tampilan</h2>
            {isAuthorizedMember ? (
              <div className="space-y-4">
                <p className="text-green-600 font-medium">Akses Diberikan: Anda adalah anggota kelompok.</p>
                <div className="flex gap-2">
                  <button onClick={() => handleThemeChange("terang")} className="px-3 py-1 border rounded bg-white text-gray-900 border-gray-300 hover:bg-gray-100">Terang</button>
                  <button onClick={() => handleThemeChange("gelap")} className="px-3 py-1 border rounded bg-gray-900 text-white border-gray-700 hover:bg-gray-800">Gelap</button>
                  <button onClick={() => handleThemeChange("biru")} className="px-3 py-1 border rounded bg-blue-100 text-blue-900 border-blue-300 hover:bg-blue-200">Biru</button>
                </div>
              </div>
            ) : (
              <p className="text-red-500">Akses Ditolak: Anda dapat melihat website, tetapi tidak berhak mengubah tampilan.</p>
            )}
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Biodata Kelompok</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {membersData.map((member) => (
              <div key={member.id} className={`p-4 border rounded shadow-sm transition-colors duration-300 ${theme.cardBg} ${theme.borderColor}`}>
                <h3 className="text-lg font-semibold mb-2">Anggota {member.id}</h3>
                <div className="space-y-1">
                  <p><span className="font-medium">Nama:</span> {member.name}</p>
                  <p><span className="font-medium">NPM:</span> {member.npm}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}