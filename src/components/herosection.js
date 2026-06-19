import Link from "next/link";
import Image from "next/image";

export default function Herosection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-yellow-700">
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Glow Effects */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-500/20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-yellow-500/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-green-200 backdrop-blur">
              🐼 Chengdu • Dragon Warrior City
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white md:text-7xl">
              แพนด้า
              <span className="block bg-gradient-to-r from-green-300 to-yellow-300 bg-clip-text text-transparent">
                เฉิงตู
              </span>
            </h1>

            <p className="mt-6 text-lg text-green-100 md:text-xl">
              ดินแดนแห่งหมีแพนด้า เมืองต้นกำเนิดนักรบมังกร
              ผู้พิชิตรกอไผ่เเห่งท้องนภา
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/explore"
                className="rounded-xl bg-gradient-to-r from-green-500 to-yellow-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
              >
                สำรวจเฉิงตู
              </Link>

              <Link
                href="/story"
                className="rounded-xl border border-green-300 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-green-800"
              >
                ดูเรื่องราว
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center">
            <div className="relative">

              {/* Glow Behind Panda */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-green-400/30 blur-[100px]"></div>

              <Image
                src="/panda2.png"
                alt="Chengdu Panda"
                width={700}
                height={700}
                priority
                className="relative z-10 drop-shadow-[0_0_80px_rgba(74,222,128,0.8)] transition duration-500 hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}