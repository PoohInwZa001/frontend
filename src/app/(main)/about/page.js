"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [dragons, setDragons] = useState([]);
  const [flyDragons, setFlyDragons] = useState([]);

  // 🐉 มังกรรอบ Panda
  useEffect(() => {
    const count = 20;

    const initialDragons = Array.from({ length: count }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / count;
      const radius = Math.random() * 160 + 60;

      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        driftX: (Math.random() - 0.5) * 0.5,
        driftY: (Math.random() - 0.5) * 0.5,
        rotate: Math.random() * 360,
        scale: Math.random() * 0.7 + 0.4,
      };
    });

    setDragons(initialDragons);
  }, []);

  // 🐉 ทำให้มังกรรอบ ๆ เคลื่อนที่
  useEffect(() => {
    const interval = setInterval(() => {
      setDragons((prev) =>
        prev.map((d) => ({
          ...d,
          x: d.x + d.driftX,
          y: d.y + d.driftY,
          rotate: d.rotate + 0.3,
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // 🐉 มังกรบิน
  useEffect(() => {
    const count = 4;

    const initial = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.7,
      speed: 2 + Math.random() * 2,
      scale: 1.5,
    }));

    setFlyDragons(initial);
  }, []);

  // 🐉 วนมังกรกลับไปด้านขวา
  useEffect(() => {
    const interval = setInterval(() => {
      setFlyDragons((prev) =>
        prev.map((d) => {
          let newX = d.x - d.speed;

          if (newX < -200) {
            newX = window.innerWidth + 200;
          }

          return {
            ...d,
            x: newX,
          };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-yellow-700">
      
      {/* Background */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center">

          <p className="mt-4 text-lg text-green-100">
            ร้านค้าของเหล่านักรบมังกรดึกดำบรรพ์
          </p>
        </div>

        {/* About Section */}
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Panda */}
          <div className="flex justify-center">
            <div className="relative">

              {/* 🐉 Aura */}
              <div className="absolute inset-0 z-0">
                {dragons.map((d) => (
                  <span
                    key={d.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(${d.x}px, ${d.y}px) scale(${d.scale}) rotate(${d.rotate}deg)`,
                    }}
                  >
                    <Image
                      src="/dragon.png"
                      alt="dragon"
                      width={40}
                      height={40}
                    />
                  </span>
                ))}
              </div>

              {/* Panda */}
              <div className="relative z-10">
                <Image
                  src="/pandaabout1.png"
                  alt="Panda Shop"
                  width={550}
                  height={550}
                  priority
                />
              </div>

            </div>
          </div>

          {/* Text */}
          <div className="rounded-3xl border border-green-500/40 bg-green-950/70 p-8 shadow-2xl backdrop-blur-sm">
            
            <h2 className="mb-5 text-3xl font-bold text-white">
              🐼 ยินดีต้อนรับสู่ Panda Shop
            </h2>

            <p className="mb-5 leading-8 text-green-100">
              Panda Shop คือร้านค้าที่รวบรวมสินค้าและบริการสำหรับเหล่านักรบ
              ผู้กล้าที่ต้องการออกผจญภัยไปพร้อมกับเหล่ามังกร
            </p>

            <p className="mb-5 leading-8 text-green-100">
              เรามุ่งเน้นการนำเสนอสินค้าอย่างมีคุณภาพ พร้อมออกแบบประสบการณ์
              การใช้งานที่เรียบง่าย สวยงาม และเข้าถึงได้ง่ายสำหรับทุกคน
            </p>

            <p className="leading-8 text-green-100">
              ด้วยพลังของแพนด้าและเหล่ามังกร
              เราพร้อมเดินทางไปกับคุณในทุกการผจญภัย
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-block rounded-full bg-green-500 px-7 py-3 font-bold text-white transition hover:bg-green-400"
              >
                กลับหน้าหลัก
              </Link>
            </div>

          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-green-500/40 bg-green-950/70 p-7 text-center backdrop-blur-sm">
            <div className="mb-4 text-5xl">🐼</div>
            <h3 className="mb-3 text-xl font-bold text-white">
              Panda Power
            </h3>
            <p className="text-green-100">
              พลังแห่งแพนด้าที่พร้อมดูแลและช่วยเหลือนักรบทุกคน
            </p>
          </div>

          <div className="rounded-2xl border border-green-500/40 bg-green-950/70 p-7 text-center backdrop-blur-sm">
            <div className="mb-4 text-5xl">🐉</div>
            <h3 className="mb-3 text-xl font-bold text-white">
              Dragon Spirit
            </h3>
            <p className="text-green-100">
              จิตวิญญาณแห่งมังกรที่เป็นสัญลักษณ์ของความแข็งแกร่ง
            </p>
          </div>

          <div className="rounded-2xl border border-green-500/40 bg-green-950/70 p-7 text-center backdrop-blur-sm">
            <div className="mb-4 text-5xl">⚔️</div>
            <h3 className="mb-3 text-xl font-bold text-white">
              Warrior Journey
            </h3>
            <p className="text-green-100">
              ร่วมออกเดินทางและสร้างประสบการณ์ใหม่ไปพร้อมกับเรา
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}