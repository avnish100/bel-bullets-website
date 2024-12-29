import Link from "next/link";

export default function ConfirmEmail() {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow text-center">
          <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
          <p className="text-gray-600">
            We've sent you an email with a link to confirm your account. Please check your inbox and click the link to complete your registration.
          </p>
          <div className="mt-4">
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Return to login
            </Link>
          </div>
        </div>
      </div>
    )
  }