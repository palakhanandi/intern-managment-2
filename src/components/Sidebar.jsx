import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogOut } from "lucide-react"
import Logout from "@/components/Logout"

export default function Sidebar({ title, menu = [] }) {
  return (
    <aside className="w-64 border-r bg-card h-screen flex flex-col sticky top-0">
      {/* Title */}
      <div className="px-6 py-6 border-b">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors
               ${isActive
                ? "bg-primary text-primary-foreground font-medium shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>


      <div className="px-3 py-4 border-t">
        <Logout />
      </div>

    </aside>
  )
}



