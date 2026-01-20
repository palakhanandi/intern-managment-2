import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
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
      <div className="text-center text-muted-foreground py-10">
        No interns found
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {interns.map((intern) => (
          <TableRow key={intern.id} className="hover:bg-muted/50">
            <TableCell className="font-medium">{intern.name}</TableCell>
            <TableCell>{intern.email}</TableCell>
            <TableCell>{intern.domain}</TableCell>
            <TableCell>{intern.startDate}</TableCell>
            <TableCell>{intern.duration}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setEditingIntern(intern)
                  setOpen(true)
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(intern.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
