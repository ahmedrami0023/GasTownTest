import './globals.css'

export const metadata = {
  title: 'Grocery List',
  description: 'A simple grocery list app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}