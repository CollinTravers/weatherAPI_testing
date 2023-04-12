import './globals.css'

export const metadata = {
  title: 'Weather On Demand',
  description: 'Simple weather website that incorperates a weather API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  )
}
