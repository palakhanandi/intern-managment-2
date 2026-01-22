import { useState } from "react"
import AdminLayout from "@/layouts/AdminLayout"
import InternTable from "@/components/Interntable"
import AddInternDialog from "@/components/AddInternDialog"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"


export default function InternManagement() {
  const [search, setSearch] = useState("")
  const [interns, setInterns] = useState([])
  const [editingIntern, setEditingIntern] = useState(null)
  const [open, setOpen] = useState(false)

  const filteredInterns = interns.filter(
    (intern) =>
      intern.name.toLowerCase().includes(search.toLowerCase()) ||
      intern.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Intern Management</h1>
            <p className="text-muted-foreground mt-1.5">
              Manage interns, update details or remove them
            </p>
          </div>

          <AddInternDialog
            open={open}
            setOpen={setOpen}
            interns={interns}
            setInterns={setInterns}
            editingIntern={editingIntern}
            setEditingIntern={setEditingIntern}
          />
        </div>

        {/* SEARCH */}
        <Card className="p-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interns by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* TABLE */}
        <InternTable
          interns={filteredInterns}
          setInterns={setInterns}
          setEditingIntern={setEditingIntern}
          setOpen={setOpen}
        />
      </div>
    </AdminLayout>
  )
}


