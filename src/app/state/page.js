'use client';
import { useState } from 'react';

export default function LikeButton() {
  // สร้าง State ชื่อ likes มีค่าเริ่มต้นคือ 0
  // และมีฟังก์ชัน setLikes เอาไว้อัปเดตค่า
  const [likes, setLikes] = useState(0); 

  return (
    <button onClick={() => setLikes(likes + 1)}>
      👍 กดไลก์ ({likes}) 
    </button>
  );
}