import { NavLink } from "react-router-dom"


export default function Sidebar({ title, menu = [] }) {
  return (
    <aside className="w-64 border-r bg-white h-screen flex flex-col">
      {/* Title */}
      <div className="px-6 py-5 text-xl font-semibold">
        {title}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
               ${
                 isActive
                   ? "bg-muted font-medium"
                   : "text-muted-foreground hover:bg-muted"
               }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label} 
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-6 py-4 text-sm text-muted-foreground">
        Logout
      </div>
    </aside>
  )
}



