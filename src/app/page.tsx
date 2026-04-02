"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const GROUP_MEMBERS = [
  "jonathanhans.2205@gmail.com",
  "jefftirza@gmail.com",
  "[EMAIL_ADDRESS]"
];

const membersData = [
  { id: 1, name: "Jonathan Hans Emanuelle", npm: "2406414025", image: "/images/jo.jpeg" },
  { id: 2, name: "Bryan Christopher Kurniadi", npm: "2406346011", image: "/images/bck.jpeg" },
  { id: 3, name: "Rusydan Mujtaba Ibnu R.", npm: "2406421081", image: "/images/rusydan.jpeg" },
  { id: 4, name: "Jefferson Tirza Liman", npm: "2406435963", image: "/images/jepp.jpeg" },
  { id: 5, name: "Jessevan Gerard Vito Uisan", npm: "2406495496", image: "/images/jess.jpeg" }
];

const THEMES = {
  terang: {
    bg: "bg-gradient-to-br from-slate-50 to-slate-200",
    text: "text-slate-800",
    font: "font-sans",
    cardBg: "bg-white/70 backdrop-blur-lg",
    borderColor: "border-white/50",
    accent: "from-blue-600 to-indigo-600",
    hoverText: "group-hover:text-blue-600",
    buttonBg: "bg-blue-600 hover:bg-blue-700 text-white",
    shadow: "shadow-xl shadow-slate-200/50"
  },
  gelap: {
    bg: "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900",
    text: "text-slate-100",
    font: "font-mono",
    cardBg: "bg-slate-800/60 backdrop-blur-lg",
    borderColor: "border-slate-700/50",
    accent: "from-emerald-400 to-cyan-500",
    hoverText: "group-hover:text-emerald-400",
    buttonBg: "bg-emerald-500 hover:bg-emerald-600 text-white",
    shadow: "shadow-xl shadow-black/50"
  },
  biru: {
    bg: "bg-gradient-to-br from-blue-100 via-sky-100 to-blue-50",
    text: "text-sky-950",
    font: "font-serif",
    cardBg: "bg-white/50 backdrop-blur-lg",
    borderColor: "border-white/50",
    accent: "from-sky-500 to-blue-600",
    hoverText: "group-hover:text-blue-600",
    buttonBg: "bg-sky-600 hover:bg-sky-700 text-white",
    shadow: "shadow-xl shadow-blue-200/50"
  }
};

const getInitials = (name: string) => {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
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
    <main className={`min-h-screen transition-all duration-700 ease-in-out ${theme.bg} ${theme.text} ${theme.font}`}>

      {/* Header / Navbar */}
      <nav className={`px-8 py-4 mb-8 border-b ${theme.borderColor} bg-opacity-30 backdrop-blur-md sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${theme.accent}`}>
            Keamanan Perangkat Lunak
          </h1>
          <div>
            {status === "authenticated" ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold">{session.user?.name}</span>
                  <span className="text-xs opacity-75">{session.user?.email}</span>
                </div>
                <img
                  src={session.user?.image || ""}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-current p-0.5"
                />
                <button
                  onClick={() => signOut()}
                  className="ml-4 px-5 py-2 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className={`px-6 py-2 font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg ${theme.buttonBg}`}
              >
                Login via Google
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 pb-16 space-y-12">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Tugas 2 Kelompok
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Implementasi Authentication dan Authorization menggunakan standar OAuth Google.
          </p>
        </div>

        {/* Control Panel Section */}
        {status === "authenticated" && (
          <div className={`p-6 rounded-3xl border ${theme.cardBg} ${theme.borderColor} ${theme.shadow} transition-all duration-500`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Panel Tampilan</h2>
                {isAuthorizedMember ? (
                  <p className="text-emerald-500 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Akses Penuh: Anda adalah anggota tim.
                  </p>
                ) : (
                  <p className="text-red-500 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Akses Dibatasi: Hanya anggota tim yang dapat mengubah tema.
                  </p>
                )}
              </div>

              <div className="flex gap-3 bg-black/5 p-1.5 rounded-2xl">
                <button
                  onClick={() => handleThemeChange("terang")}
                  className="px-6 py-2.5 rounded-xl bg-white text-slate-800 font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Terang
                </button>
                <button
                  onClick={() => handleThemeChange("gelap")}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Gelap
                </button>
                <button
                  onClick={() => handleThemeChange("biru")}
                  className="px-6 py-2.5 rounded-xl bg-blue-100 text-blue-900 font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Biru
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Biodata Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold">Biodata Anggota</h2>
            <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${theme.accent} opacity-20`}></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {membersData.map((member) => (
              <div
                key={member.id}
                className={`group p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-default ${theme.cardBg} ${theme.borderColor} hover:${theme.shadow}`}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">

                  {/* Kotak Inisial / Tempat Foto */}
                  <div className={`w-24 h-24 shrink-0 rounded-2xl flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br ${theme.accent} shadow-inner overflow-hidden`}>
                    {<img src={member.image} alt={member.name} className="w-full h-full object-cover" />}

                    {/* Panduan: Jika ingin menggunakan foto, hapus getInitials di atas lalu gunakan tag img di bawah ini */}
                    {/* <img src="/path/ke/foto.jpg" alt={member.name} className="w-full h-full object-cover" /> */}
                  </div>

                  <div className="flex-1 mt-2 sm:mt-0">
                    <p className="text-sm font-semibold opacity-60 uppercase tracking-wider mb-1">Anggota {member.id}</p>
                    <h3 className={`text-xl font-bold leading-tight mb-2 transition-colors duration-300 ${theme.hoverText}`}>
                      {member.name}
                    </h3>
                    <div className="inline-block px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 font-mono text-sm font-medium">
                      NPM: {member.npm}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}