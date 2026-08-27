'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LoginModal from '@/components/loginmodal'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const menuItems = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'เกี่ยวกับเรา', href: '/about' },
    { name: 'สินค้า', href: '/service' },
    { name: 'ติดต่อ', href: '/contact' },
    { name: 'Sign In', href: '/login' },
    { name: 'Sign Up', href: '/register' }
  ]

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-green-900 shadow-lg">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/background1.png')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex h-24 items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-4"
            >
              <div className="relative h-24 w-24">
                <Image
                  src="/logo1.png"
                  alt="Panda Shop Logo"
                  fill
                  priority
                  className="object-contain drop-shadow-lg"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">
                  Panda Shop
                </h1>

                <p className="text-sm text-green-200">
                  Dragon Warrior City
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-white font-medium transition-all duration-300 hover:text-yellow-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Login Button */}
            <div className="hidden md:block">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'
                    : 'bg-white text-gray-900 hover:bg-gray-100 shadow-sm'
                }`}
              >
                เข้าสู่ระบบ
              </button>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-lg p-2 text-white transition hover:bg-white/10"
            >
              <div className="space-y-1.5">
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isOpen ? 'translate-y-2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isOpen ? '-translate-y-2 -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
              isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-3 text-white transition-all duration-200 hover:bg-white/10 hover:text-yellow-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}