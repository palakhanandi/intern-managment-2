import { useEffect, useState } from "react"
import AdminLayout from "@/layouts/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, CheckCircle2, XCircle, Calendar } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AdminAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [search, setSearch] = useState("")
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)

  // 🔹 Fetch attendance for selected date
  const fetchAttendance = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("attendance")
      .select(`
        id,
        status,
        check_in,
        check_out,
        firebase_uid,
        interns (
          name,
          email
        )
      `)
      .eq("date", date)

    if (!error) {
      setAttendance(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchAttendance()
  }, [date])

  // 🔍 Search filter
  const filteredAttendance = attendance.filter(record =>
    record.interns?.name?.toLowerCase().includes(search.toLowerCase()) ||
    record.interns?.email?.toLowerCase().includes(search.toLowerCase())
  )

  // 📊 Stats
  const totalInterns = attendance.length
  const presentCount = attendance.filter(a => a.status === "Present").length
  const absentCount = totalInterns - presentCount

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Tracking</h1>
          <p className="text-muted-foreground mt-1.5">
            Monitor daily intern attendance
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard title="Total Interns" value={totalInterns} icon={Calendar} />
          <StatCard title="Present" value={presentCount} icon={CheckCircle2} color="green" />
          <StatCard title="Absent" value={absentCount} icon={XCircle} color="red" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Card className="p-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          <Card className="p-4">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Card>
        </div>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Loading attendance...
                      </TableCell>
                    </TableRow>
                  )}

                  {!loading && filteredAttendance.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No records found
                      </TableCell>
                    </TableRow>
                  )}

                  {filteredAttendance.map(record => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {record.interns?.name || "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {record.interns?.email || "-"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={record.status} />
                      </TableCell>
                      <TableCell>{record.check_in || "-"}</TableCell>
                      <TableCell>{record.check_out || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

/* ---------- UI Helpers ---------- */

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

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
      status === "Present"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {status === "Present" ? (
      <>
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Present
      </>
    ) : (
      <>
        <XCircle className="h-3 w-3 mr-1" />
        Absent
      </>
    )}
  </span>
)


