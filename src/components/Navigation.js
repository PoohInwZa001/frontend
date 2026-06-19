"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-red-950 via-red-800 to-yellow-700 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/dragon.png"
            alt="Dragon Logo"
            width={60}
            height={60}
            className="drop-shadow-lg"
          />

          <h1 className="text-3xl font-bold text-yellow-300 tracking-wider">
            Dragon Craft
          </h1>
        </div>

        {/* Menu */}
        <div className="flex gap-8 text-white font-semibold">
          <Link
            href="/home"
            className="hover:text-yellow-300 hover:scale-110 transition duration-300"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="hover:text-yellow-300 hover:scale-110 transition duration-300"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="hover:text-yellow-300 hover:scale-110 transition duration-300"
          >
            Contact
          </Link>

          <Link
            href="/service"
            className="hover:text-yellow-300 hover:scale-110 transition duration-300"
          >
            Service
          </Link>
        </div>
      </div>
    </nav>
  );
}