import { NotFoundError } from "@/shared/errors";
import {
  ICourseRepository,
  ICourseService,
  ICourse,
  ICourseFilters,
} from "./interfaces";
import { CourseErrorCode } from "./error";
import { IInstructorService } from "@/modules/Instructor/interfaces";

export class CourseService implements ICourseService {
  constructor(
    private courseRepository: ICourseRepository,
    private instructorService: IInstructorService,
  ) {}

  async create(data: Omit<ICourse, "id">): Promise<ICourse> {
    const instructor = await this.instructorService.getById(data.instructorId);

    if (!instructor) {
      throw new NotFoundError(
        "Instructor not found",
        CourseErrorCode.INSTRUCTOR_NOT_FOUND,
      );
    }

    return this.courseRepository.create(data);
  }

  async getById(id: number): Promise<ICourse | null> {
    return this.courseRepository.getById(id);
  }

  async delete(id: number): Promise<void> {
    const existingCourse = await this.getById(id);

    if (!existingCourse) {
      throw new NotFoundError(
        "Course not found",
        CourseErrorCode.COURSE_NOT_FOUND,
      );
    }

    return this.courseRepository.delete(id);
  }

  async update(
    id: number,
    data: Omit<Partial<ICourse>, "id">,
  ): Promise<ICourse> {
    const existingCourse = await this.getById(id);

    if (!existingCourse) {
      throw new NotFoundError(
        "Course not found",
        CourseErrorCode.COURSE_NOT_FOUND,
      );
    }

    if (data && data.instructorId) {
      const instructor = await this.instructorService.getById(
        data.instructorId,
      );

      if (!instructor) {
        throw new NotFoundError(
          "Instructor not found",
          CourseErrorCode.INSTRUCTOR_NOT_FOUND,
        );
      }
    }

    return this.courseRepository.update(id, data);
  }

  async findByFilters(filters: ICourseFilters): Promise<ICourse[]> {
    return this.courseRepository.findByFilters(filters);
  }
}
