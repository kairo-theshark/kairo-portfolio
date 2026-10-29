"use client"

import { useEffect } from "react"

/* Keeps the bottom byte band hidden until the page is near its end. CSS scroll
   timelines do not work in every browser, so this small scroll listener is the
   shared, reliable path for all of them. */
export function ScrollCodeFallback() {
  useEffect(() => {
    const root = document.documentElement
    const veil = document.querySelector<HTMLElement>(".binary-veil")
    if (!veil) return

    const update = () => {
      const remaining = root.scrollHeight - window.scrollY - window.innerHeight
      const canReveal = remaining <= 140 && window.scrollY > 0
      veil.classList.toggle("code-veil-visible", canReveal)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(root)
    observer.observe(document.body)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return null
}
