import { DatabaseClient } from "@/infra/database";
import { CourseController, CourseService, CourseRepository } from ".";
import { InstructorServiceFactory } from "@/modules/Instructor";
import { ICourseController } from "./interfaces";
import { ValidatorService } from "@/shared/validator";

export class CourseControllerFactory {
  private static instance: ICourseController;

  static getInstance(): ICourseController {
    if (!this.instance) {
      const courseRepository = new CourseRepository(
        DatabaseClient.getInstance(),
      );
      const instructorService = InstructorServiceFactory.getInstance();
      const courseService = new CourseService(
        courseRepository,
        instructorService,
      );
      this.instance = new CourseController(
        courseService,
        ValidatorService.getInstance(),
      );
    }
    return this.instance;
  }
}
