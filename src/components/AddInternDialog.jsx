import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"

export default function AddInternDialog({
  open,
  setOpen,
  interns,
  setInterns,
  editingIntern,
  setEditingIntern,
}) {
  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    const internData = {
      id: editingIntern ? editingIntern.id : Date.now(),
      name: form.name.value,
      email: form.email.value,
      domain: form.domain.value,
      startDate: form.startDate.value,
      duration: form.duration.value,
    }

    if (editingIntern) {
      setInterns((prev) =>
        prev.map((i) => (i.id === editingIntern.id ? internData : i))
      )
    } else {
      setInterns((prev) => [...prev, internData])
    }

    setOpen(false)
    setEditingIntern(null)
    form.reset()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Add Intern
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingIntern ? "Edit Intern" : "Add Intern"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name"
                name="name" 
                defaultValue={editingIntern?.name || ""} 
                placeholder="Enter intern name"
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                defaultValue={editingIntern?.email || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain">Domain</Label>
              <Input 
                id="domain"
                name="domain" 
                placeholder="e.g., Web Development, Data Science"
                defaultValue={editingIntern?.domain || ""} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={editingIntern?.startDate || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g., 3 months, 6 months"
                defaultValue={editingIntern?.duration || ""}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false)
                  setEditingIntern(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingIntern ? "Update Intern" : "Add Intern"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

