import type { Metadata, Viewport } from "next"

import "@/app/globals.css"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { siteConfig } from "@/lib/content"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — портфолио инженера-разработчика`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "портфолио",
    "разработка",
    "проектирование",
    "self-hosting",
    "Docker",
    "Next.js",
    "TypeScript",
    "3D-печать",
    "C/C++",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — портфолио`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — портфолио`,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  themeColor: "#070b11",
  colorScheme: "dark",
}

const fontStylesheet =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-pt-24">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={fontStylesheet} rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <div className="site-backdrop" aria-hidden="true" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border focus:border-accent/40 focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
        >
          К основному содержанию
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
