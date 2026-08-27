"use client";

import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-yellow-700">

      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none" />

      {/* 🐉 Dragon Background */}
      <div className="absolute right-[-80px] top-20 opacity-20 pointer-events-none">
        <Image
          src="/dragon2.png"
          alt="dragon"
          width={350}
          height={350}
        />
      </div>

      <div className="absolute bottom-[-80px] left-[-80px] opacity-20 pointer-events-none">
        <Image
          src="/dragon.png"
          alt="dragon"
          width={350}
          height={350}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold text-white md:text-6xl">
            Panda Shop
          </h1>

          <h2 className="mt-3 text-3xl font-bold text-yellow-300">
            ติดต่อเรา
          </h2>

          <p className="mt-4 text-lg text-green-100">
            มีคำถามหรือข้อสงสัย สามารถติดต่อเหล่านักรบของเราได้เลย 🐼🐉
          </p>

        </div>

        {/* Contact Grid */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Contact Information */}
          <div className="rounded-3xl border border-green-400/40 bg-green-950/80 p-8 shadow-2xl backdrop-blur-sm">

            <h2 className="mb-6 text-3xl font-bold text-white">
              📞 ช่องทางการติดต่อ
            </h2>

            <div className="space-y-5">

              {/* Phone */}
              <div className="flex items-center gap-4 rounded-2xl border border-green-400/20 bg-green-900/50 p-5">
                <div className="text-3xl">
                  📱
                </div>

                <div>
                  <p className="text-sm text-green-300">
                    โทรศัพท์
                  </p>

                  <p className="text-lg font-semibold text-white">
                    +86 28 1234 5678
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 rounded-2xl border border-green-400/20 bg-green-900/50 p-5">
                <div className="text-3xl">
                  📧
                </div>

                <div>
                  <p className="text-sm text-green-300">
                    Email
                  </p>

                  <p className="text-lg font-semibold text-white">
                    contact@pandachengdu.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4 rounded-2xl border border-green-400/20 bg-green-900/50 p-5">
                <div className="text-3xl">
                  📍
                </div>

                <div>
                  <p className="text-sm text-green-300">
                    ที่อยู่
                  </p>

                  <p className="text-lg font-semibold text-white">
                    เมืองเฉิงตู มณฑลเสฉวน ประเทศจีน
                  </p>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-center gap-4 rounded-2xl border border-green-400/20 bg-green-900/50 p-5">
                <div className="text-3xl">
                  💬
                </div>

                <div>
                  <p className="text-sm text-green-300">
                    Facebook
                  </p>

                  <p className="text-lg font-semibold text-white">
                    Panda Shop
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-green-400/40 bg-green-950/80 p-8 shadow-2xl backdrop-blur-sm">

            <h2 className="mb-6 text-3xl font-bold text-white">
              ✉️ ส่งข้อความหาเรา
            </h2>

            <form className="space-y-5">

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-green-200">
                  ชื่อ
                </label>

                <input
                  type="text"
                  placeholder="กรอกชื่อของคุณ"
                  className="w-full rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none placeholder:text-green-300/50 focus:border-yellow-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-green-200">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none placeholder:text-green-300/50 focus:border-yellow-300"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-green-200">
                  หัวข้อ
                </label>

                <input
                  type="text"
                  placeholder="หัวข้อที่ต้องการติดต่อ"
                  className="w-full rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none placeholder:text-green-300/50 focus:border-yellow-300"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-green-200">
                  ข้อความ
                </label>

                <textarea
                  rows="5"
                  placeholder="พิมพ์ข้อความของคุณ..."
                  className="w-full resize-none rounded-xl border border-green-400/30 bg-green-900/60 px-4 py-3 text-white outline-none placeholder:text-green-300/50 focus:border-yellow-300"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-green-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-green-400"
              >
                ส่งข้อความ 🐉
              </button>

            </form>

          </div>

        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">

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