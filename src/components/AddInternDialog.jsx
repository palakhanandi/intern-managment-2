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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input name="name" defaultValue={editingIntern?.name || ""} required />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                defaultValue={editingIntern?.email || ""}
                required
              />
            </div>

            <div>
              <Label>Domain</Label>
              <Input name="domain" defaultValue={editingIntern?.domain || ""} required />
            </div>

            <div>
              <Label>Start Date</Label>
              <Input
                name="startDate"
                type="date"
                defaultValue={editingIntern?.startDate || ""}
                required
              />
            </div>

            <div>
              <Label>Duration</Label>
              <Input
                name="duration"
                defaultValue={editingIntern?.duration || ""}
                required
              />
            </div>

            <div className="flex justify-end gap-2">
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
                {editingIntern ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

