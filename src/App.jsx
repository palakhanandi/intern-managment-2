import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"

// Admin pages
import AdminDashboard from "@/pages/AdminDashboard"
import InternManagement from "./pages/InternManagment"
import AdminTasks from "@/pages/AdminTasks"
import AdminAttendance from "@/pages/AdminAttendance"
import AdminCertificates from "@/pages/AdminCertificates"
import AdminReports from "@/pages/AdminReports"
import AdminRoleControl from "./pages/AdminRoleControl"
import AdminSettings from "@/pages/AdminSettings"

// Intern pages
import InternDashboard from "@/pages/InternDashboard"
import InternTasks from "@/pages/InternTasks"
import InternAttendance from "@/pages/InternAttendance"
import InternResources from "@/pages/InternResources"
import InternCertificates from "@/pages/InternCertificates"
import InternSupport from "@/pages/InternSupport"
import InternSettings from "@/pages/InternSettings"

import ProtectedRoute from "./ProtectedRoute"
import { AuthProvider } from "./AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ===== ROOT AUTO REDIRECT ===== */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div />
              </ProtectedRoute>
            }
          />

          {/* ===== LOGIN ===== */}
          <Route path="/login" element={<Login />} />

          {/* ===== ADMIN ===== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/interns"
            element={
              <ProtectedRoute allowedRole="admin">
                <InternManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tasks"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminTasks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/attendance"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminAttendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/certificates"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminCertificates />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminReports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminSettings />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin/role"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminRoleControl />
              </ProtectedRoute>
            }
          />

          {/* ===== INTERN ===== */}
          <Route
            path="/intern"
            element={
              <ProtectedRoute allowedRole="intern">
                <InternDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/intern/tasks"
            element={
              <ProtectedRoute allowedRole="intern">
                <InternTasks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/intern/attendance"
            element={
              <ProtectedRoute allowedRole="intern">
                <InternAttendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/intern/resources"
            element={
              <ProtectedRoute allowedRole="intern">
                <InternResources />
              </ProtectedRoute>
            }
          />

          <Route
            path="/intern/certificates"
            element={
              <ProtectedRoute allowedRole="intern">
                <InternCertificates />
              </ProtectedRoute>
            }
          />

          <Route
            path="/intern/support"
            element={
              <ProtectedRoute allowedRole="intern">
                <InternSupport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/intern/settings"
            element={
              <ProtectedRoute allowedRole="intern">
                <InternSettings />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App







