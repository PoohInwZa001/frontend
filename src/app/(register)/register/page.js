"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";

const REGISTER_URL =
  "https://6a7e719e3183f5fd884a1755.mockapi.io/api/frontend";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_username: "",
    txt_password: "",
    txt_confirm_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.txt_password !== form.txt_confirm_password) {
      await Swal.fire({
        icon: "warning",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (form.txt_password.length < 6) {
      await Swal.fire({
        icon: "warning",
        title: "รหัสผ่านสั้นเกินไป",
        text: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: form.txt_firstname,
          lastname: form.txt_lastname,
          username: form.txt_username,
          password: form.txt_password,
          action: "register",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          text: "กำลังนำคุณไปหน้าเข้าสู่ระบบ",
          timer: 1500,
          showConfirmButton: false,
        });

        router.push("/login");
        return;
      }

      if (response.status === 409) {
        await Swal.fire({
          icon: "warning",
          title: "Username ถูกใช้งานแล้ว",
          text: result.message || "กรุณาเลือก Username ใหม่",
          confirmButtonText: "ตกลง",
        });
      } else if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: "ข้อมูลไม่ถูกต้อง",
          text: result.message || "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
        });
      } else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์",
          text: result.message || "กรุณาลองใหม่ภายหลัง",
          confirmButtonText: "ตกลง",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "สมัครสมาชิกไม่สำเร็จ",
          text:
            result.message ||
            `เกิดข้อผิดพลาด status: ${response.status}`,
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบอินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-yellow-700"
      style={{
        fontFamily: "var(--font-prompt), sans-serif",
      }}
    >
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" />

      {/* Dragon ซ้าย */}
      <div className="pointer-events-none absolute -left-20 top-10 opacity-20">
        <Image
          src="/dragon2.png"
          alt="dragon"
          width={300}
          height={300}
        />
      </div>

      {/* Dragon ขวา */}
      <div className="pointer-events-none absolute -right-20 bottom-0 opacity-20">
        <Image
          src="/dragon.png"
          alt="dragon"
          width={320}
          height={320}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-green-400/40 bg-green-950/80 shadow-2xl backdrop-blur-md lg:grid-cols-2">

          {/* FORM */}
          <div className="flex items-center justify-center p-8 sm:p-12">
            <div className="w-full max-w-md">

              {/* Header */}
              <div className="mb-7 text-center lg:text-left">
                <h1 className="text-4xl font-bold text-white">
                  สมัครสมาชิก
                </h1>

                <p className="mt-3 text-green-200">
                  สร้างบัญชีเพื่อเข้าสู่อาณาจักร Panda Shop
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleRegister}
                className="space-y-4"
              >

                {/* ชื่อ + นามสกุล */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block font-medium text-green-100">
                      ชื่อ
                    </label>

                    <input
                      type="text"
                      name="txt_firstname"
                      value={form.txt_firstname}
                      onChange={handleChange}
                      required
                      autoComplete="given-name"
                      placeholder="ชื่อ"
                      className="w-full rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none transition placeholder:text-green-300/50 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium text-green-100">
                      นามสกุล
                    </label>

                    <input
                      type="text"
                      name="txt_lastname"
                      value={form.txt_lastname}
                      onChange={handleChange}
                      required
                      autoComplete="family-name"
                      placeholder="นามสกุล"
                      className="w-full rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none transition placeholder:text-green-300/50 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20"
                    />
                  </div>

                </div>

                {/* Username */}
                <div>
                  <label className="mb-2 block font-medium text-green-100">
                    Username
                  </label>

                  <input
                    type="text"
                    name="txt_username"
                    value={form.txt_username}
                    onChange={handleChange}
                    required
                    autoComplete="username"
                    placeholder="กรอก Username"
                    className="w-full rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none transition placeholder:text-green-300/50 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-2 block font-medium text-green-100">
                    Password
                  </label>

                  <input
                    type="password"
                    name="txt_password"
                    value={form.txt_password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="กรอกรหัสผ่าน"
                    className="w-full rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none transition placeholder:text-green-300/50 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20"
                  />

                  <p className="mt-1 text-xs text-green-300">
                    รหัสผ่านอย่างน้อย 6 ตัวอักษร
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-2 block font-medium text-green-100">
                    ยืนยัน Password
                  </label>

                  <input
                    type="password"
                    name="txt_confirm_password"
                    value={form.txt_confirm_password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    placeholder="ยืนยันรหัสผ่าน"
                    className="w-full rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none transition placeholder:text-green-300/50 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 w-full rounded-xl bg-green-500 px-5 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 hover:shadow-green-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading
                    ? "กำลังสมัครสมาชิก..."
                    : "สมัครสมาชิก 🐉"}
                </button>

              </form>

              {/* Login */}
              <div className="mt-7 text-center">
                <p className="text-green-200">
                  มีบัญชีอยู่แล้ว?
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="mt-2 font-bold text-yellow-300 hover:text-yellow-200 hover:underline"
                >
                  เข้าสู่ระบบ
                </button>
              </div>

              {/* Home */}
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="text-sm text-green-300 hover:text-white"
                >
                  ← กลับหน้าหลัก
                </button>
              </div>

            </div>
          </div>

          {/* PANDA */}
          <div className="relative hidden min-h-[650px] items-center justify-center overflow-hidden bg-green-900/50 lg:flex">

            {/* Glow */}
            <div className="absolute h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

            {/* Dragon */}
            <div className="absolute right-4 top-8 opacity-40">
              <Image
                src="/dragon.png"
                alt="dragon"
                width={120}
                height={120}
              />
            </div>

            {/* Panda */}
            <div className="relative z-10">
              <Image
                src="/panda2.png"
                alt="Panda Shop"
                width={520}
                height={520}
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text */}
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <h2 className="text-3xl font-bold text-white">
                🐼 Panda Shop
              </h2>

              <p className="mt-2 text-green-200">
                สมัครวันนี้ แล้วออกผจญภัยไปกับเรา
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}