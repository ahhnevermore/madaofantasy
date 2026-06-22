export interface User {
  publicId: string;
  displayName: string;
  createdAt: string;
}
export const ROUTES = {
  register: "/api/v1/auth/register",
  login: "/api/v1/auth/login",
  me: "/api/v1/auth/me",
  logout: "/api/v1/auth/logout",
};
