import './globals.css'
import Sidebar from '@/components/nav/Sidebar'
import Topbar from '@/components/nav/Topbar'

export const metadata = {
  title: 'Softourtech Admin',
  description: 'Premium admin for Softourtech',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="grid min-h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
          <Sidebar />
          <div className="col-start-2 row-start-1 row-end-3">
            <Topbar title="Admin" />
            <main className="container-xl py-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
