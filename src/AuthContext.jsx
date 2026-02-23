import { createContext, useContext, useEffect, useState, useRef } from "react";
import keycloak from "./Keycloak";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [keycloakReady, setKeycloakReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;  
    initialized.current = true;

    keycloak
      .init({ onLoad: "login-required" })
      .then((authenticated) => {
        if (authenticated) {
          const roles =
            keycloak.tokenParsed?.realm_access?.roles || [];

          setUser({
  username: keycloak.tokenParsed.preferred_username,
  email: keycloak.tokenParsed.email, // 🔥 ADD THIS
  roles: keycloak.tokenParsed.realm_access.roles,
})
        }
        setKeycloakReady(true);
      })
      .catch((err) => {
        console.error("Keycloak init error:", err);
        setKeycloakReady(true);
      });
  }, []);
const logout = () => {
  keycloak.logout({
    redirectUri: window.location.origin,
    idTokenHint: keycloak.idToken,
  });
};
  if (!keycloakReady) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


