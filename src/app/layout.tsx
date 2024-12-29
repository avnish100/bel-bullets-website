import './globals.css'
import { Roboto } from 'next/font/google'
import { Merriweather } from 'next/font/google'
import { Header } from '@/components/header'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '500'
})




export const metadata = {
  title: 'Bel Bullets Run Club',
  description: 'Join our running community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${roboto.className} bg-black`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

