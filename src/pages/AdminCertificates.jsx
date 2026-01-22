import { useState } from "react"
import AdminLayout from "@/layouts/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Download, Award, FileText, Send, CheckCircle2, Clock } from "lucide-react"

export default function AdminCertificates() {
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [certificates, setCertificates] = useState([
    { id: 1, internName: "John Doe", internEmail: "john@example.com", course: "React Development", issueDate: "2024-01-15", status: "initiated", sentDate: null },
    { id: 2, internName: "Jane Smith", internEmail: "jane@example.com", course: "Node.js Backend", issueDate: "2024-01-10", status: "sent", sentDate: "2024-01-10" },
    { id: 3, internName: "Bob Johnson", internEmail: "bob@example.com", course: "Full Stack Development", issueDate: "2024-01-20", status: "initiated", sentDate: null },
    { id: 4, internName: "Alice Williams", internEmail: "alice@example.com", course: "UI/UX Design", issueDate: "2024-01-18", status: "sent", sentDate: "2024-01-18" },
  ])

  const handleSendCertificate = (id) => {
    setCertificates(certificates.map(cert => 
      cert.id === id 
        ? { ...cert, status: "sent", sentDate: new Date().toISOString().split('T')[0] }
        : cert
    ))
  }

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.internName.toLowerCase().includes(search.toLowerCase()) ||
      cert.course.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Certificate Management</h1>
            <p className="text-muted-foreground mt-1.5">
              Initiate and send certificates to interns
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Initiate Certificate
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certificates.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Initiated</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {certificates.filter(c => c.status === "initiated").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent to Interns</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {certificates.filter(c => c.status === "sent").length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="p-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Intern Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Initiated Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {filteredCertificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.internName}</TableCell>
                    <TableCell className="text-muted-foreground">{cert.internEmail}</TableCell>
                    <TableCell>{cert.course}</TableCell>
                    <TableCell>{cert.issueDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        cert.status === "sent"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {cert.status === "sent" ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Sent
                          </>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            Initiated
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {cert.status === "initiated" ? (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleSendCertificate(cert.id)}
                          >
                            <Send className="h-3.5 w-3.5 mr-1" />
                            Send to Intern
                          </Button>
                        ) : (
                          <>
                            <span className="text-xs text-muted-foreground self-center">
                              Sent: {cert.sentDate}
                            </span>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Initiate New Certificate</DialogTitle>
            </DialogHeader>
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.target
                const newCert = {
                  id: certificates.length + 1,
                  internName: form.internName.value,
                  internEmail: form.internEmail.value,
                  course: form.course.value,
                  issueDate: form.issueDate.value,
                  status: "initiated",
                  sentDate: null,
                }
                setCertificates([...certificates, newCert])
                setOpen(false)
                form.reset()
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Intern Name</Label>
                <Select name="internName" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select intern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                    <SelectItem value="Alice Williams">Alice Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Intern Email</Label>
                <Input 
                  name="internEmail" 
                  type="email" 
                  placeholder="intern@example.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label>Course/Program</Label>
                <Input name="course" placeholder="Enter course name" required />
              </div>
              <div className="space-y-2">
                <Label>Initiate Date</Label>
                <Input name="issueDate" type="date" defaultValue={new Date().toISOString().split('T')[0]} required />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Initiate Certificate</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}

