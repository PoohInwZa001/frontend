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

  // กำหนดค่า state ไว้เช็ค login
  const [isAuth, setIsAuth] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [isError, setIsError] = useState(false);

  // =====================================
  // CHECK LOGIN / TOKEN
  // =====================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    // ไม่มี Token
    if (!token) {
      router.push("/login");
      return;
    }

    // มี Token
    setIsAuth(true);

    // โหลดข้อมูล Users
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

      console.log(
        "GET Users Status:",
        response.status
      );

      if (!response.ok) {
        throw new Error(
          `Status ${response.status}`
        );
      }

      const data = await response.json();

      console.log("ข้อมูลทั้งหมด:", data);

      // เอาเฉพาะข้อมูล Register
      // ไม่เอาข้อมูล Action Login
      const registerUsers = data.filter(
        (item) => item.action !== "login"
      );

      setUsers(registerUsers);
    } catch (error) {
      console.error(
        "Fetch Users Error:",
        error
      );

      setIsError(true);

      await Swal.fire({
        icon: "warning",
        title: "ไม่สามารถโหลดข้อมูลได้",
        text: error.message,
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================
  // DELETE USER
  // =====================================

  const handleDelete = async (id) => {
    const user = users.find(
      (u) => u.id === id
    );

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

    if (!result.isConfirmed) {
      return;
    }

    try {
      setDeletingId(id);

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      console.log(
        "DELETE Status:",
        response.status
      );

      if (!response.ok) {
        const data =
          await response
            .json()
            .catch(() => ({}));

        throw new Error(
          data.message ||
            `Status ${response.status}`
        );
      }

      // เอาข้อมูลออกจากหน้าจอ
      setUsers((prev) =>
        prev.filter(
          (u) => u.id !== id
        )
      );

      await Swal.fire({
        icon: "success",
        title: "ลบข้อมูลเรียบร้อยแล้ว",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(
        "Delete Error:",
        error
      );

      await Swal.fire({
        icon: "error",
        title: "ลบข้อมูลไม่สำเร็จ",
        text: error.message,
        confirmButtonText: "ตกลง",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",

      title: "ต้องการออกจากระบบ?",

      showCancelButton: true,

      confirmButtonText: "ออกจากระบบ",

      cancelButtonText: "ยกเลิก",

      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    // ลบ Token
    localStorage.removeItem("token");

    // ลบข้อมูล User
    localStorage.removeItem("user");

    // กลับหน้า Login
    router.push("/login");
  };

  // =====================================
  // CHECK AUTH
  // =====================================

  if (!isAuth) return null;

  // =====================================
  // LOADING
  // =====================================

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  // =====================================
  // ERROR
  // =====================================

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">

        <p className="text-red-500">
          เกิดข้อผิดพลาดในการโหลดข้อมูล
        </p>

        <button
          onClick={fetchUsers}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          ลองใหม่
        </button>

      </div>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            รายชื่อสมาชิก
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            จัดการข้อมูลสมาชิก
          </p>

        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
        >
          ออกจากระบบ
        </button>

      </div>

      {/* =====================================
          NO USERS
      ===================================== */}

      {users.length === 0 ? (

        <div className="rounded-xl bg-white p-8 text-center shadow">

          <p className="text-gray-500">
            ยังไม่มีข้อมูลสมาชิกในระบบ
          </p>

        </div>

      ) : (

        <>
          {/* =====================================
              DESKTOP TABLE
          ===================================== */}

          <div className="hidden overflow-x-auto rounded-xl bg-white shadow md:block">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-green-900 text-left text-white">

                  <th className="border p-3">
                    ลำดับ
                  </th>

                  <th className="border p-3">
                    ชื่อ
                  </th>

                  <th className="border p-3">
                    นามสกุล
                  </th>

                  <th className="border p-3">
                    Username
                  </th>

                  <th className="border p-3 text-center">
                    จัดการ
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.map(
                  (user, index) => (

                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="border p-3 text-center">
                        {index + 1}
                      </td>

                      <td className="border p-3">
                        {user.firstname}
                      </td>

                      <td className="border p-3">
                        {user.lastname}
                      </td>

                      <td className="border p-3">
                        {user.username}
                      </td>

                      <td className="space-x-2 border p-3 text-center">

                        {/* แก้ไข */}

                        <button
                          onClick={() =>
                            router.push(
                              `/users/edit/${user.id}`
                            )
                          }
                          className="rounded bg-yellow-400 px-3 py-1 text-sm font-medium hover:bg-yellow-500"
                        >
                          แก้ไข
                        </button>

                        {/* ลบ */}

                        <button
                          onClick={() =>
                            handleDelete(
                              user.id
                            )
                          }
                          disabled={
                            deletingId ===
                            user.id
                          }
                          className="rounded bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId ===
                          user.id
                            ? "กำลังลบ..."
                            : "ลบ"}
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

          {/* =====================================
              MOBILE CARD
          ===================================== */}

          <div className="space-y-4 md:hidden">

            {users.map(
              (user, index) => (

                <div
                  key={user.id}
                  className="rounded-xl bg-white p-5 shadow"
                >

                  <div className="mb-3">

                    <p className="text-sm text-gray-400">
                      สมาชิก #{index + 1}
                    </p>

                    <h2 className="text-lg font-bold">
                      {user.firstname}{" "}
                      {user.lastname}
                    </h2>

                  </div>

                  <p className="text-sm">

                    <span className="font-medium">
                      Username:
                    </span>{" "}

                    {user.username}

                  </p>

                  <div className="mt-4 flex gap-2">

                    <button
                      onClick={() =>
                        router.push(
                          `/users/edit/${user.id}`
                        )
                      }
                      className="flex-1 rounded bg-yellow-400 px-3 py-2 text-sm font-medium hover:bg-yellow-500"
                    >
                      แก้ไข
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          user.id
                        )
                      }
                      disabled={
                        deletingId ===
                        user.id
                      }
                      className="flex-1 rounded bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
                    >
                      {deletingId ===
                      user.id
                        ? "กำลังลบ..."
                        : "ลบ"}
                    </button>

                  </div>

                </div>

              )
            )}

          </div>
        </>
      )}

    </div>
  );
}