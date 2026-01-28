import { Button } from "@/components/ui/button"
import { Trash2, Pencil } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function InternTable({
  interns,
  setEditingIntern,
  setOpen,
  fetchInterns,
  loading,
}) {
  async function handleDelete(id) {
    const confirmDelete = confirm("Are you sure you want to delete this intern?")
    if (!confirmDelete) return

    const { error } = await supabase
      .from("interns")
      .delete()
      .eq("id", id)

    if (error) {
      alert("Failed to delete intern")
      console.error(error)
    } else {
      fetchInterns()
    }
  }

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading interns...</p>
  }

  if (!interns.length) {
    return (
      <p className="text-center text-muted-foreground py-10">
        No interns found
      </p>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Domain</th>
            <th className="p-3 text-left">Start Date</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {interns.map((intern) => (
            <tr key={intern.id} className="border-b last:border-0">
              <td className="p-3">{intern.name}</td>
              <td className="p-3">{intern.email}</td>
              <td className="p-3">{intern.domain}</td>
              <td className="p-3">{intern.start_date}</td>
              <td className="p-3">{intern.duration}</td>

              <td className="p-3 text-right space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setEditingIntern(intern)
                    setOpen(true)
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(intern.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

