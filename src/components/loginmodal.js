'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginModal({ isOpen, onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isOpen) {
      setIsLoginMode(true)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isLoginMode) {
      console.log('เข้าสู่ระบบด้วย:', { email, password })
    } else {
      console.log('สมัครสมาชิกด้วย:', {
        firstName,
        lastName,
        email,
        password,
      })
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">

      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-green-700/50 shadow-2xl"
        style={{
          backgroundImage: "url('/background1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Content */}
        <div className="relative z-10 p-8">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-green-200 hover:bg-white/10 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto relative h-20 w-20 mb-4">
              <Image
                src="/logo1.png"
                alt="Panda Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            <h2 className="text-3xl font-bold text-white">
              {isLoginMode
                ? 'ยินดีต้อนรับสู่ Panda Shop'
                : 'เข้าร่วมเมืองนักรบมังกร'}
            </h2>

            <p className="mt-2 text-sm text-green-200">
              {isLoginMode
                ? 'เข้าสู่ระบบเพื่อสำรวจโลกของหมีแพนด้า'
                : 'สมัครสมาชิกเพื่อเริ่มต้นการผจญภัย'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {!isLoginMode && (
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="ชื่อ"
                  className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="นามสกุล"
                  className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm text-green-100">
                อีเมล
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm text-green-100">
                  รหัสผ่าน
                </label>

                {isLoginMode && (
                  <Link
                    href="/forgot-password"
                    onClick={onClose}
                    className="text-xs text-yellow-400 hover:text-yellow-300"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                )}
              </div>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-green-700 to-yellow-500 py-3.5 font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-yellow-400 hover:scale-[1.02]"
            >
              {isLoginMode ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-green-700/50" />
            <span className="px-4 text-sm text-green-200">
              หรือ
            </span>
            <div className="h-px flex-1 bg-green-700/50" />
          </div>

          {/* Toggle */}
          <div className="text-center">
            <p className="text-sm text-green-100">
              {isLoginMode
                ? 'ยังไม่มีบัญชีใช่ไหม? '
                : 'มีบัญชีอยู่แล้วใช่ไหม? '}

              <button
                type="button"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="font-medium text-yellow-400 hover:text-yellow-300"
              >
                {isLoginMode
                  ? 'สมัครสมาชิกเลย'
                  : 'เข้าสู่ระบบ'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}