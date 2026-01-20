import Sidebar from "@/components/Sidebar"
import { internMenu } from "@/constants"

export default function InternLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar title="Intern" menu={internMenu} />

      <main className="flex-1 px-10 py-8">
        {children}
      </main>
    </div>
  )
}



