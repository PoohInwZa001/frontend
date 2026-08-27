"use client";

import Image from "next/image";
import Link from "next/link";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "แพนด้า",
      description: "อ้วน ต้วมเตี้ยม น่ารัก พร้อมเขมือบ",
      price: "฿200,000",
      image: "/เเพนด้าสินค้า.png",
    },
    {
      id: 2,
      name: "เสือ",
      description: "ดุร้าย พร้อมปกป้องท่าน",
      price: "฿420,000",
      image: "/เสือ1.png",
    },
    {
      id: 3,
      name: "เต่า",
      description: "ปู่เต่า ในวัยเกษียณ",
      price: "฿5,999",
      image: "/เต่า2.png",
    },
    {
      id: 4,
      name: "ควาย",
      description: "ตามหาชาวนารับเลี้ยงง",
      price: "฿999,999",
      image: "/ควาย.png",
    },
    {
      id: 5,
      name: "นกเป็ดน้ำ",
      description: "คู่หูน้อนควายย",
      price: "฿750,000",
      image: "/นกเป็กน้ำ.png",
    },
    {
      id: 6,
      name: "เสือโคร่ง",
      description: "นักรบ สุดโหด พร้อม ขย้ำ",
      price: "฿350,000",
      image: "/เสือโคร่ง.png",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-yellow-700">

      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* Header */}
        <div className="mb-14 text-center">

          <h1 className="text-5xl font-bold text-white md:text-6xl">
            Panda Shop
          </h1>

          <h2 className="mt-3 text-2xl font-semibold text-yellow-300">
            สินค้าทั้งหมด
          </h2>

          <p className="mt-4 text-lg text-green-100">
            เลือกสัตว์คู่ใจสำหรับการผจญภัยของคุณ 🐼 🐯 🐢 🐃 🦆
          </p>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (

            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-green-400/40 bg-green-950/80 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-3 hover:border-yellow-300/60 hover:shadow-green-950"
            >

              {/* Product Image */}
              <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-white/10">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Number */}
                <div className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-green-950/80 font-bold text-white backdrop-blur-sm">
                  {product.id}
                </div>

              </div>

              {/* Product Detail */}
              <div className="p-6">

                <h2 className="text-2xl font-bold text-white">
                  {product.name}
                </h2>

                <p className="mt-2 min-h-[48px] text-green-100">
                  {product.description}
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-green-400/20" />

                {/* Price + Button */}
                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="text-xs text-green-300">
                      ราคา
                    </p>

                    <span className="text-2xl font-bold text-yellow-300">
                      {product.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-green-400"
                  >
                    เพิ่มลงตะกร้า
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">

          <p className="mb-5 text-green-100">
            พร้อมออกผจญภัยไปกับเหล่านักรบมังกรแล้วหรือยัง?
          </p>

          <Link
            href="/"
            className="inline-block rounded-full border border-green-300/50 bg-green-950/80 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-green-800"
          >
            ← กลับหน้าหลัก
          </Link>

        </div>

      </div>
    </main>
  );
}