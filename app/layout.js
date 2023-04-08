import './globals.css'

export const metadata = {
  title: 'Food Without a Story',
  description: 'Recipes without page long stories',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
