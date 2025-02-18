import { ICourse } from ".";

export interface ICourseService {
  create(data: Omit<ICourse, "id">): Promise<ICourse>;
}
