import { CourseService } from "@/modules/Course";
import { NotFoundError } from "@/shared/errors";
import { ICourseRepository, ICourseService } from "@/modules/Course/interfaces";
import { CourseErrorCode } from "@/modules/Course/error";
import { IInstructorService } from "@/modules/Instructor/interfaces";

describe("CourseService", () => {
  let courseService: ICourseService;
  let mockCourseRepository: jest.Mocked<ICourseRepository>;
  let mockInstructorService: jest.Mocked<IInstructorService>;

  beforeEach(() => {
    mockCourseRepository = {
      create: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<ICourseRepository>;

    mockInstructorService = {
      getById: jest.fn(),
    } as unknown as jest.Mocked<IInstructorService>;

    courseService = new CourseService(
      mockCourseRepository,
      mockInstructorService,
    );
  });

  describe("Method: create", () => {
    it("Should create a course when the instructor exists", async () => {
      const mockCourse = {
        id: 1,
        title: "Node.js Course",
        description: "Learn Node.js",
        duration: 10,
        instructorId: 1,
      };

      mockInstructorService.getById.mockResolvedValue({
        id: 1,
        name: "Instructor Test",
        email: "instructor@test.com",
      });
      mockCourseRepository.create.mockResolvedValue(mockCourse);

      const result = await courseService.create(mockCourse);

      expect(mockInstructorService.getById).toHaveBeenCalledWith(
        mockCourse.instructorId,
      );
      expect(mockCourseRepository.create).toHaveBeenCalledWith(mockCourse);
      expect(result).toEqual(mockCourse);
    });

    it("Should throw NotFoundError if the instructor does not exist", async () => {
      const mockCourse = {
        title: "Node.js Course",
        description: "Learn Node.js",
        duration: 10,
        instructorId: 999,
      };

      mockInstructorService.getById.mockResolvedValue(null);

      await expect(courseService.create(mockCourse)).rejects.toThrow(
        new NotFoundError(
          "Instructor not found",
          CourseErrorCode.INSTRUCTOR_NOT_FOUND,
        ),
      );

      expect(mockInstructorService.getById).toHaveBeenCalledWith(
        mockCourse.instructorId,
      );
      expect(mockCourseRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("Method: update", () => {
    it("Should update a course when the course exists and instructor is valid", async () => {
      const mockCourse = {
        id: 1,
        title: "Updated Node.js Course",
        description: "Advanced Node.js",
        duration: 15,
        instructorId: 2,
      };

      mockCourseRepository.getById.mockResolvedValue(mockCourse);
      mockInstructorService.getById.mockResolvedValue({
        id: 2,
        name: "New Instructor",
        email: "newinstructor@test.com",
      });
      mockCourseRepository.update.mockResolvedValue(mockCourse);

      const result = await courseService.update(1, mockCourse);

      expect(mockCourseRepository.getById).toHaveBeenCalledWith(1);
      expect(mockInstructorService.getById).toHaveBeenCalledWith(
        mockCourse.instructorId,
      );
      expect(mockCourseRepository.update).toHaveBeenCalledWith(1, mockCourse);
      expect(result).toEqual(mockCourse);
    });

    it("Should throw NotFoundError if the course does not exist", async () => {
      mockCourseRepository.getById.mockResolvedValue(null);

      await expect(
        courseService.update(999, { title: "New Title" }),
      ).rejects.toThrow(
        new NotFoundError("Course not found", CourseErrorCode.COURSE_NOT_FOUND),
      );

      expect(mockCourseRepository.getById).toHaveBeenCalledWith(999);
      expect(mockCourseRepository.update).not.toHaveBeenCalled();
    });

    it("Should throw NotFoundError if the instructor does not exist", async () => {
      const mockCourse = {
        id: 1,
        title: "Updated Node.js Course",
        description: "Advanced Node.js",
        duration: 15,
        instructorId: 999,
      };

      mockCourseRepository.getById.mockResolvedValue(mockCourse);
      mockInstructorService.getById.mockResolvedValue(null);

      await expect(courseService.update(1, mockCourse)).rejects.toThrow(
        new NotFoundError(
          "Instructor not found",
          CourseErrorCode.INSTRUCTOR_NOT_FOUND,
        ),
      );

      expect(mockInstructorService.getById).toHaveBeenCalledWith(
        mockCourse.instructorId,
      );
      expect(mockCourseRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("Method: delete", () => {
    it("Should delete a course when the course exists", async () => {
      const mockCourse = {
        id: 1,
        title: "Node.js Course",
        description: "Learn Node.js",
        duration: 10,
        instructorId: 1,
      };

      mockCourseRepository.getById.mockResolvedValue(mockCourse);
      mockCourseRepository.delete.mockResolvedValue();

      await courseService.delete(1);

      expect(mockCourseRepository.getById).toHaveBeenCalledWith(1);
      expect(mockCourseRepository.delete).toHaveBeenCalledWith(1);
    });

    it("Should throw NotFoundError if the course does not exist", async () => {
      mockCourseRepository.getById.mockResolvedValue(null);

      await expect(courseService.delete(999)).rejects.toThrow(
        new NotFoundError("Course not found", CourseErrorCode.COURSE_NOT_FOUND),
      );

      expect(mockCourseRepository.getById).toHaveBeenCalledWith(999);
      expect(mockCourseRepository.delete).not.toHaveBeenCalled();
    });
  });
});
