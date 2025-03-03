import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "田中電気 - 安全で信頼できる電気工事サービス",
  description:
    "田中電気は、20年以上の経験を持つ電気工事のプロフェッショナル集団です。安全性と品質にこだわり、お客様に最高のサービスを提供いたします。",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'