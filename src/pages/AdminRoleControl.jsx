import React, { useState, useEffect } from "react"
import AdminLayout from "@/layouts/AdminLayout"
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/AuthContext"

export default function AdminRoleControl() {
  const { user: firebaseUser } = useAuth()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch users from Supabase
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false })
      if (error) console.error("Supabase fetch error:", error)
      else setUsers(data || [])
    } catch (err) {
      console.error("Unexpected fetch error:", err)
    }
  }

  // Sync Firebase user to Supabase
  const syncUserToSupabase = async (currentUser, role = "intern") => {
    if (!currentUser) return
    try {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("firebase_uid", currentUser.uid)
        .single()

      if (!data) {
        await supabase.from("users").insert([
          {
            firebase_uid: currentUser.uid,
            name: currentUser.displayName || "",
            email: currentUser.email,
            role,
            created_at: new Date().toISOString(),
          },
        ])
      }
    } catch (err) {
      console.error("Unexpected sync error:", err)
    }
  }

  // Toggle user role
  const toggleRole = async (firebase_uid, currentRole) => {
    if (!firebaseUser || firebase_uid === firebaseUser.uid) return

    const newRole = currentRole === "admin" ? "intern" : "admin"
    try {
      const { error } = await supabase
        .from("users")
        .update({ role: newRole })
        .eq("firebase_uid", firebase_uid)
      if (error) console.error("Role update error:", error)
      else fetchUsers()
    } catch (err) {
      console.error("Unexpected role update error:", err)
    }
  }

  // Initial load
  useEffect(() => {
    const loadUsers = async () => {
      if (firebaseUser) await syncUserToSupabase(firebaseUser)
      await fetchUsers()
      setLoading(false)
    }
    loadUsers()
  }, [firebaseUser])

  const filteredUsers = (users || []).filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="p-6">Loading users...</div>

  return (
    <AdminLayout>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Role Control</h1>

        <Input
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />

        <div className="overflow-x-auto">
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableCell className="font-semibold">User</TableCell>
                <TableCell className="font-semibold">Email</TableCell>
                <TableCell className="font-semibold">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((u) => (
                  <TableRow key={u.firebase_uid}>
                    <TableCell>{u.name || "Unnamed User"}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        disabled={u.firebase_uid === firebaseUser?.uid}
                        onClick={() => toggleRole(u.firebase_uid, u.role)}
                      >
                        {u.role === "admin" ? "Admin" : "Intern"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  )
}













