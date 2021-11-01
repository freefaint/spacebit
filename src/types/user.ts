export enum UserRole {
  Admin = 'Admin',
  Client = 'Client',
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
  isBlocked: boolean;
  isDeleted: boolean;
  email: string;
  organizationId?: number;

  organization?: {
    id: number;
    name: string;
  };
}

export interface Credentials {
  login: string;
  password: string;
}
