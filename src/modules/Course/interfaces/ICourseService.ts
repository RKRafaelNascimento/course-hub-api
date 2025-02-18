import { ICourse } from ".";

export interface ICourseService {
  create(data: Omit<ICourse, "id">): Promise<ICourse>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<ICourse | null>;
}
