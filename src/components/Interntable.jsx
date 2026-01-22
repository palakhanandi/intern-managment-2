import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"

export default function InternTable({
  interns,
  setInterns,
  setEditingIntern,
  setOpen,
}) {
  function handleDelete(id) {
    setInterns((prev) => prev.filter((i) => i.id !== id))
  }

  if (interns.length === 0) {
    return (
      <Card>
        <div className="text-center text-muted-foreground py-12 px-6">
          <p className="text-lg font-medium">No interns found</p>
          <p className="text-sm mt-1">Add your first intern to get started</p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="p-6">
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Domain</TableHead>
            <TableHead className="font-semibold">Start Date</TableHead>
            <TableHead className="font-semibold">Duration</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {interns.map((intern) => (
            <TableRow key={intern.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">{intern.name}</TableCell>
              <TableCell className="text-muted-foreground">{intern.email}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {intern.domain}
                </span>
              </TableCell>
              <TableCell>{intern.startDate}</TableCell>
              <TableCell>{intern.duration}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditingIntern(intern)
                      setOpen(true)
                    }}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(intern.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </Card>
  )
}
