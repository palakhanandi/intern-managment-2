import { useEffect, useState } from "react"
import InternLayout from "@/layouts/InternLayout"
import DashboardCard from "@/components/DashboardCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/AuthContext"
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
} from "lucide-react"

export default function InternDashboard() {
  const { user } = useAuth()
  const firebase_uid = user?.uid

  const [internId, setInternId] = useState(null)
  const [tasks, setTasks] = useState([])
  const [attendance, setAttendance] = useState([])

  /* ---------------- GET INTERN ID ---------------- */
  const fetchInternId = async () => {
    const { data, error } = await supabase
      .from("interns")
      .select("id")
      .eq("firebase_uid", firebase_uid)
      .single()

    if (!error) setInternId(data.id)
  }

  /* ---------------- FETCH TASKS ---------------- */
  const fetchTasks = async (id) => {
    const { data } = await supabase
      .from("tasks")
      .select("id, title, status")
      .eq("intern_id", id)
      .order("created_at", { ascending: false })

    setTasks(data || [])
  }

  /* ---------------- FETCH ATTENDANCE ---------------- */
  const fetchAttendance = async (id) => {
    const { data } = await supabase
      .from("attendance")
      .select("date, status")
      .eq("intern_id", id)
      .order("date", { ascending: false })

    setAttendance(data || [])
  }

  useEffect(() => {
    if (firebase_uid) fetchInternId()
  }, [firebase_uid])

  useEffect(() => {
    if (internId) {
      fetchTasks(internId)
      fetchAttendance(internId)
    }
  }, [internId])

  /* ---------------- STATS ---------------- */
  const completedTasks = tasks.filter(t => t.status === "Completed").length
  const pendingTasks = tasks.filter(t => t.status !== "Completed").length
  const presentDays = attendance.filter(a => a.status === "Present").length
  const attendanceRate = attendance.length
    ? Math.round((presentDays / attendance.length) * 100)
    : 0

  const stats = [
    { label: "Completed Tasks", value: `${completedTasks}/${tasks.length}`, icon: CheckCircle2, color: "text-green-500" },
    { label: "Pending Tasks", value: pendingTasks, icon: Clock, color: "text-yellow-500" },
    { label: "Attendance", value: `${attendanceRate}%`, icon: CalendarCheck, color: "text-blue-500" },
    { label: "Certificates", value: "—", icon: Award, color: "text-purple-500" },
  ]

  return (
    <InternLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back 👋 Here’s your progress overview
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map(stat => (
            <Card key={stat.label}>
              <CardHeader className="flex justify-between pb-2">
                <CardTitle className="text-sm">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* QUICK ACCESS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardCard icon={User} title="Profile" description="View your profile" />
            <DashboardCard icon={ClipboardList} title="Tasks" description="View assigned tasks" />
            <DashboardCard icon={CalendarCheck} title="Attendance" description="Daily attendance" />
            <DashboardCard icon={BookOpen} title="Learning Resources" description="Study material" />
            <DashboardCard icon={Award} title="Certificates" description="Your certificates" />
            <DashboardCard icon={LifeBuoy} title="Support" description="Get help" />
            <DashboardCard icon={Settings} title="Settings" description="Preferences" />
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* TASKS */}
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No tasks assigned</p>
              ) : (
                tasks.slice(0, 5).map(task => (
                  <div key={task.id} className="flex justify-between border p-3 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.status}</p>
                    </div>
                    <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* ATTENDANCE */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {attendance.slice(0, 5).map((a, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-sm">
                    {new Date(a.date).toDateString()}
                  </span>
                  <span className={`text-sm font-medium ${
                    a.status === "Present" ? "text-green-600" : "text-red-600"
                  }`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </InternLayout>
  )
}

