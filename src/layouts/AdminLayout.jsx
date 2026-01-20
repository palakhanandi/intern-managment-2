import Sidebar from "@/components/Sidebar"
import { adminMenu } from "@/constants"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
            <Sidebar title="Admin Panel" menu={adminMenu} />


      {/* Content */}
      <main className="flex-1 px-10 py-8">
        {children}
      </main>
    </div>
  )
}
