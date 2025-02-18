import { IUser } from ".";

export interface IUserService {
  getByEmail(email: string): Promise<IUser | null>;
}
