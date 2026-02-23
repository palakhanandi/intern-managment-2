import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://keycloak.miraiyug.com",
  realm: "Intern-Management",
  clientId: "react-app",
});

export default keycloak;
