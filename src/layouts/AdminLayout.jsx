import Sidebar from "@/components/Sidebar"
import { adminMenu } from "@/constants"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar title="Admin Panel" menu={adminMenu} />

      {/* Content */}
      <main className="flex-1 px-6 sm:px-8 lg:px-10 py-6 sm:py-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
