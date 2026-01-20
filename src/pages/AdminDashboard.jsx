import AdminLayout from "@/layouts/AdminLayout"
import DashboardCard from "@/components/DashboardCard"

import {
  Users,
  Search,
  ClipboardList,
  CalendarCheck,
  Award,
  BarChart3,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="mt-1 text-muted-foreground">
        Welcome back, Admin 👋
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          icon={Users}
          title="Intern Management"
          description="Add, update, view and remove interns"
        />
        <DashboardCard
          icon={Search}
          title="Search User"
          description="Quickly find interns by name or email"
        />
        <DashboardCard
          icon={ClipboardList}
          title="Task Management"
          description="Assign and track intern tasks"
        />
        <DashboardCard
          icon={CalendarCheck}
          title="Attendance Tracking"
          description="Monitor daily intern attendance"
        />
        <DashboardCard
          icon={Award}
          title="Certificate Management"
          description="Generate and issue certificates"
        />
        <DashboardCard
          icon={BarChart3}
          title="Reports & Analytics"
          description="Track performance & execution"
        />
      </div>
    </AdminLayout>
  )
}
