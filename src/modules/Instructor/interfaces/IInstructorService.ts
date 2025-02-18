import { IInstructor } from ".";

export interface IInstructorService {
  getById(id: number): Promise<IInstructor | null>;
}
