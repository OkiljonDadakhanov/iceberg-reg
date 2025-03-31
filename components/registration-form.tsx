"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const courses = [
    { name: "Arab tili", description: "Fonetika, CEFR, Xorijiy ustoz" },
    { name: "Ingliz tili", description: "General English, IELTS" },
    { name: "Rus tili", description: "" },
    { name: "Turk tili", description: "grammatika, CEFR" },
    { name: "Bilag'on bolajor", description: "Maktabga tayyorlov" },
    { name: "Logoped yakka mashg'ulotlari", description: "" },
    { name: "Arxitektura va interyer dizayn kursi", description: "" },
    { name: "3ds Max va AutoCAD kursi", description: "" },
    { name: "Xattotlik", description: "" },
    { name: "Mental arifmetika", description: "Ментал арифметика" },
    { name: "Kompyuter savodxonligi", description: "Word, Excel, Windows" },
    { name: "Matematika", description: "Imtihonga tayyorgarlik" },
]

const locations = [
    { name: "Chilonzor", region: "Toshkent" },
    { name: "Nazarbek", region: "Toshkent" },
    { name: "Olmazor", region: "Toshkent" },
    { name: "Qoratosh", region: "Toshkent" },
    { name: "Sergeli", region: "Toshkent" },
    { name: "Zangiota", region: "Toshkent" },
    { name: "Samarqand", region: "Samarqand" },
    { name: "Namangan", region: "Namangan" },
    { name: "Online", region: "Internet" },
    { name: "Qo'qon", region: "Farg'ona" },
    { name: "Andijon", region: "Andijon" },
    { name: "Poytug'", region: "Andijon" },
]

const sources = ["Instagram", "Facebook", "Telegram", "Do'stlar orqali", "Tanishlar orqali"]

type ValidationErrors = {
    course?: string
    location?: string
    fullName?: string
    source?: string
    phone?: string
    additionalPhone?: string
    general?: string
}

export default function RegistrationForm() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        course: "",
        location: "",
        fullName: "",
        source: "",
        phone: "+998",
        additionalPhone: "+998",
    })
    const [errors, setErrors] = useState<ValidationErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when field is edited
        if (errors[field as keyof ValidationErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {}

        // Validate course
        if (!formData.course) {
            newErrors.course = "Kurs tanlash majburiy"
        }

        // Validate location
        if (!formData.location) {
            newErrors.location = "Filial tanlash majburiy"
        }

        // Validate full name
        if (!formData.fullName) {
            newErrors.fullName = "Ism va familiya kiritish majburiy"
        } else if (formData.fullName.trim().split(" ").length < 2) {
            newErrors.fullName = "Ism va familiyangizni to'liq kiriting"
        }



        // Validate phone number
        const phoneRegex = /^\+998\s*\d{2}\s*\d{3}\s*\d{2}\s*\d{2}$/;

        if (!formData.phone) {
            newErrors.phone = "Telefon raqami kiritish majburiy";
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Telefon raqami +998 dan boshlanib, 12 raqamdan iborat bo'lishi kerak";
        }

        // Validate additional phone if provided
        if (formData.additionalPhone && formData.additionalPhone !== "+998") {
            if (!phoneRegex.test(formData.additionalPhone.replace(/\s/g, ""))) {
                newErrors.additionalPhone = "Telefon raqami +998 dan boshlanib, 12 raqamdan iborat bo'lishi kerak";
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            // Scroll to the first error
            const firstErrorField = Object.keys(errors)[0]
            const element = document.getElementById(firstErrorField)
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            return
        }

        setIsSubmitting(true)

        try {
            // In a real application, you would send the data to your backend here
            console.log("Form submitted:", formData)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            await sendToTelegram(formData)

            router.push("/rahmat")
        } catch (error) {
            console.error("Submission error:", error)
            setErrors({
                general: "Ariza yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const TELEGRAM_BOT_TOKEN = "7176468132:AAHhV4VqPYAOeoBGOEzn_LfIXNqHCMu5KXA"
    const TELEGRAM_CHAT_ID = "-1002334606268" 

    const sendToTelegram = async (data: typeof formData) => {
        const message = `
📥 Yangi ariza:

👤 Ism: ${data.fullName}
📞 Telefon: ${data.phone}
📞 Qo'shimcha: ${data.additionalPhone !== "+998" ? data.additionalPhone : "Yo'q"}
📚 Kurs: ${data.course}
📍 Filial: ${data.location}
📢 Qayerdan topdi: ${data.source}
    `.trim()

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "Markdown",
            }),
        })
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
            )}

            <div className="space-y-2">
                <Label htmlFor="course" className={errors.course ? "text-red-500" : ""}>
                    Kurslardan birini tanlang:
                </Label>
                <Select required value={formData.course} onValueChange={(value) => handleChange("course", value)}>
                    <SelectTrigger id="course" className={`w-full ${errors.course ? "border-red-500 ring-red-500" : ""} cursor-pointer`}>
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map((course) => (
                            <SelectItem key={course.name} value={course.name} className="py-3">
                                <div>
                                    <span className="text-green-600 font-medium cursor-pointer">{course.name}</span>
                                    {course.description && <span className="text-gray-400 ml-2">({course.description})</span>}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.course && <p className="text-sm text-red-500 mt-1">{errors.course}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="location" className={errors.location ? "text-red-500" : ""}>
                    Sizga yaqin filialni tanlang:
                </Label>
                <Select required value={formData.location} onValueChange={(value) => handleChange("location", value)}>
                    <SelectTrigger id="location" className={`w-full ${errors.location ? "border-red-500 ring-red-500" : ""}`}>
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        {locations.map((location) => (
                            <SelectItem key={location.name} value={location.name} className="py-3">
                                <div>
                                    <span className="text-green-600 font-medium">{location.name}</span>
                                    {location.region && <span className="text-gray-400 ml-2">{location.region}</span>}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="fullName" className={errors.fullName ? "text-red-500" : ""}>
                    Ism va Familiya:
                </Label>
                <Input
                    id="fullName"
                    required
                    placeholder="Ism Familiya"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={errors.fullName ? "border-red-500 ring-red-500" : ""}
                />
                {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="source" className={errors.source ? "text-red-500" : ""}>
                    Biz haqimizda qayerdan xabar topdingiz?
                </Label>
                <Select required value={formData.source} onValueChange={(value) => handleChange("source", value)}>
                    <SelectTrigger id="source" className={`w-full ${errors.source ? "border-red-500 ring-red-500" : ""}`}>
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        {sources.map((source) => (
                            <SelectItem key={source} value={source}>
                                {source}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.source && <p className="text-sm text-red-500 mt-1">{errors.source}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>
                    Telefon raqamingiz:
                </Label>
                <div className="relative">
                    <Input
                        id="phone"
                        required
                        type="tel"
                        placeholder="+998"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={`pl-4 pr-10 ${errors.phone ? "border-red-500 ring-red-500" : ""}`}
                    />
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="additionalPhone" className={errors.additionalPhone ? "text-red-500" : ""}>
                    Qo`shimcha raqamingiz:
                </Label>
                <Input
                    id="additionalPhone"
                    type="tel"
                    placeholder="+998"
                    value={formData.additionalPhone}
                    onChange={(e) => handleChange("additionalPhone", e.target.value)}
                    className={errors.additionalPhone ? "border-red-500 ring-red-500" : ""}
                />
                {errors.additionalPhone && <p className="text-sm text-red-500 mt-1">{errors.additionalPhone}</p>}
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? "Yuborilmoqda..." : "Ariza qoldirish"}
            </Button>
        </form>
    )
}

