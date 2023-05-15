import Role from "@role";

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar?: string;
}
