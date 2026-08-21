"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// ตรวจสอบ path นี้กับเอกสาร API อีกครั้ง
// รูปแบบที่พบบ่อยคือ /users/login หรือ /login หรือ /auth/login
const LOGIN_URL = "https://api.itdev.cmtc.ac.th/auth/login";

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

    try {
      setIsLoading(true);

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.txt_username,
          password: form.txt_password,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        // เก็บ token ไว้ใช้ตอนเรียก API หน้าอื่น
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        // เก็บข้อมูลผู้ใช้ไว้แสดงชื่อบนหน้าจอ (ถ้า API ส่งกลับมา)
        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }

        await Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          timer: 1200,
          showConfirmButton: false,
        });

        router.push("/users");
        return;
      }

      // 401 = ยืนยันตัวตนไม่ผ่าน แยกข้อความให้ชัด ผู้ใช้จะได้รู้ว่าต้องแก้อะไร
      if (response.status === 401) {
        await Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: result.message || "Username หรือรหัสผ่านไม่ถูกต้อง",
          confirmButtonText: "ตกลง",
        });
      } else if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text: result.message || "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fecc00",
        });
      } else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: `เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ (status: ${response.status})`,
          text: result.message || "กรุณาลองใหม่ภายหลัง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fe0505",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: `เข้าสู่ระบบไม่สำเร็จ (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาด",
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      // เข้าที่นี่เฉพาะตอนยิง request ไม่ถึง server เลย
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border">
        {/* Header */}
        <div className="border-b px-6 py-5 text-center">
          <h1 className="text-2xl font-bold text-gray-800">เข้าสู่ระบบ</h1>
          <p className="text-sm text-gray-500 mt-1">
            กรุณากรอก Username และรหัสผ่านของคุณ
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div>
            <label className="block text-black mb-1">Username</label>
            <input
              type="text"
              name="txt_username"
              value={form.txt_username}
              onChange={handleChange}
              autoComplete="username"
              className="w-full border text-black border-black rounded-md px-4 py-2"
              placeholder="username"
            />
          </div>

          <div>
            <label className="block text-black mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                name="txt_password"
                value={form.txt_password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full border text-black border-black rounded-md px-4 py-2 pr-16"
                placeholder="password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline"
              >
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>

          <p className="text-center text-sm text-gray-600 pt-2">
            ยังไม่มีบัญชี?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-blue-600 hover:underline"
            >
              สมัครสมาชิก
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}