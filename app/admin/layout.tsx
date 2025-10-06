import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import "../globals.css"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-navy-950">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden pl-64">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}