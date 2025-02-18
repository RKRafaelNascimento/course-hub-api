import { ICourse } from ".";

export interface ICourseRepository {
  create(data: Omit<ICourse, "id">): Promise<ICourse>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<ICourse | null>;
}
