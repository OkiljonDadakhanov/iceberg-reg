import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Image from 'next/image'

export default function SuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="flex justify-center mb-4">
                    <Image src="/logo/logo.png" width={150} height={50} alt="Logo" className="priority" loading="lazy" />
                </div>
                <div className="flex justify-center mb-6">
                    <CheckCircle2 className="h-24 w-24 text-green-500" />
                </div>

                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">ARIZA TOPSHIRILDI</h1>
                <p className="text-xl text-green-500 font-medium mb-8">Sizning arizangiz qabul qilindi!</p>
                <Link href="/">
                    <Button className="w-full bg-green-600 hover:bg-green-700 cursor-pointer">Saytga qaytish</Button>
                </Link>
            </div>
        </div>
    )
}

