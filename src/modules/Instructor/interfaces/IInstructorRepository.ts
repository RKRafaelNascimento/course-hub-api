import { IInstructor } from ".";

export interface IInstructorRepository {
  getById(id: number): Promise<IInstructor | null>;
}
