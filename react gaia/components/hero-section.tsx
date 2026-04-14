"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight, User, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

type Particle = { id: number; left: number; size: number; duration: number; delay: number }

function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: Math.round(Math.random() * 4 + 2),
        duration: Math.round(Math.random() * 10 + 10),
        delay: Math.round(Math.random() * 10),
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-amber-400/30 animate-float"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("currentUser"))
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Background Image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out scale-110"
        style={{
          backgroundImage: `url('https://assets.fcsamerica.com/transform/15a72fc9-c731-4716-ac1a-cd7916268d04/land-for-sale-how-to-find-farmland')`,
          transform: `scale(1.1) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Content */}
      <div
        className="relative z-10 px-5 max-w-4xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
        }}
      >
        <h1
          className="text-6xl md:text-8xl font-black text-amber-400 tracking-widest mb-3 drop-shadow-2xl animate-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          GAIA
        </h1>

        <div
          className="w-24 h-1 mx-auto mb-8 animate-fade-in animate-shimmer rounded-full"
          style={{ animationDelay: '200ms', backgroundColor: 'rgb(251, 191, 36)' }}
        />

        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light text-gray-100 animate-fade-in"
          style={{ animationDelay: '350ms' }}
        >
          {t("hero_tagline")}
        </p>

        <div
          className="animate-fade-up"
          style={{ animationDelay: '500ms' }}
        >
          {loggedIn ? (
            <Link
              href="/profile"
              className="group inline-flex items-center gap-2 px-10 py-4 bg-green-700 hover:bg-green-800 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-700/40 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-green-700/50"
            >
              {t("hero_view_profile")}
              <User className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 px-10 py-4 bg-green-700 hover:bg-green-800 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-lg shadow-green-700/40 hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-green-700/50"
            >
              {t("hero_get_started")}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors cursor-pointer animate-scroll-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
