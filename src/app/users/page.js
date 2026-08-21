"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const API_URL = "https://api.itdev.cmtc.ac.th/users";

export default function UsersPage() {
 const [deletingId, setDeletingId] = useState(null); //กำหนดค่า state ไว้ด้านบน
 const [isAuth, setIsAuth] = useState(false);  //กำหนด state เช็ค login
 const router = useRouter();
 const [users, setUsers] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [isError, setIsError] = useState(false);
                    
 const handleDelete = async (id) => {
  // หาข้อมูลคนนั้นจาก state เพื่อเอาชื่อไปแสดงในกล่องยืนยัน
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

    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || `Status ${response.status}`);
    }

    setUsers((prev) => prev.filter((u) => u.id !== id));

    await Swal.fire({
      icon: "success",
      title: "ลบข้อมูลเรียบร้อยแล้ว",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "ลบข้อมูลไม่สำเร็จ",
      text: error.message,
    });
  } finally {
    setDeletingId(null);
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsAuth(true);
    fetchUsers();
  }, []);

 const fetchUsers = async () => {
 setIsLoading(true);
 setIsError(false);
 try {
 const response = await fetch(API_URL);
 if (!response.ok) throw new Error(`Status ${response.status}`);
 const data = await response.json();
 setUsers(data);
 } catch (error) {
 setIsError(true);
 await Swal.fire({ icon: "warning", title: "ไม่สามารถโหลดข้อมูลได้" });
 } finally {
 setIsLoading(false);
 }
 };
 if (!isAuth) return null;  //เช้คค่า login
 if (isLoading) return <p>กำลังโหลดข้อมูล...</p>;
 if (isError) return <p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>;
 if (users.length === 0) return <p>ยังไม่มีข้อมูลสมาชิกในระบบ</p>;
// Task 2: แสดงผลข้อมูลแบบตาราง (Desktop) + การ์ด (Mobile)
 return (
 <div className="p-6">
 <h1 className="text-xl font-bold mb-4">รายชื่อสมาชิก</h1>
 {/* ตาราง สำหรับจอกว้าง */}
 <table className="w-full border-collapse">
 <thead>
 <tr className="bg-gray-100 text-left">
 <th className="p-2 border">ลำดับ</th>
 <th className="p-2 border">ชื่อ</th>
 <th className="p-2 border">นามสกุล</th>
 <th className="p-2 border">Username</th>
 <th className="p-2 border">จัดการ</th>
 </tr>
 </thead>
 <tbody>
 {users.map((user, index) => (
 <tr key={user.id} className="border-b">
 <td className="p-2 border text-center">{ index + 1}</td>
 <td className="p-2 border">{user.firstname}</td>
 <td className="p-2 border">{user.lastname}</td>
 <td className="p-2 border">{user.username}</td>
 <td className="p-2 border space-x-2">
 <button
 onClick={() => router.push(`/users/edit/${user.id}`)}
 className="px-3 py-1 bg-yellow-400 rounded text-sm"
 >
 แก้ไข
 </button>
 <button
onClick={() => handleDelete(user.id)}
disabled={deletingId === user.id}
className="px-3 py-1 bg-red-500 text-white rounded text-sm"
>
{deletingId === user.id ? "กำลังลบ..." : "ลบ"}
</button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 );
}