import { useState } from "react"
import InternLayout from "@/layouts/InternLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react"

export default function InternAttendance() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  
  const attendanceData = [
    { date: "2024-01-01", status: "present", checkIn: "09:00 AM", checkOut: "06:00 PM" },
    { date: "2024-01-02", status: "present", checkIn: "09:15 AM", checkOut: "05:45 PM" },
    { date: "2024-01-03", status: "present", checkIn: "08:45 AM", checkOut: "06:30 PM" },
    { date: "2024-01-04", status: "absent", checkIn: "-", checkOut: "-" },
    { date: "2024-01-05", status: "present", checkIn: "09:00 AM", checkOut: "06:00 PM" },
    { date: "2024-01-06", status: "present", checkIn: "09:10 AM", checkOut: "05:50 PM" },
    { date: "2024-01-07", status: "present", checkIn: "08:50 AM", checkOut: "06:15 PM" },
  ]

  const presentCount = attendanceData.filter(a => a.status === "present").length
  const absentCount = attendanceData.filter(a => a.status === "absent").length
  const attendanceRate = Math.round((presentCount / attendanceData.length) * 100)

  return (
    <InternLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track your daily attendance and check-in/out times
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Days</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{absentCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{attendanceRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Check-in */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-lg font-semibold mt-1">Present</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Check In</p>
                <p className="text-lg font-semibold mt-1">09:00 AM</p>
              </div>
              <Button>Check Out</Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceData.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      record.status === "present" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {record.status === "present" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.status === "present" 
                          ? `Check In: ${record.checkIn} | Check Out: ${record.checkOut}`
                          : "Absent"
                        }
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    record.status === "present"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {record.status === "present" ? "Present" : "Absent"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InternLayout>
  )
}

