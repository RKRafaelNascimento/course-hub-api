import { InstructorService, InstructorRepository } from ".";
import { IInstructorService } from "./interfaces/IInstructorService";
import { DatabaseClient } from "@/infra/database";

export class InstructorServiceFactory {
  private static instance: IInstructorService;

  static getInstance(): IInstructorService {
    if (!this.instance) {
      this.instance = new InstructorService(
        new InstructorRepository(DatabaseClient.getInstance()),
      );
    }
    return this.instance;
  }
}
