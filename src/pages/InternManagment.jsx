import { useState } from "react"
import AdminLayout from "@/layouts/AdminLayout"
import AddInternDialog from "@/components/AddInternDialog"
import InternTable from "@/components/InternTable"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import "../style/admin.css";


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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Intern Management
            </h1>
            <p className="text-muted-foreground mt-1">
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
        <div className="flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="pl-10 rounded-xl bg-background/80 backdrop-blur"
 />

            <Input
              placeholder="Search interns by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                pl-10
                rounded-xl
                border-muted
                shadow-sm
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-0
                transition
              "
            />
          </div>
        </div>

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


