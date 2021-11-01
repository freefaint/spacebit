import { UserRole } from "../types";

export const roles: Record<UserRole, string> = {
  [UserRole.Admin]: "Администратор",
  [UserRole.Client]: "Клиент",
}