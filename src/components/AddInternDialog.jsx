import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AddInternDialog({
  open,
  setOpen,
  editingIntern,
  setEditingIntern,
  fetchInterns, // ✅ NEW
}) {
  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    const internData = {
      name: form.name.value,
      email: form.email.value,
      domain: form.domain.value,
      start_date: form.startDate.value,
      duration: form.duration.value,
    }

    if (editingIntern) {
      // ✏️ UPDATE
      const { error } = await supabase
        .from("interns")
        .update(internData)
        .eq("id", editingIntern.id)

      if (error) {
        alert("Error updating intern")
        console.error(error)
        return
      }
    } else {
      // ➕ INSERT
      const { error } = await supabase
        .from("interns")
        .insert([internData])

      if (error) {
        alert("Error adding intern")
        console.error(error)
        return
      }
    }

    await fetchInterns() // 🔄 refresh list

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

            <DialogDescription>
              {editingIntern
                ? "Update intern details such as name, email, domain, start date, and duration."
                : "Enter intern details such as name, email, domain, start date, and duration."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                name="name"
                defaultValue={editingIntern?.name || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                defaultValue={editingIntern?.email || ""}
                required
                // prevent email change
              />
            </div>

            <div className="space-y-2">
              <Label>Domain</Label>
              <Input
                name="domain"
                defaultValue={editingIntern?.domain || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                name="startDate"
                type="date"
                defaultValue={editingIntern?.start_date || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Duration</Label>
              <Input
                name="duration"
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



