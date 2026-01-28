import { useEffect, useState } from "react"
import InternLayout from "@/layouts/InternLayout"
import { supabase } from "@/lib/supabase"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  BookOpen,
  Download,
  ExternalLink,
  Search,
  Video,
  FileText,
  Code,
} from "lucide-react"

const iconMap = {
  documentation: FileText,
  video: Video,
  code: Code,
}

export default function InternResources() {
  const [resources, setResources] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResources()
  }, [])

  async function fetchResources() {
    const { data, error } = await supabase
      .from("learning_resources")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setResources(data)
    setLoading(false)
  }

  const filteredResources = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <InternLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Learning Resources
          </h1>
          <p className="text-muted-foreground">
            Access study materials, tutorials, and documentation
          </p>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Card>

        {/* Resources */}
        {loading ? (
          <p className="text-muted-foreground">Loading resources...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => {
              const Icon = iconMap[resource.type] || FileText

              return (
                <Card
                  key={resource.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-muted">
                        {resource.category}
                      </span>
                    </div>

                    <CardTitle className="mt-4">
                      {resource.title}
                    </CardTitle>
                    <CardDescription>
                      {resource.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex gap-2">
                      {resource.download_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          asChild
                        >
                          <a href={resource.download_url} download>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      )}

                      {resource.external_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={resource.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Frontend", "Backend", "Design", "DevOps"].map((cat) => (
                <Button
                  key={cat}
                  variant="outline"
                  className="h-20"
                  onClick={() => setSearch(cat)}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  {cat}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InternLayout>
  )
}

