import Image from 'next/image';

export default function Cardsection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* หัวข้อ Section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">สินค้าแนะนำ</h2>
          <p className="mt-2 text-gray-600">เลือกชมสินค้าที่น่าสนใจของเราในเดือนนี้</p>
        </div>

        {/* ตะแกรง Grid แบบ 3 คอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
          {/* ==================== การ์ดใบที่ 1 ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src="/เเพนด้าสินค้า.png"
                alt="แพนด้า"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                แพนด้า
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                อ้วน ต้วมเตี้ยม น่ารัก พร้อมเขมือบ
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">฿200,000</span>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>

          {/* ==================== การ์ดใบที่ 2 ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src="/เสือ.png"
                alt="เสือน้อย"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                เสือ
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                ดุร้าย พร้อมปกป้องท่าน
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">฿420,000</span>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>

          {/* ==================== การ์ดใบที่ 3 ==================== */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src="/เต่า1.png"
                alt="ผู้เฒ่าเต่า"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                เต่า
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
               ปู่เต่า ในวัยเกษียณ
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">฿5,999</span>
                <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors">
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
