import { ICourseRepository, ICourse, ICourseFilters } from "./interfaces";
import { PrismaClient } from "@prisma/client";
import { IDatabaseClient } from "@/infra/interfaces";

export class CourseRepository implements ICourseRepository {
  private ormClient: PrismaClient;

  constructor(private databaseClient: IDatabaseClient) {
    this.ormClient = this.databaseClient.getOrmClient();
  }

  async create(data: Omit<ICourse, "id">): Promise<ICourse> {
    return this.ormClient.course.create({ data });
  }

  async delete(id: number): Promise<void> {
    await this.ormClient.course.delete({ where: { id } });
  }

  async getById(id: number): Promise<ICourse | null> {
    return this.ormClient.course.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: Omit<Partial<ICourse>, "id">,
  ): Promise<ICourse> {
    return this.ormClient.course.update({
      where: { id },
      data,
    });
  }

  async findByFilters(filters: ICourseFilters): Promise<ICourse[]> {
    const where = {
      ...(filters.title && {
        title: { contains: filters.title.toLowerCase() },
      }),
      ...(filters.instructorId && { instructorId: filters.instructorId }),
    };

    return this.ormClient.course.findMany({ where });
  }
}
