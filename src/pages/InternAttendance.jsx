import { useEffect, useState } from "react"
import InternLayout from "@/layouts/InternLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { getAuth } from "firebase/auth"

export default function InternAttendance() {
  const [attendanceData, setAttendanceData] = useState([])
  const [todayAttendance, setTodayAttendance] = useState(null)
  const [intern, setIntern] = useState(null)
  const [loading, setLoading] = useState(true)

  const auth = getAuth()
  const user = auth.currentUser
  const firebase_uid = user?.uid

  const today = new Date().toISOString().split("T")[0]

  // 🔹 Fetch intern + attendance
  const fetchAttendance = async () => {
    if (!firebase_uid) return

    setLoading(true)

    // 1️⃣ Get intern record
    const { data: internData } = await supabase
      .from("interns")
      .select("*")
      .eq("firebase_uid", firebase_uid)
      .single()

    setIntern(internData)

    // 2️⃣ Get attendance
    const { data: attendance } = await supabase
      .from("attendance")
      .select("*")
      .eq("firebase_uid", firebase_uid)
      .order("date", { ascending: false })

    setAttendanceData(attendance || [])
    setTodayAttendance(attendance?.find(a => a.date === today) || null)

    setLoading(false)
  }

  useEffect(() => {
    fetchAttendance()
  }, [firebase_uid])

  // 🔹 Check In
  const handleCheckIn = async () => {
    if (!intern) return

    await supabase.from("attendance").insert({
      intern_id: intern.id,
      firebase_uid: firebase_uid,
      date: today,
      status: "Present",
      check_in: new Date().toLocaleTimeString("en-GB")
    })

    fetchAttendance()
  }

  // 🔹 Check Out
  const handleCheckOut = async () => {
    await supabase
      .from("attendance")
      .update({
        check_out: new Date().toLocaleTimeString("en-GB")
      })
      .eq("firebase_uid", firebase_uid)
      .eq("date", today)

    fetchAttendance()
  }

  // 🔹 Stats
  const presentCount = attendanceData.filter(a => a.status === "Present").length
  const absentCount = attendanceData.filter(a => a.status === "Absent").length
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
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track your daily attendance and check-in/out times
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard title="Total Days" value={attendanceData.length} icon={Calendar} />
          <StatCard title="Present" value={presentCount} icon={CheckCircle2} color="green" />
          <StatCard title="Absent" value={absentCount} icon={XCircle} color="red" />
          <StatCard title="Attendance Rate" value={`${attendanceRate}%`} icon={Clock} color="blue" />
        </div>

        {/* Today's Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold mt-1">
                  {todayAttendance?.status || "Not Checked In"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Check In</p>
                <p className="text-lg font-semibold mt-1">
                  {todayAttendance?.check_in || "-"}
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

        {/* Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceData.map(record => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <StatusIcon status={record.status} />
                    <div>
                      <p className="font-medium">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {record.status === "Present"
                          ? `Check In: ${record.check_in || "-"} | Check Out: ${record.check_out || "-"}`
                          : "Absent"}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={record.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InternLayout>
  )
}

/* ---------- Small UI helpers ---------- */

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-${color ?? "muted-foreground"}`} />
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold text-${color ?? "foreground"}`}>
        {value}
      </div>
    </CardContent>
  </Card>
)

const StatusIcon = ({ status }) => (
  <div
    className={`h-10 w-10 rounded-full flex items-center justify-center ${
      status === "Present" ? "bg-green-100" : "bg-red-100"
    }`}
  >
    {status === "Present" ? (
      <CheckCircle2 className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    )}
  </div>
)

const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      status === "Present"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {status}
  </span>
)

