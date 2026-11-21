/** Menentukan metadata dan tata letak utama serta memasang penyedia bahasa, keadaan tampilan, dan notifikasi. */

import React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { StarField } from "@/components/brand/StarField"
import { SkipLink } from "@/components/layout/SkipLink"
import { AppHeader } from "@/components/navigation/AppHeader"
import { AppStateProvider } from "@/components/providers/AppStateProvider"
import { ToastProvider } from "@/components/ui/Toast"
import { latestExperienceIndex } from "@/data/experience"
import { profile } from "@/data/profile"
import { I18nProvider } from "@/i18n/I18nProvider"
import "./styles.css"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
})

const title = `${profile.name} — ${profile.headline.en}`
const description = profile.bio.en

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  ),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  openGraph: { title, description },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="bg-cosmos font-sans text-warm antialiased">
        <div id="root" tabIndex={-1}>
          <I18nProvider>
            <AppStateProvider initialExperience={latestExperienceIndex}>
              <ToastProvider>
                <StarField />
                <SkipLink />
                <div className="relative z-10 grid h-dvh place-items-center">
                  {/* Bingkai mengelilingi aplikasi pada tablet dan komputer. */}
                  <div className="app-frame h-full w-full md:rounded-[2rem] md:border md:border-line-strong md:bg-cosmos/70 md:p-2 md:shadow-[0_30px_100px_-28px_rgb(0_0_0_/_0.85)]">
                    <div className="flex h-full min-h-0 flex-col overflow-hidden md:rounded-[1.5rem] md:border md:border-line md:bg-night/60">
                      <AppHeader />
                      <main id="main-content" tabIndex={-1} className="relative min-h-0 flex-1 outline-none">
                        {children}
                      </main>
                    </div>
                  </div>
                </div>
              </ToastProvider>
            </AppStateProvider>
          </I18nProvider>
        </div>
      </body>
    </html>
  )
}
