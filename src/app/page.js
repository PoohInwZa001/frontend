"use client";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518709268805-4e9042af2176')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Glow Effect */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-red-600 rounded-full blur-[150px] opacity-40" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-500 rounded-full blur-[150px] opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white uppercase tracking-wider">
          DRAGON
          <span className="block text-yellow-400">
            EMPEROR
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-2xl">
          ปลดปล่อยพลังแห่งมังกรในตำนาน
          พร้อมสัมผัสความยิ่งใหญ่เหนือจินตนาการ
        </p>

        <div className="flex gap-4 mt-10">
          <button className="px-8 py-4 bg-gradient-to-r from-red-700 to-yellow-500 rounded-xl text-white font-bold hover:scale-105 transition">
            เริ่มต้นเลย
          </button>

          <button className="px-8 py-4 border border-yellow-400 text-yellow-400 rounded-xl hover:bg-yellow-400 hover:text-black transition">
            ดูสินค้า
          </button>
        </div>
      </div>
    </section>
  );
}