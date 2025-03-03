"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bolt, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Menu } from "lucide-react"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ext_01: "",
    body: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch("https://haseyrsk.g.kuroco.app/rcms-api/6/form/sample", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage({ type: "success", text: "お問い合わせが正常に送信されました。" })
        setFormData({ name: "", email: "", ext_01: "", body: "" })
      } else {
        throw new Error("送信に失敗しました")
      }
    } catch (error) {
      setSubmitMessage({ type: "error", text: "お問い合わせの送信中にエラーが発生しました。" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const menuItems = [
    { href: "#services", label: "サービス" },
    { href: "#about", label: "会社概要" },
    { href: "#contact", label: "お問い合わせ" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bolt className="h-8 w-8 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-800">田中電気</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-gray-600 hover:text-gray-800">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-gray-600 hover:text-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">安全で信頼できる電気工事サービス</h1>
            <p className="text-xl text-gray-600 mb-8">お客様の安全と満足を第一に考えます</p>
            <Button size="lg"><a href="#contact">お問い合わせ</a></Button>
          </div>
        </section>

        <section id="services" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">サービス</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "住宅電気工事", image: "/placeholder.svg?height=200&width=300" },
                { name: "商業施設電気工事", image: "/placeholder.svg?height=200&width=300" },
                { name: "電気設備保守点検", image: "/placeholder.svg?height=200&width=300" },
              ].map((service) => (
                <div key={service.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.name}</h3>
                    <p className="text-gray-600">
                      高品質な{service.name}
                      を提供いたします。お客様のニーズに合わせた最適なソリューションをご提案します。
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">会社概要</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-600 mb-4">
                当社は、20年以上の経験を持つ電気工事のプロフェッショナル集団です。
                安全性と品質にこだわり、最新の技術と知識を活用して、お客様に最高のサービスを提供いたします。
              </p>
              <p className="text-gray-600">
                地域に根ざした企業として、お客様との信頼関係を大切にし、迅速かつ丁寧な対応を心がけています。
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">お問い合わせ</h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  name="name"
                  placeholder="お名前"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="メールアドレス"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="tel"
                  name="ext_01"
                  placeholder="電話番号"
                  value={formData.ext_01}
                  onChange={handleInputChange}
                />
                <Textarea
                  name="body"
                  placeholder="メッセージ"
                  value={formData.body}
                  onChange={handleInputChange}
                  required
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "送信中..." : "送信"}
                </Button>
              </form>
              {submitMessage && (
                <div
                  className={`mt-4 p-4 rounded-md ${submitMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {submitMessage.text}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">連絡先</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" /> 123-456-7890
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" /> info@example.com
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" /> 〒123-4567 東京都○○区××町1-2-3
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">営業時間</h3>
              <p>平日: 9:00 - 18:00</p>
              <p>土曜: 9:00 - 15:00</p>
              <p>日曜・祝日: 休業</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">フォローする</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 田中電気. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

