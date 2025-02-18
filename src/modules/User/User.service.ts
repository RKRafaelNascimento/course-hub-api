import { IUser, IUserRepository, IUserService } from "./Interfaces";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.getByEmail(email);
  }
}
