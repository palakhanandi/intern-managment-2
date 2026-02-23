import { Navigate } from "react-router-dom"
import keycloak from "./Keycloak"

const ProtectedRoute = ({ children, allowedRole }) => {

  // If not logged in → send to login
  if (!keycloak.authenticated) {
    keycloak.login()
    return null
  }

  const roles = keycloak.tokenParsed?.realm_access?.roles || []

  // If role not allowed → redirect
  if (allowedRole && !roles.includes(allowedRole)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
