import {
  IInstructorService,
  IInstructorRepository,
  IInstructor,
} from "./interfaces";

export class InstructorService implements IInstructorService {
  constructor(private instructorRepository: IInstructorRepository) {}

  async getById(id: number): Promise<IInstructor | null> {
    return this.instructorRepository.getById(id);
  }
}
