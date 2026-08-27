"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";

// MockAPI
const LOGIN_URL =
  "https://6a7e719e3183f5fd884a1755.mockapi.io/api/frontend";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    txt_username: "",
    txt_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.txt_username || !form.txt_password) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    try {
      setIsLoading(true);

      // =====================================
      // 1. ค้นหา Username ใน MockAPI
      // =====================================
      const response = await fetch(
        `${LOGIN_URL}?username=${encodeURIComponent(
          form.txt_username
        )}`
      );

      // =====================================
      // 2. ตรวจ Server Error
      // =====================================
      if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์",
          text: `Server Error (status: ${response.status})`,
          confirmButtonText: "ตกลง",
        });
        return;
      }

      // =====================================
      // 3. ตรวจ 404
      // =====================================
      if (response.status === 404) {
        await Swal.fire({
          icon: "error",
          title: "ไม่พบข้อมูล",
          text: "ไม่พบ Username นี้ในระบบ",
          confirmButtonText: "ตกลง",
        });
        return;
      }

      // =====================================
      // 4. Error อื่น ๆ
      // =====================================
      if (!response.ok) {
        await Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: `เกิดข้อผิดพลาด status: ${response.status}`,
          confirmButtonText: "ตกลง",
        });
        return;
      }

      // =====================================
      // 5. อ่านข้อมูล User
      // =====================================
      const users = await response.json().catch(() => []);

      // =====================================
      // 6. ไม่พบ Username
      // =====================================
      if (users.length === 0) {
        await Swal.fire({
          icon: "error",
          title: "ไม่พบ Username",
          text: "ไม่มี Username นี้ในระบบ",
          confirmButtonText: "ตกลง",
        });
        return;
      }

      // =====================================
      // 7. ตรวจ Username + Password
      // =====================================
      const user = users.find(
        (item) =>
          item.username === form.txt_username &&
          item.password === form.txt_password
      );

      // =====================================
      // 8. Login ไม่สำเร็จ
      // =====================================
      if (!user) {
        await Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: "Username หรือรหัสผ่านไม่ถูกต้อง",
          confirmButtonText: "ตกลง",
        });
        return;
      }

      // =====================================
      // 9. Login สำเร็จ
      // =====================================
      const loginRecord = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.txt_username,
          password: form.txt_password,
          action: "login",
        }),
      });

      // =====================================
      // 10. POST Login สำเร็จ
      // =====================================
      if (loginRecord.status === 201) {
        console.log("บันทึก Login สำเร็จ");

        localStorage.setItem("user", JSON.stringify(user));

        await Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: "บันทึก action: login แล้ว",
          timer: 1200,
          showConfirmButton: false,
        });

        router.push("/users");
        return;
      }

      // =====================================
      // 11. POST Login เจอ 500
      // =====================================
      if (loginRecord.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์",
          text: `Server Error (status: ${loginRecord.status})`,
          confirmButtonText: "ตกลง",
        });
        return;
      }

      // =====================================
      // 12. POST Login Error
      // =====================================
      await Swal.fire({
        icon: "error",
        title: "บันทึก Login ไม่สำเร็จ",
        text: `เกิดข้อผิดพลาด status: ${loginRecord.status}`,
        confirmButtonText: "ตกลง",
      });
    } catch (error) {
      // =====================================
      // 13. ไม่มี Internet
      // =====================================
      console.error("Login Error:", error);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-yellow-700">

      {/* =========================
          BACKGROUND OVERLAY
      ========================== */}
      <div className="absolute inset-0 bg-black/40" />

      {/* =========================
          DRAGON DECORATION
      ========================== */}

      {/* มังกรซ้ายบน */}
      <div className="absolute -left-16 top-10 opacity-20 pointer-events-none">
        <Image
          src="/dragon2.png"
          alt="dragon"
          width={280}
          height={280}
        />
      </div>

      {/* มังกรขวาล่าง */}
      <div className="absolute -right-16 bottom-0 opacity-20 pointer-events-none">
        <Image
          src="/dragon.png"
          alt="dragon"
          width={300}
          height={300}
        />
      </div>

      {/* =========================
          LOGIN CONTENT
      ========================== */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-green-400/40 bg-green-950/80 shadow-2xl backdrop-blur-md lg:grid-cols-2">

          {/* =========================
              LEFT : PANDA
          ========================== */}
          <div className="relative hidden min-h-[600px] items-center justify-center overflow-hidden bg-green-900/50 lg:flex">

            {/* Glow */}
            <div className="absolute h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />

            {/* Panda */}
            <div className="relative z-10">
              <Image
                src="/แม่แพนด้า.png"
                alt="Panda Shop"
                width={500}
                height={500}
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>

          </div>

          {/* =========================
              RIGHT : LOGIN FORM
          ========================== */}
          <div className="flex items-center justify-center p-8 sm:p-12">

            <div className="w-full max-w-md">

              {/* Header */}
              <div className="mb-8 text-center lg:text-left">

                <div className="mb-4 text-5xl lg:hidden">
                  🐼
                </div>

                <h1 className="text-4xl font-bold text-white">
                  เข้าสู่ระบบ
                </h1>

                <p className="mt-3 text-green-200">
                  ยินดีต้อนรับกลับสู่อาณาจักร Panda Shop
                </p>

              </div>

              {/* Form */}
              <form
                onSubmit={handleLogin}
                className="space-y-6"
              >

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
                    autoComplete="current-password"
                    placeholder="กรอกรหัสผ่าน"
                    className="w-full rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none transition placeholder:text-green-300/50 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20"
                  />

                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-green-500 px-5 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-400 hover:shadow-green-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading
                    ? "กำลังเข้าสู่ระบบ..."
                    : "เข้าสู่ระบบ 🐉"}
                </button>

              </form>

              {/* Register */}
              <div className="mt-8 text-center">

                <p className="text-green-200">
                  ยังไม่มีบัญชี?
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="mt-2 font-bold text-yellow-300 transition hover:text-yellow-200 hover:underline"
                >
                  สมัครสมาชิก
                </button>

              </div>

              {/* Back Home */}
              <div className="mt-6 text-center">

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="text-sm text-green-300 transition hover:text-white"
                >
                  ← กลับหน้าหลัก
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}