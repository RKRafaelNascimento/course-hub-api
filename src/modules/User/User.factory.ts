import { UserService, UserRepository } from ".";
import { IUserService } from "./Interfaces";
import { DatabaseClient } from "@/infra/database";

export class UserServiceFactory {
  private static instance: IUserService;

  static getInstance(): IUserService {
    if (!this.instance) {
      this.instance = new UserService(
        new UserRepository(DatabaseClient.getInstance()),
      );
    }
    return this.instance;
  }
}
