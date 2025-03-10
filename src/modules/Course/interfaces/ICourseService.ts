import { ICourse, ICourseFilters } from ".";

export interface ICourseService {
  create(data: Omit<ICourse, "id">): Promise<ICourse>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<ICourse | null>;
  update(id: number, data: Omit<Partial<ICourse>, "id">): Promise<ICourse>;
  findByFilters(filters: ICourseFilters): Promise<ICourse[]>;
}
