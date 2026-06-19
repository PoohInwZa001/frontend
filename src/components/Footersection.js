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

      {/* Overlay สว่างขึ้น */}
      <div className="absolute inset-0 bg-black/30" />

      {/* เอฟเฟกต์ไล่สี */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ข้อมูลเว็บไซต์ */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">
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
            <h3 className="text-white text-lg font-semibold mb-4">
              เมนูลัด
            </h3>

            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-300">หน้าแรก</a></li>
              <li><a href="#" className="hover:text-yellow-300">เมืองเฉิงตู</a></li>
              <li><a href="#" className="hover:text-yellow-300">หมีแพนด้า</a></li>
              <li><a href="#" className="hover:text-yellow-300">นักรบมังกร</a></li>
            </ul>
          </div>

          {/* ติดต่อเรา */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
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
        <div className="border-t border-green-900/50 mt-12 pt-8 text-center text-sm">
          © {new Date().getFullYear()} Panda Shop. All rights reserved.
        </div>

      </div>
    </footer>
  )
}