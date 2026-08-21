"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const REGISTER_URL = "https://api.itdev.cmtc.ac.th/users";

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

    // ตรวจสอบรหัสผ่าน
    if (form.txt_password !== form.txt_confirm_password) {
      await Swal.fire({
        icon: "warning",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณากรอกรหัสผ่านและยืนยันรหัสผ่านให้ตรงกัน",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    // ตรวจสอบความยาวรหัสผ่าน
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
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          text: "กำลังนำคุณไปหน้าเข้าสู่ระบบ",
          timer: 1500,
          showConfirmButton: false,
        });

        // ไปหน้า Login
        router.push("/login");

        return;
      }

      // Username ซ้ำ
      if (response.status === 409) {
        await Swal.fire({
          icon: "warning",
          title: "Username ถูกใช้งานแล้ว",
          text:
            result.message ||
            "กรุณาเลือก Username ใหม่",
          confirmButtonText: "ตกลง",
        });
      }

      // ข้อมูลไม่ถูกต้อง
      else if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: "ข้อมูลไม่ถูกต้อง",
          text:
            result.message ||
            "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
        });
      }

      // Server Error
      else if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์",
          text:
            result.message ||
            "กรุณาลองใหม่ภายหลัง",
          confirmButtonText: "ตกลง",
        });
      }

      // Error อื่น ๆ
      else {
        await Swal.fire({
          icon: "error",
          title: `สมัครสมาชิกไม่สำเร็จ`,
          text:
            result.message ||
            `เกิดข้อผิดพลาด status: ${response.status}`,
          confirmButtonText: "ตกลง",
        });
      }
    } catch (error) {
      console.error(error);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text:
          "กรุณาตรวจสอบอินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
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

          <h1 className="text-2xl font-bold text-gray-800">
            สมัครสมาชิก
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            กรุณากรอกข้อมูลเพื่อสร้างบัญชี
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="p-6 space-y-4"
        >

          {/* Firstname */}
          <div>
            <label className="block text-black mb-1">
              ชื่อ
            </label>

            <input
              type="text"
              name="txt_firstname"
              value={form.txt_firstname}
              onChange={handleChange}
              required
              autoComplete="given-name"
              className="w-full border text-black border-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ชื่อ"
            />
          </div>

          {/* Lastname */}
          <div>
            <label className="block text-black mb-1">
              นามสกุล
            </label>

            <input
              type="text"
              name="txt_lastname"
              value={form.txt_lastname}
              onChange={handleChange}
              required
              autoComplete="family-name"
              className="w-full border text-black border-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="นามสกุล"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-black mb-1">
              Username
            </label>

            <input
              type="text"
              name="txt_username"
              value={form.txt_username}
              onChange={handleChange}
              required
              autoComplete="username"
              className="w-full border text-black border-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-black mb-1">
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
              className="w-full border text-black border-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="password"
            />

            <p className="text-xs text-gray-500 mt-1">
              รหัสผ่านอย่างน้อย 6 ตัวอักษร
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-black mb-1">
              ยืนยัน Password
            </label>

            <input
              type="password"
              name="txt_confirm_password"
              value={form.txt_confirm_password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full border text-black border-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ยืนยัน password"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading
              ? "กำลังสมัครสมาชิก..."
              : "สมัครสมาชิก"}
          </button>

          {/* Back Login */}
          <p className="text-center text-sm text-gray-600 pt-2">

            มีบัญชีอยู่แล้ว?{" "}

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:underline"
            >
              เข้าสู่ระบบ
            </button>

          </p>

        </form>

      </div>

    </div>
  );
}