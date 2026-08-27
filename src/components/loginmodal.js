"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

const API_URL =
  "https://6a7e719e3183f5fd884a1755.mockapi.io/api/frontend";

export default function LoginModal({ isOpen, onClose }) {
  const router = useRouter();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // =========================
  // RESET FORM เมื่อเปิด Popup
  // =========================
  useEffect(() => {
    if (isOpen) {
      setIsLoginMode(true);

      setForm({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isOpen]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {
    if (!form.username || !form.password) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูล",
        text: "กรุณากรอก Username และ Password",
        confirmButtonText: "ตกลง",
      });

      return;
    }

    try {
      setIsLoading(true);

      console.log("========== LOGIN ==========");
      console.log("กำลังค้นหาบัญชี...");
      console.log("Username:", form.username);
      console.log("API:", API_URL);

      // =====================================
      // GET ข้อมูลจาก MockAPI
      // ไม่ใช้ POST เพราะ Login ไม่ควรสร้าง User ใหม่
      // =====================================
      const response = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
      });

      console.log("GET Status:", response.status);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const users = await response.json();

      console.log("ข้อมูลทั้งหมดจาก API:", users);

      // =====================================
      // ค้นหา Username + Password
      // =====================================
      const user = users.find(
        (item) =>
          String(item.username).trim() ===
            String(form.username).trim() &&
          String(item.password) === String(form.password)
      );

      // =====================================
      // ไม่พบข้อมูล
      // =====================================
      if (!user) {
        await Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: "Username หรือ Password ไม่ถูกต้อง",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      console.log("พบ User:", user);

      // =====================================
      // เก็บ USER ตัวจริงจาก API
      // =====================================
      localStorage.setItem("user", JSON.stringify(user));

      localStorage.setItem(
        "username",
        user.username
      );

      // =====================================
      // แจ้ง Login สำเร็จ
      // =====================================
      await Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        text: `ยินดีต้อนรับ ${user.firstname || user.username}`,
        timer: 1200,
        showConfirmButton: false,
      });

      // =====================================
      // ปิด Popup
      // =====================================
      onClose();

      // =====================================
      // ไปหน้า Users
      // =====================================
      router.push("/users");
    } catch (error) {
      console.error("Login Error:", error);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับ API",
        text: "กรุณาตรวจสอบอินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async () => {
    // ตรวจสอบข้อมูล
    if (
      !form.firstname ||
      !form.lastname ||
      !form.username ||
      !form.password ||
      !form.confirmPassword
    ) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "กรุณากรอกข้อมูลทุกช่อง",
        confirmButtonText: "ตกลง",
      });

      return;
    }

    // ตรวจสอบ Password
    if (form.password.length < 6) {
      await Swal.fire({
        icon: "warning",
        title: "รหัสผ่านสั้นเกินไป",
        text: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        confirmButtonText: "ตกลง",
      });

      return;
    }

    // ตรวจสอบ Password ตรงกัน
    if (form.password !== form.confirmPassword) {
      await Swal.fire({
        icon: "warning",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน",
        confirmButtonText: "ตกลง",
      });

      return;
    }

    try {
      setIsLoading(true);

      console.log("========== REGISTER ==========");
      console.log("กำลังสมัครสมาชิก...");
      console.log("API:", API_URL);

      // =====================================
      // POST สร้าง User ใหม่ใน MockAPI
      // =====================================
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          username: form.username,
          password: form.password,
          action: "register",
        }),
      });

      const result = await response.json().catch(() => ({}));

      console.log("Register Status:", response.status);
      console.log("Register Result:", result);

      // =====================================
      // สมัครสำเร็จ
      // =====================================
      if (response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          text: "ข้อมูลถูกบันทึกลง API แล้ว กรุณาเข้าสู่ระบบ",
          timer: 1500,
          showConfirmButton: false,
        });

        // =====================================
        // เปลี่ยนกลับเป็น Login
        // =====================================
        setIsLoginMode(true);

        // เอา Username ที่เพิ่งสมัครไว้
        setForm({
          firstname: "",
          lastname: "",
          username: form.username,
          password: "",
          confirmPassword: "",
        });

        return;
      }

      // =====================================
      // 409 Username ซ้ำ
      // =====================================
      if (response.status === 409) {
        await Swal.fire({
          icon: "warning",
          title: "Username ถูกใช้งานแล้ว",
          text:
            result.message ||
            "กรุณาเลือก Username ใหม่",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // =====================================
      // 400
      // =====================================
      if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: "ข้อมูลไม่ถูกต้อง",
          text:
            result.message ||
            "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // =====================================
      // 500+
      // =====================================
      if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: "เซิร์ฟเวอร์มีปัญหา",
          text:
            result.message ||
            "กรุณาลองใหม่ภายหลัง",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // =====================================
      // Error อื่น ๆ
      // =====================================
      await Swal.fire({
        icon: "error",
        title: "สมัครสมาชิกไม่สำเร็จ",
        text:
          result.message ||
          `เกิดข้อผิดพลาด status: ${response.status}`,
        confirmButtonText: "ตกลง",
      });
    } catch (error) {
      console.error("Register Error:", error);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับ API",
        text: "กรุณาตรวจสอบอินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    if (isLoginMode) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };

  // =========================
  // TOGGLE LOGIN / REGISTER
  // =========================
  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);

    setForm({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  // =========================
  // ปิด Popup
  // =========================
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">

      {/* =========================
          POPUP
      ========================== */}
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-green-700/50 shadow-2xl"
        style={{
          backgroundImage: "url('/background1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Content */}
        <div className="relative z-10 p-8">

          {/* =========================
              CLOSE BUTTON
          ========================== */}
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="absolute right-5 top-5 rounded-full p-2 text-green-200 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* =========================
              LOGO
          ========================== */}
          <div className="mb-8 text-center">

            <div className="relative mx-auto mb-4 h-20 w-20">
              <Image
                src="/logo1.png"
                alt="Panda Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <h2 className="text-3xl font-bold text-white">
              {isLoginMode
                ? "ยินดีต้อนรับสู่ Panda Shop"
                : "เข้าร่วมเมืองนักรบมังกร"}
            </h2>

            <p className="mt-2 text-sm text-green-200">
              {isLoginMode
                ? "เข้าสู่ระบบเพื่อสำรวจโลกของหมีแพนด้า"
                : "สมัครสมาชิกเพื่อเริ่มต้นการผจญภัย"}
            </p>

          </div>

          {/* =========================
              FORM
          ========================== */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* =========================
                FIRSTNAME / LASTNAME
            ========================== */}
            {!isLoginMode && (
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="mb-1 block text-sm text-green-100">
                    ชื่อ
                  </label>

                  <input
                    type="text"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="ชื่อ"
                    className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-green-200 focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-green-100">
                    นามสกุล
                  </label>

                  <input
                    type="text"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    placeholder="นามสกุล"
                    className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-green-200 focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
                  />
                </div>

              </div>
            )}

            {/* =========================
                USERNAME
            ========================== */}
            <div>

              <label className="mb-1 block text-sm text-green-100">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="username"
                placeholder="กรอก Username"
                className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-green-200 focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />

            </div>

            {/* =========================
                PASSWORD
            ========================== */}
            <div>

              <div className="mb-1 flex items-center justify-between">

                <label className="text-sm text-green-100">
                  รหัสผ่าน
                </label>

                {isLoginMode && (
                  <Link
                    href="/forgot-password"
                    onClick={onClose}
                    className="text-xs text-yellow-400 hover:text-yellow-300"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                )}

              </div>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                minLength={6}
                autoComplete={
                  isLoginMode
                    ? "current-password"
                    : "new-password"
                }
                placeholder="••••••••"
                className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-green-200 focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
              />

              {!isLoginMode && (
                <p className="mt-1 text-xs text-green-300">
                  รหัสผ่านอย่างน้อย 6 ตัวอักษร
                </p>
              )}

            </div>

            {/* =========================
                CONFIRM PASSWORD
            ========================== */}
            {!isLoginMode && (
              <div>

                <label className="mb-1 block text-sm text-green-100">
                  ยืนยันรหัสผ่าน
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  autoComplete="new-password"
                  placeholder="ยืนยันรหัสผ่าน"
                  className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-green-200 focus:ring-2 focus:ring-yellow-400 disabled:opacity-50"
                />

              </div>
            )}

            {/* =========================
                SUBMIT BUTTON
            ========================== */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-green-700 to-yellow-500 py-3.5 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:from-green-600 hover:to-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading
                ? isLoginMode
                  ? "กำลังเข้าสู่ระบบ..."
                  : "กำลังสมัครสมาชิก..."
                : isLoginMode
                  ? "เข้าสู่ระบบ"
                  : "สมัครสมาชิก"}
            </button>

          </form>

          {/* =========================
              DIVIDER
          ========================== */}
          <div className="my-6 flex items-center">

            <div className="h-px flex-1 bg-green-700/50" />

            <span className="px-4 text-sm text-green-200">
              หรือ
            </span>

            <div className="h-px flex-1 bg-green-700/50" />

          </div>

          {/* =========================
              TOGGLE
          ========================== */}
          <div className="text-center">

            <p className="text-sm text-green-100">

              {isLoginMode
                ? "ยังไม่มีบัญชีใช่ไหม? "
                : "มีบัญชีอยู่แล้วใช่ไหม? "}

              <button
                type="button"
                onClick={toggleMode}
                disabled={isLoading}
                className="font-medium text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
              >
                {isLoginMode
                  ? "สมัครสมาชิกเลย"
                  : "เข้าสู่ระบบ"}
              </button>

            </p>

          </div>

        </div>
      </div>
    </div>
  );
}