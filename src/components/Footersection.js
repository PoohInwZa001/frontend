import Link from "next/link";

export default function Footersection() {
  return (
    <footer className="relative py-12 text-green-100">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* ข้อมูลเว็บไซต์ */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">
              Panda Shop
            </h2>

            <p className="text-sm leading-relaxed">
              ก้าวเข้าสู่เมืองเฉิงตู บ้านของหมีแพนด้ายักษ์และต้นกำเนิด
              ตำนานนักรบมังกร ดื่มด่ำกับเสน่ห์แห่งวัฒนธรรมจีนอันยิ่งใหญ่
              ที่สืบทอดมานานนับพันปี
            </p>
          </div>

          {/* เมนูลัด */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              เมนูลัด
            </h3>

            <ul className="space-y-2 text-sm">

              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-yellow-300"
                >
                  หน้าแรก
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-yellow-300"
                >
                  เกี่ยวกับเรา
                </Link>
              </li>

              <li>
                <Link
                  href="/service"
                  className="transition-colors hover:text-yellow-300"
                >
                  สินค้า
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-yellow-300"
                >
                  ติดต่อ
                </Link>
              </li>

            </ul>
          </div>

          {/* ติดต่อเรา */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              ติดต่อเรา
            </h3>

            <ul className="space-y-2 text-sm">
              <li>📍 เมืองเฉิงตู มณฑลเสฉวน ประเทศจีน</li>
              <li>🐼 บ้านของหมีแพนด้าและนักรบมังกร</li>
              <li>📞 +86 28 1234 5678</li>
              <li>✉️ contact@pandachengdu.com</li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-green-900/50 pt-8 text-center text-sm">
          © {new Date().getFullYear()} Panda Shop. All rights reserved.
        </div>

      </div>
    </footer>
  );
}