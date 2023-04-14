import './globals.css'

import { Roboto } from 'next/font/google'

export const metadata = {
  title: 'Weather On Demand',
  description: 'Simple weather website that incorperates a weather API',
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--roboto-font',
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} bg-sky-100`}>{children}</body>
    </html>
  )
}
