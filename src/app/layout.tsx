import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   title: 'ChatGPT Clone',
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="pt-BR">
         <body className={inter.className}>{children}</body>
      </html>
   )
}
