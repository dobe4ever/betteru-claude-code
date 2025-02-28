import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/components/auth/AuthProvider"

const nunito = Nunito({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Better You App",
  description: "An app to help you become a better version of yourself",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <meta name="google-site-verification" content="Xe9XwiEn7YaawZn4GYkJe7dtNcq2S4CqPeGbMDxNA2o" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}



// import './globals.css'