import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

import { auth, db, googleProvider } from "../firebase"
import { supabase } from "@/lib/supabase"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔁 Sync Firebase UID with Supabase Intern
  const syncInternWithSupabase = async (firebaseUser) => {
    if (!firebaseUser?.email) return

    const { data: intern } = await supabase
      .from("interns")
      .select("id")
      .eq("email", firebaseUser.email)
      .single()

    if (!intern) return

    await supabase
      .from("interns")
      .update({ firebase_uid: firebaseUser.uid })
      .eq("id", intern.id)
  }

  // 🔐 Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    try {
      setLoading(true)

      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const userRef = doc(db, "users", userCred.user.uid)
      const snap = await getDoc(userRef)

      if (!snap.exists()) {
        alert("No role assigned to this user")
        return
      }

      const role = snap.data().role

      if (role === "intern") {
        await syncInternWithSupabase(userCred.user)
        navigate("/intern")
      } else {
        navigate("/admin")
      }

    } catch (err) {
      console.error("Login error:", err)
      alert("Invalid email or password")    } finally {
      setLoading(false)
    }
  }

  // 🔐 Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true)

      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const userRef = doc(db, "users", user.uid)
      const snap = await getDoc(userRef)

      // First-time Google login → INTERN
      if (!snap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          role: "intern",
        })

        await syncInternWithSupabase(user)
        navigate("/intern")
        return
      }

      const role = snap.data().role

      if (role === "intern") {
        await syncInternWithSupabase(user)
        navigate("/intern")
      } else {
        navigate("/admin")
      }

    } catch (err) {
      alert("Google Sign-In failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">OR</div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-4 w-4 mr-2"
              />
              Sign in with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

