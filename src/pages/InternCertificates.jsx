import InternLayout from "@/layouts/InternLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, FileText, Calendar, Bell, CheckCircle2, Inbox } from "lucide-react"

export default function InternCertificates() {
  const certificates = [
    {
      id: 1,
      title: "React Development Certificate",
      course: "Complete React Development Course",
      receivedDate: "2024-01-10",
      initiatedDate: "2024-01-10",
      status: "received",
      isNew: false,
    },
    {
      id: 2,
      title: "Node.js Backend Certificate",
      course: "Node.js and Express.js Mastery",
      receivedDate: "2024-01-18",
      initiatedDate: "2024-01-18",
      status: "received",
      isNew: true,
    },
    {
      id: 3,
      title: "UI/UX Design Certificate",
      course: "UI/UX Design Fundamentals",
      receivedDate: "2024-01-15",
      initiatedDate: "2024-01-15",
      status: "received",
      isNew: false,
    },
  ]

  const receivedCount = certificates.filter(c => c.status === "received").length
  const newCertificatesCount = certificates.filter(c => c.isNew).length

  return (
    <InternLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
              <p className="text-muted-foreground">
                Certificates received from admin
              </p>
            </div>
            {newCertificatesCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                <Bell className="h-4 w-4" />
                <span className="text-sm font-medium">{newCertificatesCount} New</span>
              </div>
            )}
          </div>
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
              <CardTitle className="text-sm font-medium">Received</CardTitle>
              <Inbox className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{receivedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Certificates</CardTitle>
              <Bell className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{newCertificatesCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        <div className="grid gap-4">
          {certificates.map((cert) => (
            <Card 
              key={cert.id} 
              className={`hover:shadow-lg transition-shadow ${cert.isNew ? 'border-primary border-2' : ''}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-16 w-16 rounded-lg flex items-center justify-center ${
                      cert.isNew ? 'bg-primary/20' : 'bg-primary/10'
                    }`}>
                      <Award className={`h-8 w-8 ${cert.isNew ? 'text-primary' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{cert.title}</CardTitle>
                        {cert.isNew && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{cert.course}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Inbox className="h-4 w-4" />
                          <span>Received: {cert.receivedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Initiated: {cert.initiatedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Received
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Certificate sent by admin on {cert.receivedDate}
                  </p>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </InternLayout>
  )
}

