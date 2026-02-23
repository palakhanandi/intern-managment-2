import { useEffect, useState } from "react"
import InternLayout from "@/layouts/InternLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download, Calendar, CheckCircle2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/AuthContext"

export default function InternCertificates() {
  const { user } = useAuth()

  const [intern, setIntern] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.email) return

        // 1️⃣ Fetch Intern by EMAIL
        const { data: internData, error: internError } = await supabase
          .from("interns")
          .select("*")
          .eq("email", user.email)
          .single()

        if (internError) throw internError

        setIntern(internData)

        // 2️⃣ Fetch Certificates
        const { data: certData, error: certError } = await supabase
          .from("certificates")
          .select("*")
          .eq("intern_id", internData.id)
          .order("created_at", { ascending: false })

        if (certError) throw certError

        setCertificates(certData || [])

      } catch (err) {
        console.error("Error fetching certificates:", err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (loading) {
    return (
      <InternLayout>
        <p className="text-muted-foreground">Loading certificate...</p>
      </InternLayout>
    )
  }

  if (!intern) {
    return (
      <InternLayout>
        <p className="text-muted-foreground">Intern not found</p>
      </InternLayout>
    )
  }

  const latestCertificate = certificates[0]

  return (
    <InternLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Internship Certificate
          </h1>
          <p className="text-muted-foreground">
            Certificate issued by admin
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {certificates.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  latestCertificate?.status === "sent"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {latestCertificate?.status || "No Certificate"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {intern.duration}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Card */}
        {latestCertificate && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary" />
                  </div>

                  <div>
                    <CardTitle className="text-xl">
                      Internship Certificate
                    </CardTitle>

                    <p className="text-sm text-muted-foreground mt-1">
                      {intern.domain}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Issued Date: {latestCertificate.issued_date}
                        </span>
                      </div>
                      <span>Duration: {intern.duration}</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                    latestCertificate.status === "sent"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {latestCertificate.status}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Issued to {intern.name} ({intern.email})
              </p>

              <Button
                disabled={!latestCertificate.pdf_url}
                onClick={() =>
                  window.open(latestCertificate.pdf_url, "_blank")
                }
              >
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </InternLayout>
  )
}


