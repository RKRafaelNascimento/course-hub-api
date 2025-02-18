import { ICourse } from ".";

export interface ICourseRepository {
  create(data: Omit<ICourse, "id">): Promise<ICourse>;
}
