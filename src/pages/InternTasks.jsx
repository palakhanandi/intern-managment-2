import { useEffect, useState } from "react"
import InternLayout from "@/layouts/InternLayout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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

import { supabase } from "@/lib/supabase"
import { useAuth } from "@/AuthContext"

export default function InternTasks() {
  const { user } = useAuth()

  const [tasks, setTasks] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (user?.email) {
      fetchInternAndTasks(user.email)
    }
  }, [user])

  const fetchInternAndTasks = async (email) => {
    setLoading(true)

    // ✅ Get intern by email
    const { data: intern, error: internError } = await supabase
      .from("interns")
      .select("id")
      .eq("email", email)
      .single()

    if (internError || !intern) {
      console.error("Intern fetch error:", internError)
      setLoading(false)
      return
    }

    // ✅ Get tasks by intern_id
    const { data, error } = await supabase
      .from("tasks")
      .select("id, title, due_date, completed, description")
      .eq("intern_id", intern.id)
      .order("due_date")

    if (error) {
      console.error("Tasks fetch error:", error)
    }

    setTasks(data || [])
    setLoading(false)
  }

  // ✅ Mark completed
  const markCompleted = async (taskId) => {
    await supabase
      .from("tasks")
      .update({ completed: true })
      .eq("id", taskId)

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: true } : t
      )
    )
  }

  // ✅ Save description
  const saveDescription = async () => {
    await supabase
      .from("tasks")
      .update({ description })
      .eq("id", selectedTask.id)

    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id ? { ...t, description } : t
      )
    )

    setOpen(false)
    setDescription("")
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <InternLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>

        <Card className="p-4">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Tasks: {filteredTasks.length}</CardTitle>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p>Loading tasks...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.due_date}</TableCell>

                      <TableCell>
                        {task.completed ? (
                          <span className="text-green-600">Completed</span>
                        ) : (
                          <span className="text-orange-500">Pending</span>
                        )}
                      </TableCell>

                      {/* DESCRIPTION BUTTON */}
                      <TableCell>
                        <Button
                          size="sm"
                          className={
                            task.description
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-emerald-600 hover:bg-emerald-700 text-white"
                          }
                          onClick={() => {
                            setSelectedTask(task)
                            setDescription(task.description || "")
                            setOpen(true)
                          }}
                        >
                          {task.description ? "Edit" : "Add"}
                        </Button>
                      </TableCell>

                      {/* ACTION */}
                      <TableCell className="text-right">
                        {!task.completed && (
                          <Button
                            size="sm"
                            onClick={() => markCompleted(task.id)}
                          >
                            Mark Completed
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* DESCRIPTION MODAL */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Task Description</DialogTitle>
            </DialogHeader>

            <textarea
              className="w-full min-h-[120px] border rounded p-2"
              placeholder="Describe your work..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button onClick={saveDescription}>Save</Button>
          </DialogContent>
        </Dialog>
      </div>
    </InternLayout>
  )
}


