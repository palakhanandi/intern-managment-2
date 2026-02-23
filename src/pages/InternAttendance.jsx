import { useEffect, useState } from "react"
import InternLayout from "@/layouts/InternLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/AuthContext"

export default function InternAttendance() {
  const { user } = useAuth()

  // 🔥 KEYCLOAK EMAIL FIX
  const userEmail =
    user?.tokenParsed?.email ||
    user?.profile?.email ||
    user?.email ||
    null

  const [attendanceData, setAttendanceData] = useState([])
  const [todayAttendance, setTodayAttendance] = useState(null)
  const [intern, setIntern] = useState(null)
  const [loading, setLoading] = useState(true)

  const today = new Date().toISOString().split("T")[0]

  /* ================= FETCH DATA ================= */
  const fetchAttendance = async () => {
    if (!userEmail) {
      console.log("❌ No email from Keycloak:", user)
      setLoading(false)
      return
    }

    console.log("✅ Logged in email:", userEmail)

    setLoading(true)

    // 🔹 1️⃣ Find Intern by Email (case-insensitive)
    const { data: internData, error: internError } = await supabase
      .from("interns")
      .select("*")
      .ilike("email", userEmail)
      .maybeSingle()

    if (internError) {
      console.error("Intern fetch error:", internError)
      setLoading(false)
      return
    }

    if (!internData) {
      console.error("❌ No intern found with email:", userEmail)
      setLoading(false)
      return
    }

    setIntern(internData)

    // 🔹 2️⃣ Fetch Attendance
    const { data: attendance, error: attendanceError } = await supabase
      .from("attendance")
      .select("*")
      .eq("intern_id", internData.id)
      .order("date", { ascending: false })

    if (attendanceError) {
      console.error("Attendance fetch error:", attendanceError)
    }

    setAttendanceData(attendance || [])
    setTodayAttendance(
      attendance?.find((a) => a.date === today) || null
    )

    setLoading(false)
  }

  useEffect(() => {
    fetchAttendance()
  }, [userEmail])

  /* ================= CHECK IN ================= */
  const handleCheckIn = async () => {
    if (!intern || todayAttendance) return

    const currentTime = new Date()
      .toISOString()
      .split("T")[1]
      .split(".")[0]

    const { error } = await supabase.from("attendance").insert({
      intern_id: intern.id,
      date: today,
      status: "Present",
      check_in: currentTime,
    })

    if (error) {
      console.error("Check-in error:", error)
      return
    }

    fetchAttendance()
  }

  /* ================= CHECK OUT ================= */
  const handleCheckOut = async () => {
    if (!intern) return

    const currentTime = new Date()
      .toISOString()
      .split("T")[1]
      .split(".")[0]

    const { error } = await supabase
      .from("attendance")
      .update({
        check_out: currentTime,
      })
      .eq("intern_id", intern.id)
      .eq("date", today)

    if (error) {
      console.error("Check-out error:", error)
      return
    }

    fetchAttendance()
  }

  /* ================= STATS ================= */
  const presentCount = attendanceData.filter(
    (a) => a.status === "Present"
  ).length

  const absentCount = attendanceData.filter(
    (a) => a.status === "Absent"
  ).length

  const attendanceRate = attendanceData.length
    ? Math.round((presentCount / attendanceData.length) * 100)
    : 0

  if (loading) {
    return (
      <InternLayout>
        <p>Loading attendance...</p>
      </InternLayout>
    )
  }

  return (
    <InternLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">
            Track your daily attendance
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Days" value={attendanceData.length} icon={Calendar} />
          <StatCard title="Present" value={presentCount} icon={CheckCircle2} variant="green" />
          <StatCard title="Absent" value={absentCount} icon={XCircle} variant="red" />
          <StatCard title="Attendance Rate" value={`${attendanceRate}%`} icon={Clock} variant="blue" />
        </div>

        {/* Today */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between flex-wrap gap-4">

              <div>
                <p>Status</p>
                <p className="font-semibold">
                  {todayAttendance?.status || "Not Checked In"}
                </p>
              </div>

              <div>
                <p>Check In</p>
                <p className="font-semibold">
                  {todayAttendance?.check_in || "-"}
                </p>
              </div>

              <div>
                <p>Check Out</p>
                <p className="font-semibold">
                  {todayAttendance?.check_out || "-"}
                </p>
              </div>

              {!todayAttendance && (
                <Button onClick={handleCheckIn}>Check In</Button>
              )}

              {todayAttendance && !todayAttendance.check_out && (
                <Button onClick={handleCheckOut}>Check Out</Button>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </InternLayout>
  )
}

/* ================= UI COMPONENT ================= */

const StatCard = ({ title, value, icon: Icon, variant }) => {
  const colors = {
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-500",
  }

  return (
    <Card>
      <CardHeader className="flex justify-between pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colors[variant] || ""}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colors[variant] || ""}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  )
}


