import { IUserRepository, IUser } from "./Interfaces";
import { IDatabaseClient } from "@/infra/interfaces";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements IUserRepository {
  private ormClient: PrismaClient;

  constructor(private databaseClient: IDatabaseClient) {
    this.ormClient = this.databaseClient.getOrmClient();
  }

  async getByEmail(email: string): Promise<IUser | null> {
    return this.ormClient.user.findUnique({
      where: { email },
    });
  }
}
