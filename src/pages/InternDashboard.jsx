import InternLayout from "@/layouts/InternLayout"
import DashboardCard from "@/components/DashboardCard"
import {
  User,
  ClipboardList,
  CalendarCheck,
  BookOpen,
  Award,
  LifeBuoy,
  Settings,
} from "lucide-react"

export default function InternDashboard() {
  return (
    <InternLayout>
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="mt-1 text-muted-foreground">
        Welcome back, Intern 👋
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          icon={User}
          title="Profile"
          description="View and update your profile information"
        />
        <DashboardCard
          icon={ClipboardList}
          title="Task Section"
          description="See all tasks assigned by admin"
        />
        <DashboardCard
          icon={CalendarCheck}
          title="Attendance"
          description="Track your attendance daily"
        />
        <DashboardCard
          icon={BookOpen}
          title="Learning Resources"
          description="Access study materials and tutorials"
        />
        <DashboardCard
          icon={Award}
          title="Certificate"
          description="View and download your certificates"
        />
        <DashboardCard
          icon={LifeBuoy}
          title="Support"
          description="Get help and contact support"
        />
        <DashboardCard
          icon={Settings}
          title="Settings"
          description="Manage your preferences (optional)"
        />
      </div>
    </InternLayout>
  )
}
