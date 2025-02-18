import { Request, Response } from "express";
import { ICourseService, ICourse, ICourseController } from "./interfaces";
import { CourseSchema } from "./schemas";
import { CourseErrorCode } from "./error";
import { HttpHelpers } from "@/shared/httpHelper";
import { BadRequestError, NotFoundError } from "@/shared/errors";
import { IValidatorService } from "@/shared/validator/interfaces";
import { StatusCodes } from "http-status-codes";

export class CourseController implements ICourseController {
  constructor(
    private courseService: ICourseService,
    private validatorService: IValidatorService,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { value, error } = this.validatorService.validate<
        Omit<ICourse, "id">
      >(CourseSchema.create, req.body);

      if (error) {
        throw new BadRequestError(
          "Missing or invalid parameters",
          CourseErrorCode.MISSING_OR_INVALID_PARAMETERS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const { title, description, duration, instructorId } = value;

      const course = await this.courseService.create({
        title,
        description,
        duration,
        instructorId,
      });

      res.status(StatusCodes.CREATED).json(course);
    } catch (error) {
      const responseError = HttpHelpers.handleError(error);
      res.status(responseError.statusCode).json(responseError);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { value, error } = this.validatorService.validate<{ id: number }>(
        CourseSchema.courseDelete,
        { id: Number(req.params.id) },
      );

      if (error) {
        throw new BadRequestError(
          "Missing or invalid parameters",
          CourseErrorCode.MISSING_OR_INVALID_PARAMETERS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const { id: courseId } = value;

      await this.courseService.delete(courseId);

      res.status(204).send();
    } catch (error) {
      const responseError = HttpHelpers.handleError(error);
      res.status(responseError.statusCode).json(responseError);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { value, error } = this.validatorService.validate<{ id: number }>(
        CourseSchema.getById,
        { id: Number(req.params.id) },
      );

      if (error) {
        throw new BadRequestError(
          "Missing or invalid parameters",
          CourseErrorCode.MISSING_OR_INVALID_PARAMETERS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const { id: courseId } = value;

      const course = await this.courseService.getById(courseId);

      if (!course) {
        throw new NotFoundError(
          "Course not found",
          CourseErrorCode.COURSE_NOT_FOUND,
        );
      }

      res.status(StatusCodes.OK).json(course);
    } catch (error) {
      const responseError = HttpHelpers.handleError(error);
      res.status(responseError.statusCode).json(responseError);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const courseId = Number(req.params.id);
      if (isNaN(courseId)) {
        throw new BadRequestError(
          "Invalid course ID",
          CourseErrorCode.INVALID_COURSE_ID,
        );
      }

      const { value, error } = this.validatorService.validate<
        Omit<Partial<ICourse>, "id">
      >(CourseSchema.update, req.body);

      if (error) {
        throw new BadRequestError(
          "Missing or invalid parameters",
          CourseErrorCode.MISSING_OR_INVALID_PARAMETERS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const updatedCourse = await this.courseService.update(courseId, value);

      res.status(StatusCodes.OK).json(updatedCourse);
    } catch (error) {
      const responseError = HttpHelpers.handleError(error);
      res.status(responseError.statusCode).json(responseError);
    }
  }

  async findByFilters(req: Request, res: Response): Promise<void> {
    try {
      const { value, error } = this.validatorService.validate(
        CourseSchema.findByFilters,
        req.query,
      );

      if (error) {
        throw new BadRequestError(
          "Missing or invalid parameters",
          CourseErrorCode.MISSING_OR_INVALID_PARAMETERS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const courses = await this.courseService.findByFilters(value);

      res.status(StatusCodes.OK).json(courses);
    } catch (error) {
      const responseError = HttpHelpers.handleError(error);
      res.status(responseError.statusCode).json(responseError);
    }
  }
}
