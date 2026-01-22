import { useState } from "react"
import InternLayout from "@/layouts/InternLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, CheckCircle2, Clock, FileText } from "lucide-react"

export default function InternTasks() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  
  const tasks = [
    { id: 1, title: "Complete React Project", description: "Build a todo app using React", status: "in-progress", dueDate: "2024-01-15", priority: "high" },
    { id: 2, title: "Review Documentation", description: "Review and update project docs", status: "completed", dueDate: "2024-01-10", priority: "medium" },
    { id: 3, title: "Submit Weekly Report", description: "Submit weekly progress report", status: "pending", dueDate: "2024-01-20", priority: "low" },
    { id: 4, title: "Code Review", description: "Review team member's code", status: "pending", dueDate: "2024-01-18", priority: "medium" },
  ]

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                         task.description.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || task.status === filter
    return matchesSearch && matchesFilter
  })

  const completedCount = tasks.filter(t => t.status === "completed").length
  const pendingCount = tasks.filter(t => t.status === "pending" || t.status === "in-progress").length

  return (
    <InternLayout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
          <p className="text-muted-foreground">
            View and manage all your assigned tasks
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Card className="p-4 flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>
          <Card className="p-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    task.status === "completed" ? "bg-green-100 text-green-800" :
                    task.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {task.status === "completed" ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </>
                    ) : task.status === "in-progress" ? (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        In Progress
                      </>
                    ) : (
                      "Pending"
                    )}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Due: {task.dueDate}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.priority === "high" ? "bg-red-100 text-red-800" :
                      task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {task.priority} priority
                    </span>
                  </div>
                  {task.status !== "completed" && (
                    <Button size="sm">Mark Complete</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </InternLayout>
  )
}

