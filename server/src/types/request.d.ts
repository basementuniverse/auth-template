import { User } from '.';

export {};

declare global {
  namespace Express {
    interface Request {
      id?: string;
      user?: User;
    }
  }
}
