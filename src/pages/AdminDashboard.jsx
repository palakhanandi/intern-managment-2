import { useEffect, useState } from "react"
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
import { supabase } from "@/lib/supabase"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    interns: 0,
    tasks: 0,
    attendanceRate: 0,
    certificates: 0,
    presentToday: 0,
  })

  const today = new Date().toISOString().split("T")[0]

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    /* ---------- TOTAL INTERNS ---------- */
    const { count: internCount } = await supabase
      .from("interns")
      .select("*", { count: "exact", head: true })

    /* ---------- ACTIVE TASKS ---------- */
    const { count: taskCount } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("status", "Active")

    /* ---------- ATTENDANCE TODAY ---------- */
    const { data: attendanceToday } = await supabase
      .from("attendance")
      .select("status")
      .eq("date", today)

    const presentCount =
      attendanceToday?.filter(a => a.status === "Present").length || 0

    const attendanceRate =
      internCount > 0 ? Math.round((presentCount / internCount) * 100) : 0

    /* ---------- CERTIFICATES ---------- */
    const { count: certificateCount } = await supabase
      .from("certificates")
      .select("*", { count: "exact", head: true })

    setStats({
      interns: internCount || 0,
      tasks: taskCount || 0,
      attendanceRate,
      certificates: certificateCount || 0,
      presentToday: presentCount,
    })
  }

  const statCards = [
    {
      label: "Total Interns",
      value: stats.interns,
      icon: Users,
      trend: "+",
    },
    {
      label: "Active Tasks",
      value: stats.tasks,
      icon: ClipboardList,
      trend: "+",
    },
    {
      label: "Attendance Rate",
      value: `${stats.attendanceRate}%`,
      icon: CalendarCheck,
      trend: "+",
    },
    {
      label: "Certificates Issued",
      value: stats.certificates,
      icon: Award,
      trend: "+",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Admin 👋 Overview of your intern management system
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map(stat => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  Live data
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

        {/* Activity Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Task #{i}</p>
                    <p className="text-xs text-muted-foreground">
                      Assigned to intern
                    </p>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Present Today</span>
                <span className="text-sm font-semibold">
                  {stats.presentToday}/{stats.interns}
                </span>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${stats.attendanceRate}%` }}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>
                  {stats.interns - stats.presentToday} interns absent
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

