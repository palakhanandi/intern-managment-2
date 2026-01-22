import InternLayout from "@/layouts/InternLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Download, ExternalLink, Search, Video, FileText, Code } from "lucide-react"

export default function InternResources() {
  const resources = [
    {
      id: 1,
      title: "React Documentation",
      type: "documentation",
      description: "Complete guide to React framework",
      category: "Frontend",
      icon: FileText,
    },
    {
      id: 2,
      title: "Node.js Tutorial Series",
      type: "video",
      description: "Learn Node.js from scratch",
      category: "Backend",
      icon: Video,
    },
    {
      id: 3,
      title: "JavaScript Best Practices",
      type: "documentation",
      description: "Essential JavaScript patterns and practices",
      category: "Frontend",
      icon: Code,
    },
    {
      id: 4,
      title: "Database Design Fundamentals",
      type: "video",
      description: "Understanding database concepts",
      category: "Backend",
      icon: Video,
    },
    {
      id: 5,
      title: "API Development Guide",
      type: "documentation",
      description: "RESTful API development guide",
      category: "Backend",
      icon: FileText,
    },
    {
      id: 6,
      title: "UI/UX Design Principles",
      type: "video",
      description: "Learn design fundamentals",
      category: "Design",
      icon: Video,
    },
  ]

  return (
    <InternLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
          <p className="text-muted-foreground">
            Access study materials, tutorials, and documentation
          </p>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
            />
          </div>
        </Card>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <resource.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {resource.category}
                  </span>
                </div>
                <CardTitle className="mt-4">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Browse by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Frontend", "Backend", "Design", "DevOps"].map((category) => (
                <Button key={category} variant="outline" className="h-20">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InternLayout>
  )
}

