"use client"

import { Languages } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export function SettingsButtons() {
  const { lang, setLang } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        role="group"
        aria-label="Select language"
        className="flex items-center gap-1 p-1 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <Languages className="w-4 h-4 ml-1.5 mr-0.5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
        <button
          onClick={() => setLang("en")}
          aria-pressed={lang === "en"}
          className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 ${
            lang === "en"
              ? "bg-amber-400 text-black shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang("bg")}
          aria-pressed={lang === "bg"}
          className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 ${
            lang === "bg"
              ? "bg-amber-400 text-black shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          BG
        </button>
      </div>
    </div>
  )
}
