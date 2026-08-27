"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const API_URL = "https://6a7e719e3183f5fd884a1755.mockapi.io/api/frontend";

export default function FormEdit() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_username: "",
    txt_password: "",
  });

  // ============================================================
  // ดึงข้อมูลสมาชิก
  // ============================================================
  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      const data = await response.json();

      setForm({
        txt_firstname: data.firstname ?? "",
        txt_lastname: data.lastname ?? "",
        txt_username: data.username ?? "",
        txt_password: "",
      });
    } catch (error) {
      console.error("Fetch User Error:", error);

      setIsError(true);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถโหลดข้อมูลได้",
        text: "ไม่พบข้อมูลสมาชิก",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // handleChange
  // ============================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // ============================================================
  // ตรวจสอบข้อมูล
  // ============================================================
  const validateForm = () => {
    if (!form.txt_firstname.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุชื่อ",
        text: "กรุณากรอกชื่อ",
        confirmButtonText: "ตกลง",
      });

      return false;
    }

    if (!form.txt_lastname.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุนามสกุล",
        text: "กรุณากรอกนามสกุล",
        confirmButtonText: "ตกลง",
      });

      return false;
    }

    if (!form.txt_username.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุ Username",
        text: "กรุณากรอก Username",
        confirmButtonText: "ตกลง",
      });

      return false;
    }

    if (
      form.txt_password &&
      form.txt_password.length < 6
    ) {
      Swal.fire({
        icon: "warning",
        title: "รหัสผ่านไม่ถูกต้อง",
        text: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        confirmButtonText: "ตกลง",
      });

      return false;
    }

    return true;
  };

  // ============================================================
  // แก้ไขข้อมูลสมาชิก
  // ============================================================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSaving(true);

      // ข้อมูลที่จะส่ง
      const payload = {
        firstname: form.txt_firstname,
        lastname: form.txt_lastname,
        username: form.txt_username,
      };

      // ถ้ากรอกรหัสผ่านใหม่ ค่อยส่ง password
      if (form.txt_password) {
        payload.password = form.txt_password;
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // พยายามอ่าน response
      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      // ========================================================
      // สำเร็จ
      // ========================================================
      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ!",
          text: "ปรับปรุงข้อมูลผู้ใช้เรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#2E75B6",
        });

        router.push("/users");
        return;
      }

      // ========================================================
      // 400
      // ========================================================
      if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (status: ${response.status})`,
          text: result.message || "ข้อมูลที่ส่งไม่ถูกต้อง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fecc00",
        });

        return;
      }

      // ========================================================
      // 404
      // ========================================================
      if (response.status === 404) {
        await Swal.fire({
          icon: "error",
          title: "ไม่พบสมาชิก",
          text: "ไม่พบข้อมูลสมาชิกที่ต้องการแก้ไข",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // ========================================================
      // 500+
      // ========================================================
      if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: `เกิดข้อผิดพลาดที่เซิร์ฟเวอร์ (status: ${response.status})`,
          text: result.message || "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#fe0505",
        });

        return;
      }

      // ========================================================
      // Error อื่น ๆ เช่น 401 / 403
      // ========================================================
      await Swal.fire({
        icon: "error",
        title: `บันทึกไม่สำเร็จ (status: ${response.status})`,
        text: result.message || "เกิดข้อผิดพลาด",
        confirmButtonText: "ตกลง",
      });
    } catch (error) {
      // ========================================================
      // กรณีเชื่อมต่อ Server ไม่ได้
      // ========================================================
      console.error("Update Error:", error);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#fc006d",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // ============================================================
  // Loading
  // ============================================================
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <p className="text-gray-600">
            กำลังโหลดข้อมูล...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // Error
  // ============================================================
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-xl font-bold text-red-600 mb-4">
            ไม่สามารถโหลดข้อมูลได้
          </h1>

          <button
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            กลับ
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // หน้าแก้ไข
  // ============================================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">

        {/* หัวข้อ */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            แก้ไขสมาชิก
          </h1>

          <p className="text-gray-500 mt-2">
            แก้ไขข้อมูลสมาชิก
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">

          {/* ชื่อ */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อ
            </label>

            <input
              type="text"
              name="txt_firstname"
              value={form.txt_firstname}
              onChange={handleChange}
              placeholder="กรอกชื่อ"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* นามสกุล */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              นามสกุล
            </label>

            <input
              type="text"
              name="txt_lastname"
              value={form.txt_lastname}
              onChange={handleChange}
              placeholder="กรอกนามสกุล"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>

            <input
              type="text"
              name="txt_username"
              value={form.txt_username}
              onChange={handleChange}
              placeholder="กรอก Username"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รหัสผ่านใหม่
            </label>

            <input
              type="password"
              name="txt_password"
              value={form.txt_password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่านใหม่"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <p className="text-xs text-gray-400 mt-1">
              เว้นว่างไว้หากไม่ต้องการเปลี่ยนรหัสผ่าน
            </p>
          </div>

          {/* ปุ่มบันทึก */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isSaving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
          </button>

          {/* ปุ่มยกเลิก */}
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSaving}
            className="w-full rounded-lg bg-gray-300 py-3 font-semibold text-gray-700 hover:bg-gray-400 transition"
          >
            ยกเลิก
          </button>

        </form>
      </div>
    </div>
  );
}