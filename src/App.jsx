import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "@/pages/AdminDashboard"
import InternDashboard from "@/pages/InternDashboard"
import InternManagement from "./pages/InternManagment"
import AdminTasks from "@/pages/AdminTasks"
import AdminAttendance from "@/pages/AdminAttendance"
import AdminCertificates from "@/pages/AdminCertificates"
import AdminReports from "@/pages/AdminReports"
import AdminSettings from "@/pages/AdminSettings"
import InternTasks from "@/pages/InternTasks"
import InternAttendance from "@/pages/InternAttendance"
import InternResources from "@/pages/InternResources"
import InternCertificates from "@/pages/InternCertificates"
import InternSupport from "@/pages/InternSupport"
import InternSettings from "@/pages/InternSettings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/interns" element={<InternManagement />} />
        <Route path="/admin/tasks" element={<AdminTasks />} />
        <Route path="/admin/attendance" element={<AdminAttendance />} />
        <Route path="/admin/certificates" element={<AdminCertificates />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        
        {/* Intern Routes */}
        <Route path="/intern" element={<InternDashboard />} />
        <Route path="/intern/tasks" element={<InternTasks />} />
        <Route path="/intern/attendance" element={<InternAttendance />} />
        <Route path="/intern/resources" element={<InternResources />} />
        <Route path="/intern/certificates" element={<InternCertificates />} />
        <Route path="/intern/support" element={<InternSupport />} />
        <Route path="/intern/settings" element={<InternSettings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App






