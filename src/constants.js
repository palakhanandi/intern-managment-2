import {
  Home,
  Users,
  ClipboardList,
  FileBadge,
  BarChart3,
  Settings,
  LayoutDashboard,
  CalendarCheck,
  Award,
  BookOpen,
  LifeBuoy,
} from "lucide-react"

export const internMenu = [
  { label: "Home", icon: LayoutDashboard, path: "/intern" },
  { label: "Tasks", icon: ClipboardList, path: "/intern/tasks" },
  { label: "Attendance", icon: CalendarCheck, path: "/intern/attendance" },
  { label: "Learning Resources", icon: BookOpen, path: "/intern/resources" },
  { label: "Certificates", icon: Award, path: "/intern/certificates" },
  { label: "Support", icon: LifeBuoy, path: "/intern/support" },
  { label: "Settings", icon: Settings, path: "/intern/settings" },
]

export const adminMenu = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: Home,
  },
  {
    label: "Intern Management",
    path: "/admin/interns",
    icon: Users,
  },
  {
    label: "Tasks",
    path: "/admin/tasks",
    icon: ClipboardList,
  },
  {
    label: "Attendance",
    path: "/admin/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Certificates",
    path: "/admin/certificates",
    icon: FileBadge,
  },
  {
    label: "Reports & Analytics",
    path: "/admin/reports",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
]
