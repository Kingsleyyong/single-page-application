import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './lib/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
      title: 'Single Page Application',
      description: '',
}

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode
}>) {
      return (
            <html lang="en">
                  <body
                        className={inter.className}
                        suppressHydrationWarning={true}
                  >
                        <Providers>{children}</Providers>
                  </body>
            </html>
      )
}
