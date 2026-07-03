'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Herosection() {
  const [dragons, setDragons] = useState([])
  const [flyDragons, setFlyDragons] = useState([])

  // 🐉 aura รอบแพนด้า
  useEffect(() => {
    const count = 25

    const initialDragons = Array.from({ length: count }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / count
      const radius = Math.random() * 160 + 60

      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        driftX: (Math.random() - 0.5) * 0.5,
        driftY: (Math.random() - 0.5) * 0.5,
        rotate: Math.random() * 360,
        scale: Math.random() * 0.7 + 0.4,
      }
    })

    setDragons(initialDragons)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDragons((prev) =>
        prev.map((d) => ({
          ...d,
          x: d.x + d.driftX,
          y: d.y + d.driftY,
          rotate: d.rotate + 0.3,
        }))
      )
    }, 16)

    return () => clearInterval(interval)
  }, [])

  // 🐉 dragon2 บินวนไม่หาย (infinite loop)
  useEffect(() => {
    const count = 4 // จำนวนมังกรบิน

    const initial = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 0.7,
      speed: 2 + Math.random() * 2,
      scale: 1.8,
    }))

    setFlyDragons(initial)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFlyDragons((prev) =>
        prev.map((d) => {
          let newX = d.x - d.speed

          // 🔥 ถ้าหลุดซ้าย → ย้ายกลับขวา
          if (newX < -200) {
            newX = window.innerWidth + 200
          }

          return {
            ...d,
            x: newX,
          }
        })
      )
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-yellow-700">

      {/* background */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🐉 flying dragon2 (infinite loop) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {flyDragons.map((d) => (
          <div
            key={d.id}
            className="absolute"
            style={{
              left: d.x,
              top: d.y,
              transform: `scale(${d.scale})`,
            }}
          >
            <Image
              src="/dragon2.png"
              alt="dragon"
              width={160}
              height={160}
            />
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* left */}
          <div className="text-center lg:text-left">
            <h1 className="text-6xl font-bold text-white">
              Panda Shop
            </h1>
            <h2 className="text-xl text-white">
              นักรบมังกรดึกดำบรรพ์
            </h2>
          </div>

          {/* right */}
          <div className="flex justify-center">
            <div className="relative">

              {/* aura dragons */}
              <div className="absolute inset-0 z-0">
                {dragons.map((d) => (
                  <span
                    key={d.id}
                    className="absolute pointer-events-none"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(${d.x}px, ${d.y}px) scale(${d.scale}) rotate(${d.rotate}deg)`,
                    }}
                  >
                    <Image
                      src="/dragon.png"
                      alt="dragon"
                      width={40}
                      height={40}
                    />
                  </span>
                ))}
              </div>

              {/* panda */}
              <div className="relative z-10">
                <Image
                  src="/panda2.png"
                  alt="panda"
                  width={700}
                  height={700}
                  priority
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}