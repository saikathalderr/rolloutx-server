import { User } from "@src/domains/authentication/types";

export {};

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
