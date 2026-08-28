
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const API_URL =
  "https://6a7e719e3183f5fd884a1755.mockapi.io/api/frontend";

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
        confirmButtonColor: "#166534",
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
        confirmButtonColor: "#166534",
      });

      return false;
    }

    if (!form.txt_lastname.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุนามสกุล",
        text: "กรุณากรอกนามสกุล",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#166534",
      });

      return false;
    }

    if (!form.txt_username.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาระบุ Username",
        text: "กรุณากรอก Username",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#166534",
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
        confirmButtonColor: "#166534",
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

      const payload = {
        firstname: form.txt_firstname,
        lastname: form.txt_lastname,
        username: form.txt_username,
      };

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
          confirmButtonColor: "#166534",
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
          confirmButtonColor: "#eab308",
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
          confirmButtonColor: "#dc2626",
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
          text:
            result.message ||
            "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#dc2626",
        });

        return;
      }

      // ========================================================
      // Error อื่น ๆ
      // ========================================================

      await Swal.fire({
        icon: "error",
        title: `บันทึกไม่สำเร็จ (status: ${response.status})`,
        text: result.message || "เกิดข้อผิดพลาด",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#166534",
      });
    } catch (error) {
      console.error("Update Error:", error);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text:
          "กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#166534",
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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-emerald-900 to-yellow-800">
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-yellow-400" />

          <p className="text-lg font-semibold text-white">
            กำลังโหลดข้อมูล...
          </p>

          <p className="mt-1 text-sm text-green-100/60">
            Panda Shop
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
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-emerald-900 to-yellow-800 px-4">
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-red-400/20 bg-black/40 p-10 text-center shadow-2xl backdrop-blur-xl">

          <div className="mb-5 text-6xl">
            ⚠️
          </div>

          <h1 className="text-2xl font-bold text-white">
            ไม่สามารถโหลดข้อมูลได้
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            ไม่พบข้อมูลสมาชิกที่ต้องการแก้ไข
          </p>

          <button
            onClick={() => router.back()}
            className="mt-7 w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:from-green-500 hover:to-emerald-400"
          >
            ← กลับ
          </button>

        </div>
      </div>
    );
  }

  // ============================================================
  // หน้าแก้ไข
  // ============================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-950 via-emerald-900 to-yellow-800 px-4 py-10 sm:px-6">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Glow */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-green-400/20 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl" />

      {/* Decorative Circles */}
      <div className="absolute left-[10%] top-[20%] h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_20px_5px_rgba(250,204,21,0.4)]" />

      <div className="absolute right-[15%] top-[30%] h-2 w-2 rounded-full bg-green-300 shadow-[0_0_20px_5px_rgba(74,222,128,0.4)]" />

      {/* Main */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">

        <div className="grid w-full items-center gap-10 lg:grid-cols-2">

          {/* =====================================
              LEFT
          ===================================== */}

          <div className="hidden text-center lg:block lg:text-left">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2">
              <span>🐼</span>

              <span className="text-sm font-semibold tracking-wider text-yellow-300">
                PANDA SHOP
              </span>
            </div>

            <h1 className="text-5xl font-extrabold leading-tight text-white xl:text-6xl">
              แก้ไข
              <span className="block text-yellow-300">
                ข้อมูลสมาชิก
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-green-100/70">
              ปรับปรุงข้อมูลสมาชิกของคุณให้เป็นปัจจุบัน
              สามารถเปลี่ยนชื่อ Username
              หรือกำหนดรหัสผ่านใหม่ได้
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-green-200/60">
              <span className="h-px w-12 bg-yellow-400/50" />
              <span>MEMBER MANAGEMENT</span>
            </div>

          </div>

          {/* =====================================
              FORM CARD
          ===================================== */}

          <div className="w-full">

            <div className="rounded-3xl border border-green-400/20 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

              {/* Header */}
              <div className="mb-7 text-center">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-3xl shadow-lg">
                  🐼
                </div>

                <h2 className="text-2xl font-extrabold text-white">
                  แก้ไขสมาชิก
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  แก้ไขข้อมูลสมาชิกของ Panda Shop
                </p>

              </div>

              <form
                onSubmit={handleUpdate}
                className="space-y-5"
              >

                {/* ชื่อ */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-green-100">
                    ชื่อ
                  </label>

                  <input
                    type="text"
                    name="txt_firstname"
                    value={form.txt_firstname}
                    onChange={handleChange}
                    placeholder="กรอกชื่อ"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 outline-none transition focus:border-green-400/60 focus:bg-green-500/10 focus:ring-2 focus:ring-green-400/10"
                  />
                </div>

                {/* นามสกุล */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-green-100">
                    นามสกุล
                  </label>

                  <input
                    type="text"
                    name="txt_lastname"
                    value={form.txt_lastname}
                    onChange={handleChange}
                    placeholder="กรอกนามสกุล"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 outline-none transition focus:border-green-400/60 focus:bg-green-500/10 focus:ring-2 focus:ring-green-400/10"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-green-100">
                    Username
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400">
                      @
                    </span>

                    <input
                      type="text"
                      name="txt_username"
                      value={form.txt_username}
                      onChange={handleChange}
                      placeholder="กรอก Username"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-9 pr-4 text-white placeholder-gray-500 outline-none transition focus:border-green-400/60 focus:bg-green-500/10 focus:ring-2 focus:ring-green-400/10"
                    />

                  </div>
                </div>

                {/* Password */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-green-100">
                    รหัสผ่านใหม่
                  </label>

                  <input
                    type="password"
                    name="txt_password"
                    value={form.txt_password}
                    onChange={handleChange}
                    placeholder="กรอกรหัสผ่านใหม่"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-gray-500 outline-none transition focus:border-green-400/60 focus:bg-green-500/10 focus:ring-2 focus:ring-green-400/10"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    * เว้นว่างไว้หากไม่ต้องการเปลี่ยนรหัสผ่าน
                  </p>

                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-2">

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 py-3.5 font-bold text-white shadow-lg shadow-green-950/30 transition hover:scale-[1.01] hover:from-green-500 hover:to-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSaving ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        กำลังบันทึก...
                      </span>
                    ) : (
                      "บันทึกการแก้ไข"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isSaving}
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
                  >
                    ยกเลิก
                  </button>

                </div>

              </form>

            </div>

            {/* Footer */}
            <p className="mt-5 text-center text-xs text-green-100/30">
              © Panda Shop • Member Management
            </p>

          </div>

        </div>

      </main>
    </div>
  );
}