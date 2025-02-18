import { NotFoundError } from "@/shared/errors";
import { ICourseRepository, ICourseService, ICourse } from "./interfaces";
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
}
