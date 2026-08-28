
"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const API_URL =
  "https://6a7e719e3183f5fd884a1755.mockapi.io/api/frontend";

export default function UsersPage() {
  const router = useRouter();

  // =====================================
  // STATE
  // =====================================

  const [users, setUsers] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // =====================================
  // CHECK LOGIN
  // =====================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    if (!token) {
      router.push("/login");
      return;
    }

    setIsAuth(true);
    fetchUsers();
  }, []);

  // =====================================
  // GET USERS
  // =====================================

  const fetchUsers = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
      });

      console.log("GET Users Status:", response.status);

      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }

      const data = await response.json();

      console.log("ข้อมูลทั้งหมด:", data);

      // เอาเฉพาะ Register
      const registerUsers = data.filter(
        (item) => item.action !== "login"
      );

      setUsers(registerUsers);
    } catch (error) {
      console.error("Fetch Users Error:", error);

      setIsError(true);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถโหลดข้อมูลได้",
        text: error.message,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#166534",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================
  // DELETE USER
  // =====================================

  const handleDelete = async (id) => {
    const user = users.find((u) => u.id === id);

    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบข้อมูล",
      html: user
        ? `ต้องการลบ <b>${user.firstname} ${user.lastname}</b> ใช่หรือไม่?<br>เมื่อลบแล้วจะไม่สามารถกู้คืนได้`
        : "เมื่อลบแล้วจะไม่สามารถกู้คืนได้",
      showCancelButton: true,
      confirmButtonText: "ลบเลย",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      console.log("DELETE Status:", response.status);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(
          data.message || `Status ${response.status}`
        );
      }

      setUsers((prev) =>
        prev.filter((u) => u.id !== id)
      );

      await Swal.fire({
        icon: "success",
        title: "ลบข้อมูลเรียบร้อยแล้ว",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete Error:", error);

      await Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
        text: error.message,
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#166534",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================
  // AUTH
  // =====================================

  if (!isAuth) return null;

  // =====================================
  // LOADING
  // =====================================

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-emerald-900 to-yellow-800">
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-yellow-400" />

          <p className="text-lg font-semibold text-white">
            กำลังโหลดข้อมูล...
          </p>

          <p className="mt-1 text-sm text-green-100/70">
            Panda Shop
          </p>
        </div>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (isError) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-950 via-emerald-900 to-yellow-800">
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 rounded-2xl border border-red-400/30 bg-black/40 p-10 text-center shadow-2xl backdrop-blur-md">
          <div className="mb-4 text-5xl">
            ⚠️
          </div>

          <h2 className="text-xl font-bold text-white">
            เกิดข้อผิดพลาด
          </h2>

          <p className="mt-2 text-sm text-gray-300">
            ไม่สามารถโหลดข้อมูลสมาชิกได้
          </p>

          <button
            onClick={fetchUsers}
            className="mt-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:from-green-400 hover:to-emerald-500"
          >
            ลองใหม่
          </button>
        </div>
      </div>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-950 via-emerald-900 to-yellow-800">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Decorative Glow */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-green-400/20 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-yellow-400/20 blur-3xl" />

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8 overflow-hidden rounded-3xl border border-green-400/20 bg-black/35 p-6 shadow-2xl backdrop-blur-md sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">
                  🐼
                </span>

                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                  Panda Shop
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                รายชื่อสมาชิก
              </h1>

              <p className="mt-2 text-sm text-green-100/70">
                จัดการข้อมูลสมาชิกภายในระบบ
              </p>
            </div>

            {/* Count */}
            <div className="hidden rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center sm:block">
              <p className="text-xs text-gray-400">
                สมาชิกทั้งหมด
              </p>

              <p className="text-2xl font-bold text-yellow-300">
                {users.length}
              </p>
            </div>

          </div>
        </div>

        {/* =====================================
            MOBILE COUNT
        ===================================== */}

        <div className="mb-5 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md sm:hidden">

          <div className="flex items-center justify-between">

            <span className="text-sm text-gray-300">
              สมาชิกทั้งหมด
            </span>

            <span className="text-xl font-bold text-yellow-300">
              {users.length}
            </span>

          </div>

        </div>

        {/* =====================================
            NO USERS
        ===================================== */}

        {users.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-black/35 p-12 text-center shadow-2xl backdrop-blur-md">

            <div className="mb-5 text-6xl">
              🐼
            </div>

            <h2 className="text-xl font-bold text-white">
              ยังไม่มีข้อมูลสมาชิก
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              ยังไม่มีสมาชิกในระบบ Panda Shop
            </p>

          </div>

        ) : (

          <>
            {/* =====================================
                DESKTOP TABLE
            ===================================== */}

            <div className="hidden overflow-hidden rounded-3xl border border-green-400/20 bg-black/35 shadow-2xl backdrop-blur-md md:block">

              <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                  <thead>
                    <tr className="bg-green-950/80 text-left">

                      <th className="border-b border-white/10 p-5 text-sm font-semibold text-yellow-300">
                        #
                      </th>

                      <th className="border-b border-white/10 p-5 text-sm font-semibold text-yellow-300">
                        ชื่อ
                      </th>

                      <th className="border-b border-white/10 p-5 text-sm font-semibold text-yellow-300">
                        นามสกุล
                      </th>

                      <th className="border-b border-white/10 p-5 text-sm font-semibold text-yellow-300">
                        Username
                      </th>

                      <th className="border-b border-white/10 p-5 text-center text-sm font-semibold text-yellow-300">
                        จัดการ
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {users.map((user, index) => (

                      <tr
                        key={user.id}
                        className="group border-b border-white/5 transition hover:bg-green-500/10"
                      >

                        <td className="p-5 text-center font-bold text-green-300">
                          {String(index + 1).padStart(2, "0")}
                        </td>

                        <td className="p-5 font-medium text-white">
                          {user.firstname}
                        </td>

                        <td className="p-5 text-gray-300">
                          {user.lastname}
                        </td>

                        <td className="p-5">

                          <span className="rounded-lg border border-green-400/20 bg-green-500/10 px-3 py-1.5 text-sm text-green-300">
                            @{user.username}
                          </span>

                        </td>

                        <td className="p-5">

                          <div className="flex justify-center gap-2">

                            {/* Edit */}
                            <button
                              onClick={() =>
                                router.push(
                                  `/users/edit/${user.id}`
                                )
                              }
                              className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400 hover:text-black"
                            >
                              แก้ไข
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() =>
                                handleDelete(user.id)
                              }
                              disabled={
                                deletingId === user.id
                              }
                              className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {deletingId === user.id
                                ? "กำลังลบ..."
                                : "ลบ"}
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>
            </div>

            {/* =====================================
                MOBILE CARD
            ===================================== */}

            <div className="space-y-4 md:hidden">

              {users.map((user, index) => (

                <div
                  key={user.id}
                  className="group rounded-3xl border border-green-400/20 bg-black/35 p-5 shadow-xl backdrop-blur-md transition hover:border-green-400/40"
                >

                  <div className="mb-5 flex items-start justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/15 text-2xl">
                        🐼
                      </div>

                      <div>

                        <p className="text-xs text-gray-500">
                          MEMBER #{index + 1}
                        </p>

                        <h2 className="font-bold text-white">
                          {user.firstname}{" "}
                          {user.lastname}
                        </h2>

                      </div>

                    </div>

                    <span className="text-xs text-green-400">
                      ● ACTIVE
                    </span>

                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/5 p-3">

                    <p className="text-xs text-gray-500">
                      Username
                    </p>

                    <p className="mt-1 font-medium text-green-300">
                      @{user.username}
                    </p>

                  </div>

                  <div className="mt-4 flex gap-2">

                    {/* Edit */}
                    <button
                      onClick={() =>
                        router.push(
                          `/users/edit/${user.id}`
                        )
                      }
                      className="flex-1 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-3 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400 hover:text-black"
                    >
                      แก้ไข
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        handleDelete(user.id)
                      }
                      disabled={
                        deletingId === user.id
                      }
                      className="flex-1 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:text-white disabled:opacity-40"
                    >
                      {deletingId === user.id
                        ? "กำลังลบ..."
                        : "ลบ"}
                    </button>

                  </div>

                </div>

              ))}

            </div>
          </>
        )}

      </main>
    </div>
  );
}