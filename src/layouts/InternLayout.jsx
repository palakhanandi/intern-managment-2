import Sidebar from "@/components/Sidebar"
import { internMenu } from "@/constants"

export default function InternLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar title="Intern" menu={internMenu} />

      <main className="flex-1 px-6 sm:px-8 lg:px-10 py-6 sm:py-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}



