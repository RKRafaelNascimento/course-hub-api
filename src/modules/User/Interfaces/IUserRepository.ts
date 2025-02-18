import { IUser } from ".";

export interface IUserRepository {
  getByEmail(email: string): Promise<IUser | null>;
}
