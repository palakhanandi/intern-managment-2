import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "@/pages/AdminDashboard"
import InternDashboard from "@/pages/InternDashboard"
import InternManagement from "./pages/InternManagment"




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        <Route path="/intern" element={<InternDashboard />} />

        <Route path="/admin/interns" element={<InternManagement/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App






