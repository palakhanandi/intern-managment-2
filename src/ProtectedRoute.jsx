import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth()

  // ⏳ WAIT until Firebase finishes loading
  if (loading) {
    return <div className="flex h-screen items-center justify-center">
      Loading...
    </div>
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // ❌ Role mismatch
  if (role !== allowedRole) {
    return <Navigate to="/login" replace />
  }

  // ✅ Allowed
  return children
}

