import AdminLayout from "@/layouts/AdminLayout"
import DashboardCard from "@/components/DashboardCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  ClipboardList,
  CalendarCheck,
  Award,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
} from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Interns", value: "24", icon: Users, trend: "+12%" },
    { label: "Active Tasks", value: "18", icon: ClipboardList, trend: "+5" },
    { label: "Attendance Rate", value: "94%", icon: CalendarCheck, trend: "+2%" },
    { label: "Certificates Issued", value: "15", icon: Award, trend: "+3" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin 👋 Overview of your intern management system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              icon={Users}
              title="Intern Management"
              description="Add, update, view and remove interns"
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
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ClipboardList className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Task #{i}</p>
                      <p className="text-xs text-muted-foreground">Assigned to intern</p>
                    </div>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Present Today</span>
                  <span className="text-sm font-semibold">22/24</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>2 interns absent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
