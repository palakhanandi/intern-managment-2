import { useEffect, useState } from "react"
import AdminLayout from "@/layouts/AdminLayout"
import { supabase } from "@/lib/supabase"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import {
  Users,
  ClipboardList,
  CalendarCheck,
  Award,
  TrendingUp,
  BarChart3
} from "lucide-react"

export default function AdminReports() {
  const [period, setPeriod] = useState("month")

  const [totalInterns, setTotalInterns] = useState(0)
  const [activeTasks, setActiveTasks] = useState(0)
  const [attendanceRate, setAttendanceRate] = useState(0)
  const [certificatesIssued, setCertificatesIssued] = useState(0)
  const [taskCompletion, setTaskCompletion] = useState(0)

  useEffect(() => {
    fetchMetrics()
  }, [period])

  const getStartDate = () => {
    const now = new Date()
    if (period === "week") now.setDate(now.getDate() - 7)
    if (period === "month") now.setMonth(now.getMonth() - 1)
    if (period === "year") now.setFullYear(now.getFullYear() - 1)
    return now.toISOString()
  }

  const fetchMetrics = async () => {
    const startDate = getStartDate()
    const startDateOnly = startDate.split("T")[0]

    /* TOTAL INTERNS */
    const { count: internCount } = await supabase
      .from("interns")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startDate)

    setTotalInterns(internCount || 0)

    /* TASKS */
    const { data: tasks } = await supabase
      .from("tasks")
      .select("completed, created_at")
      .gte("created_at", startDate)

    const totalTasks = tasks?.length || 0
    const completedTasks = tasks?.filter(t => t.completed).length || 0

    setActiveTasks(totalTasks - completedTasks)
    setTaskCompletion(
      totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
    )

    /* ATTENDANCE */
    const { data: attendance } = await supabase
      .from("attendance")
      .select("status, date")
      .gte("date", startDateOnly)

    const present = attendance?.filter(a => a.status === "Present").length || 0
    const totalAttendance = attendance?.length || 0

    setAttendanceRate(
      totalAttendance
        ? Math.round((present / totalAttendance) * 100)
        : 0
    )

    /* CERTIFICATES */
    const { count: certCount } = await supabase
      .from("certificates")
      .select("*", { count: "exact", head: true })
      .eq("status", "sent")
      .gte("created_at", startDate)

    setCertificatesIssued(certCount || 0)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Track performance and generate insights
            </p>
          </div>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* METRICS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Interns" value={totalInterns} icon={<Users />} />
          <MetricCard title="Active Tasks" value={activeTasks} icon={<ClipboardList />} />
          <MetricCard
            title="Attendance Rate"
            value={`${attendanceRate}%`}
            icon={<CalendarCheck />}
          />
          <MetricCard
            title="Certificates Issued"
            value={certificatesIssued}
            icon={<Award />}
          />
        </div>

        {/* CHART PLACEHOLDERS */}
        <div className="grid gap-4 md:grid-cols-2">
          <ChartCard
            title="Task Completion Rate"
            value={`${taskCompletion}% completion`}
          />
          <ChartCard
            title="Attendance Trend"
            value={`${attendanceRate}% average attendance`}
          />
        </div>

        {/* PERFORMANCE OVERVIEW */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProgressBar label="Task Completion" value={taskCompletion} />
            <ProgressBar label="Attendance" value={attendanceRate} />
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  )
}

/* ---------- COMPONENTS ---------- */

function MetricCard({ title, value, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <TrendingUp className="h-3 w-3 text-green-500" />
          Live & filtered
        </p>
      </CardContent>
    </Card>
  )
}

function ChartCard({ title, value }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Chart visualization</p>
            <p className="text-xs text-muted-foreground mt-1">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-muted h-2 rounded">
        <div
          className="bg-primary h-2 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
