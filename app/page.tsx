import RegistrationForm from "@/components/registration-form"
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-center mb-4">
          <Image src="/logo/logo.png" width={150} height={50} alt="Logo" className="priority" loading="lazy" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">ARIZA TOPSHIRISH</h1>
        <RegistrationForm />
      </div>
    </div>
  )
}

