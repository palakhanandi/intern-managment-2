import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "./firebase"
import { supabase } from "@/lib/supabase" // ✅ import supabase

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔹 Sync Firebase user to Supabase
  const syncUserToSupabase = async (currentUser, userRole = "intern") => {
    if (!currentUser) return

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("firebase_uid", currentUser.uid)
      .maybeSingle()

    if (error) {
      console.error("Supabase fetch error:", error)
      return
    }

    if (!data) {
      // User does not exist → insert
      const { error: insertError } = await supabase.from("users").insert([
        {
          firebase_uid: currentUser.uid,
          name: currentUser.displayName || "",
          email: currentUser.email,
          role: userRole,
          created_at: new Date().toISOString(),
        },
      ])

      if (insertError) console.error("Supabase insert error:", insertError)
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null)
        setRole(null)
        setLoading(false)
        return
      }

      setUser(currentUser)

      const userRef = doc(db, "users", currentUser.uid)
      const snap = await getDoc(userRef)

      let currentRole = "intern"

      if (snap.exists()) {
        currentRole = snap.data().role
        setRole(currentRole)
      } else {
        await setDoc(userRef, {
          uid: currentUser.uid,
          email: currentUser.email,
          name: currentUser.displayName || "",
          role: currentRole,
          createdAt: serverTimestamp(),
        })
        setRole(currentRole)
      }

      // 🔹 Sync to Supabase
      await syncUserToSupabase(currentUser, currentRole)

      setLoading(false)
    })

    return () => unsub()
  }, [])

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

