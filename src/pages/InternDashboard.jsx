import InternLayout from "@/layouts/InternLayout"
import DashboardCard from "@/components/DashboardCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  ClipboardList,
  CalendarCheck,
  BookOpen,
  Award,
  LifeBuoy,
  Settings,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react"

export default function InternDashboard() {
  const stats = [
    { label: "Completed Tasks", value: "12/15", icon: CheckCircle2, color: "text-green-500" },
    { label: "Pending Tasks", value: "3", icon: Clock, color: "text-yellow-500" },
    { label: "Attendance", value: "95%", icon: CalendarCheck, color: "text-blue-500" },
    { label: "Certificates", value: "2", icon: Award, color: "text-purple-500" },
  ]

  return (
    <InternLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Intern 👋 Here's your progress overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              description="Manage your preferences"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Complete React Project", status: "In Progress" },
                  { title: "Review Documentation", status: "Completed" },
                  { title: "Submit Weekly Report", status: "Pending" },
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.status}</p>
                    </div>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Week's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm">{day}</span>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${i < 4 ? "bg-green-500" : "bg-gray-300"}`}></div>
                      <span className="text-sm text-muted-foreground">{i < 4 ? "Present" : "Absent"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </InternLayout>
  )
}
