interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'UbmoGOJSVO9RwW7BfKzAD6yyzCWWq16O',
  domain: 'proyectoapp.auth0.com',
  callbackURL: 'http://localhost:3000/login'
};
