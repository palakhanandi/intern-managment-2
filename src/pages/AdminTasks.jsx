import { useEffect, useState } from "react"
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
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Pencil, Trash2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AdminTasks() {
  const [tasks, setTasks] = useState([])
  const [interns, setInterns] = useState([])
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const [form, setForm] = useState({
    title: "",
    intern_id: "",
    due_date: "",
  })

  useEffect(() => {
    fetchTasks()
    fetchInterns()
  }, [])

  // 🔥 Fetch tasks WITH status & description
  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select(`
        id,
        title,
        due_date,
        completed,
        description,
        intern_id,
        interns (
          id,
          name
        )
      `)
      .order("created_at", { ascending: false })

    if (error) console.error(error)
    else setTasks(data || [])
  }

  // Fetch interns for dropdown
  async function fetchInterns() {
    const { data, error } = await supabase
      .from("interns")
      .select("id, name")

    if (error) console.error(error)
    else setInterns(data || [])
  }

  // Add / Edit task
  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.title || !form.due_date) return alert("Fill all required fields")

    const payload = {
      title: form.title,
      intern_id: form.intern_id || null,
      due_date: form.due_date,
    }

    let error
    if (editingTask) {
      ({ error } = await supabase
        .from("tasks")
        .update(payload)
        .eq("id", editingTask.id))
    } else {
      ({ error } = await supabase.from("tasks").insert([payload]))
    }

    if (error) {
      alert(error.message)
      return
    }

    setOpen(false)
    setEditingTask(null)
    setForm({ title: "", intern_id: "", due_date: "" })
    fetchTasks()
  }

  // Delete task
  async function handleDelete(id) {
    if (!confirm("Delete this task?")) return
    await supabase.from("tasks").delete().eq("id", id)
    fetchTasks()
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.interns?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Task Management</h1>
            <p className="text-muted-foreground">Assign tasks to interns</p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </Card>

        {/* Tasks Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>
                      {task.interns?.name || "Not assigned"}
                    </TableCell>
                    <TableCell>{task.due_date}</TableCell>

                    {/* STATUS */}
                    <TableCell>
                      {task.completed ? (
                        <span className="text-green-600 font-medium">
                          Completed
                        </span>
                      ) : (
                        <span className="text-orange-500 font-medium">
                          Pending
                        </span>
                      )}
                    </TableCell>

                    {/* DESCRIPTION */}
                    <TableCell>
                      {task.description ? (
                        <span className="text-sm text-muted-foreground line-clamp-2">
                          {task.description}
                        </span>
                      ) : (
                        <span className="text-xs italic text-muted-foreground">
                          Not added
                        </span>
                      )}
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => {
                            setEditingTask(task)
                            setForm({
                              title: task.title,
                              intern_id: task.intern_id || "",
                              due_date: task.due_date,
                            })
                            setOpen(true)
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add / Edit Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTask ? "Edit Task" : "Add Task"}
              </DialogTitle>
              <DialogDescription>
                {editingTask
                  ? "Update task details"
                  : "Create a new task"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Task Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Assign To</Label>
                <Select
                  value={form.intern_id}
                  onValueChange={(v) =>
                    setForm({ ...form, intern_id: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select intern" />
                  </SelectTrigger>
                  <SelectContent>
                    {interns.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={form.due_date}
                  onChange={(e) =>
                    setForm({ ...form, due_date: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpen(false)
                    setEditingTask(null)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTask ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}


