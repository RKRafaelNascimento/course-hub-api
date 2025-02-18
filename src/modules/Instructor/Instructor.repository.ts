import { IDatabaseClient } from "@/infra/interfaces";
import { IInstructorRepository, IInstructor } from "./interfaces";
import { PrismaClient } from "@prisma/client";

export class InstructorRepository implements IInstructorRepository {
  private ormClient: PrismaClient;

  constructor(private databaseClient: IDatabaseClient) {
    this.ormClient = this.databaseClient.getOrmClient();
  }

  async getById(id: number): Promise<IInstructor | null> {
    return this.ormClient.instructor.findUnique({ where: { id } });
  }
}
