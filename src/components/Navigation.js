"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Navigation() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // =========================
  // CHECK LOGIN
  // =========================
  useEffect(() => {
    setIsClient(true);

    const loadUser = () => {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        setUser(null);
        return;
      }

      try {
        const parsedUser = JSON.parse(savedUser);

        console.log("Navigation User:", parsedUser);

        setUser(parsedUser);
      } catch (error) {
        console.error("อ่านข้อมูล User ไม่สำเร็จ:", error);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        setUser(null);
      }
    };

    // โหลด User ตอนเปิดเว็บ
    loadUser();

    // รับ Event หลัง Login
    window.addEventListener("auth-change", loadUser);
    window.addEventListener("loginSuccess", loadUser);

    // รับ Event หลัง Logout
    window.addEventListener("logoutSuccess", loadUser);

    return () => {
      window.removeEventListener("auth-change", loadUser);
      window.removeEventListener("loginSuccess", loadUser);
      window.removeEventListener("logoutSuccess", loadUser);
    };
  }, []);

  // =========================
  // MENU
  // =========================
  const menuItems = [
    {
      name: "หน้าแรก",
      href: "/",
    },
    {
      name: "เกี่ยวกับเรา",
      href: "/about",
    },
    {
      name: "สินค้า",
      href: "/service",
    },
    {
      name: "ติดต่อ",
      href: "/contact",
    },
  ];

  // =========================
  // LOGIN
  // =========================
  const goLogin = () => {
    setIsOpen(false);
    router.push("/login");
  };

  // =========================
  // REGISTER
  // =========================
  const goRegister = () => {
    setIsOpen(false);
    router.push("/register");
  };

  // =========================
  // ACCOUNT
  // =========================
  const goAccount = () => {
    setIsOpen(false);
    router.push("/users");
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "ต้องการออกจากระบบ?",
      text: "คุณต้องการออกจากบัญชีใช่หรือไม่",
      showCancelButton: true,
      confirmButtonText: "ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    // ลบข้อมูล Login
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    // เปลี่ยน UI ทันที
    setUser(null);

    // แจ้ง Component อื่น
    window.dispatchEvent(new Event("logoutSuccess"));

    setIsOpen(false);

    await Swal.fire({
      icon: "success",
      title: "ออกจากระบบแล้ว",
      timer: 1000,
      showConfirmButton: false,
    });

    router.push("/");
  };

  // =========================
  // USER NAME
  // =========================
  const getUserName = () => {
    if (!user) {
      return "ผู้ใช้";
    }

    if (user.firstname) {
      return `${user.firstname} ${user.lastname || ""}`.trim();
    }

    return user.username || "ผู้ใช้";
  };

  // =========================
  // USER AVATAR
  // =========================
  const getAvatar = () => {
    if (!user) {
      return "P";
    }

    if (user.firstname) {
      return user.firstname.charAt(0).toUpperCase();
    }

    if (user.username) {
      return user.username.charAt(0).toUpperCase();
    }

    return "P";
  };

  // =========================
  // UI
  // =========================
  return (
    <nav className="sticky top-0 z-50 border-b border-green-900 shadow-xl">
      {/* =========================
          BACKGROUND
      ========================= */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background1.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* =========================
          CONTENT
      ========================= */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex h-24 items-center justify-between">

          {/* =========================
              LOGO
          ========================= */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-20 w-20">
              <Image
                src="/logo1.png"
                alt="Panda Shop Logo"
                fill
                priority
                className="object-contain drop-shadow-lg"
              />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-white">
                Panda Shop
              </h1>

              <p className="text-sm text-green-200">
                Dragon Warrior City
              </p>
            </div>
          </Link>

          {/* =========================
              DESKTOP MENU
          ========================= */}
          <div className="hidden items-center gap-7 md:flex">

            {/* MENU */}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative font-medium text-white transition-all duration-300 hover:text-yellow-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}

            {/* =========================
                LOGIN / ACCOUNT
            ========================= */}
            {!isClient ? (
              <div className="h-11 w-32 rounded-full bg-white/10" />
            ) : user ? (
              <div className="flex items-center gap-2">

                {/* ACCOUNT */}
                <button
                  type="button"
                  onClick={goAccount}
                  className="group flex items-center gap-3 rounded-full border border-green-400/50 bg-green-950/90 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:border-yellow-400 hover:bg-green-900"
                >
                  {/* Avatar */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-yellow-400 font-bold text-green-950 shadow">
                    {getAvatar()}
                  </div>

                  {/* Name */}
                  <div className="text-left">
                    <p className="text-xs text-green-300">
                      บัญชีของฉัน
                    </p>

                    <p className="max-w-[150px] truncate text-sm font-semibold text-white">
                      {getUserName()}
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4 transition group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>

                {/* LOGOUT */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-red-600/90 px-4 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-red-500"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">

                {/* LOGIN */}
                <button
                  type="button"
                  onClick={goLogin}
                  className="rounded-full border border-green-400/50 bg-green-950/80 px-5 py-2.5 text-sm font-semibold text-white shadow transition-all duration-300 hover:border-yellow-400 hover:bg-green-800 hover:text-yellow-300"
                >
                  เข้าสู่ระบบ
                </button>

                {/* REGISTER */}
                <button
                  type="button"
                  onClick={goRegister}
                  className="rounded-full bg-gradient-to-r from-green-600 to-yellow-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-500 hover:to-yellow-400"
                >
                  สมัครสมาชิก
                </button>
              </div>
            )}
          </div>

          {/* =========================
              MOBILE BUTTON
          ========================= */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="เปิดเมนู"
          >
            <div className="space-y-1.5">

              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isOpen
                    ? "translate-y-2 rotate-45"
                    : ""
                }`}
              />

              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isOpen
                    ? "opacity-0"
                    : ""
                }`}
              />

              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isOpen
                    ? "-translate-y-2 -rotate-45"
                    : ""
                }`}
              />

            </div>
          </button>
        </div>

        {/* =========================
            MOBILE MENU
        ========================= */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isOpen
              ? "max-h-[700px] opacity-100 py-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2">

            {/* MENU */}
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-white transition hover:bg-white/10 hover:text-yellow-300"
              >
                {item.name}
              </Link>
            ))}

            {/* =========================
                MOBILE ACCOUNT
            ========================= */}
            {!isClient ? null : user ? (
              <div className="mt-2 border-t border-green-700/50 pt-4">

                {/* ACCOUNT */}
                <button
                  type="button"
                  onClick={goAccount}
                  className="flex w-full items-center gap-3 rounded-xl border border-green-500/30 bg-green-950/80 p-4 text-left text-white transition hover:bg-green-900"
                >
                  {/* Avatar */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-yellow-400 font-bold text-green-950">
                    {getAvatar()}
                  </div>

                  {/* User */}
                  <div className="min-w-0">
                    <p className="text-xs text-green-300">
                      บัญชีของฉัน
                    </p>

                    <p className="truncate font-semibold">
                      {getUserName()}
                    </p>

                    {user.username && (
                      <p className="truncate text-xs text-green-400">
                        @{user.username}
                      </p>
                    )}
                  </div>
                </button>

                {/* LOGOUT */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-500"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-2 border-t border-green-700/50 pt-4">

                {/* LOGIN */}
                <button
                  type="button"
                  onClick={goLogin}
                  className="rounded-xl border border-green-400/50 bg-green-950/70 px-4 py-3 font-semibold text-white transition hover:bg-green-800"
                >
                  เข้าสู่ระบบ
                </button>

                {/* REGISTER */}
                <button
                  type="button"
                  onClick={goRegister}
                  className="rounded-xl bg-gradient-to-r from-green-600 to-yellow-500 px-4 py-3 font-semibold text-white transition hover:from-green-500 hover:to-yellow-400"
                >
                  สมัครสมาชิก
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}