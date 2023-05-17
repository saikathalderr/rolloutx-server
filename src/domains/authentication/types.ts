import Role from "@role";

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string;
}

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  role: Role;
  iat: number;
  exp: number;
};
