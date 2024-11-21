export type UserRole = "user" | "renter";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}