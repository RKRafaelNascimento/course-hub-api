export const courseSwagger = {
  tags: [
    {
      name: "Courses",
      description:
        "Endpoints for managing courses, including creation, retrieval, and updates.",
    },
  ],
  paths: {
    "/courses": {
      post: {
        tags: ["Courses"],
        summary: "Create a new course",
        description:
          "Creates a new course with the provided details. Requires authentication via Bearer Token.",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "description", "duration", "instructorId"],
                properties: {
                  title: {
                    type: "string",
                    example: "Introduction to Node.js",
                  },
                  description: {
                    type: "string",
                    example: "A beginner-friendly course on Node.js.",
                  },
                  duration: {
                    type: "integer",
                    example: 10,
                  },
                  instructorId: {
                    type: "integer",
                    example: 1,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Course created successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      example: 1,
                    },
                    title: {
                      type: "string",
                      example: "Introduction to Node.js",
                    },
                    description: {
                      type: "string",
                      example: "A beginner-friendly course on Node.js.",
                    },
                    duration: {
                      type: "integer",
                      example: 10,
                    },
                    instructorId: {
                      type: "integer",
                      example: 1,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request - Missing or invalid parameters",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "MISSING_OR_INVALID_PARAMETERS",
                    },
                    statusCode: {
                      type: "number",
                      example: 400,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "BAD_REQUEST",
                    },
                    description: {
                      type: "string",
                      example: "Missing or invalid parameters",
                    },
                  },
                },
                examples: {
                  missingOrInvalidParameters: {
                    summary: "Missing or invalid parameters",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "Missing or invalid parameters",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized - Invalid credentials or token errors",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "INVALID_TOKEN",
                    },
                    statusCode: {
                      type: "number",
                      example: 401,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "UNAUTHORIZED",
                    },
                    description: {
                      type: "string",
                      example: "Invalid token",
                    },
                  },
                },
                examples: {
                  missingOrMalformedToken: {
                    summary: "Missing or malformed authorization token",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Authorization header missing or malformed",
                    },
                  },
                  invalidToken: {
                    summary: "Invalid or expired token",
                    value: {
                      code: "INVALID_TOKEN",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Invalid token",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found - Instructor not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "INSTRUCTOR_NOT_FOUND",
                    },
                    statusCode: {
                      type: "number",
                      example: 404,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "NOT_FOUND",
                    },
                    description: {
                      type: "string",
                      example: "Instructor not found",
                    },
                  },
                },
                examples: {
                  instructorNotFound: {
                    summary: "Instructor does not exist",
                    value: {
                      code: "INSTRUCTOR_NOT_FOUND",
                      statusCode: 404,
                      statusCodeAsString: "NOT_FOUND",
                      description: "Instructor not found",
                    },
                  },
                },
              },
            },
          },
          500: {
            description:
              "Internal server error – unexpected error during course creation.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "INTERNAL_SERVER_ERROR",
                    },
                    statusCode: {
                      type: "number",
                      example: 500,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "INTERNAL_SERVER_ERROR",
                    },
                    description: {
                      type: "string",
                      example: "Internal server error",
                    },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Courses"],
        summary: "Retrieve courses with optional filters",
        description:
          "Fetches a list of courses with optional filtering by title and instructor ID. Requires authentication via Bearer Token.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "title",
            in: "query",
            required: false,
            description:
              "Filter courses by title (case insensitive, no quotes allowed)",
            schema: { type: "string", example: "Node.js" },
          },
          {
            name: "instructorId",
            in: "query",
            required: false,
            description: "Filter courses by instructor ID",
            schema: { type: "integer", example: 2 },
          },
        ],
        responses: {
          200: {
            description: "Courses retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      title: {
                        type: "string",
                        example: "Introduction to Node.js",
                      },
                      description: {
                        type: "string",
                        example: "A beginner-friendly course on Node.js.",
                      },
                      duration: { type: "integer", example: 10 },
                      instructorId: { type: "integer", example: 1 },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request - Missing or invalid parameters",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "MISSING_OR_INVALID_PARAMETERS",
                    },
                    statusCode: { type: "number", example: 400 },
                    statusCodeAsString: {
                      type: "string",
                      example: "BAD_REQUEST",
                    },
                    description: {
                      type: "string",
                      example: "Missing or invalid parameters",
                    },
                  },
                },
                examples: {
                  invalidTitle: {
                    summary: "Title contains quotes",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "Title cannot contain quotes (' or \")",
                    },
                  },
                  missingOrInvalidParameters: {
                    summary: "Missing or invalid parameters",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "Missing or invalid parameters",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Unauthorized - Invalid token or missing authorization",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: { type: "string", example: "INVALID_TOKEN" },
                    statusCode: { type: "number", example: 401 },
                    statusCodeAsString: {
                      type: "string",
                      example: "UNAUTHORIZED",
                    },
                    description: { type: "string", example: "Invalid token" },
                  },
                },
                examples: {
                  missingOrMalformedToken: {
                    summary: "Missing or malformed authorization token",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Authorization header missing or malformed",
                    },
                  },
                  invalidToken: {
                    summary: "Invalid or expired token",
                    value: {
                      code: "INVALID_TOKEN",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Invalid token",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/courses/{id}": {
      get: {
        tags: ["Courses"],
        summary: "Retrieve a course by ID",
        description:
          "Fetches the details of a course by its ID. Requires authentication via Bearer Token.",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the course to retrieve.",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Course retrieved successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "integer",
                      example: 1,
                    },
                    title: {
                      type: "string",
                      example: "Introduction to Node.js",
                    },
                    description: {
                      type: "string",
                      example: "A beginner-friendly course on Node.js.",
                    },
                    duration: {
                      type: "integer",
                      example: 10,
                    },
                    instructorId: {
                      type: "integer",
                      example: 1,
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad Request - Missing or invalid parameters",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "MISSING_OR_INVALID_PARAMETERS",
                    },
                    statusCode: {
                      type: "number",
                      example: 400,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "BAD_REQUEST",
                    },
                    description: {
                      type: "string",
                      example: "Missing or invalid parameters",
                    },
                  },
                },
                examples: {
                  missingOrInvalidParameters: {
                    summary: "Missing or invalid parameters",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "Missing or invalid parameters",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized - Invalid credentials or token errors",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "INVALID_TOKEN",
                    },
                    statusCode: {
                      type: "number",
                      example: 401,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "UNAUTHORIZED",
                    },
                    description: {
                      type: "string",
                      example: "Invalid token",
                    },
                  },
                },
                examples: {
                  missingOrMalformedToken: {
                    summary: "Missing or malformed authorization token",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Authorization header missing or malformed",
                    },
                  },
                  invalidToken: {
                    summary: "Invalid or expired token",
                    value: {
                      code: "INVALID_TOKEN",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Invalid token",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found - Course not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "COURSE_NOT_FOUND",
                    },
                    statusCode: {
                      type: "number",
                      example: 404,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "NOT_FOUND",
                    },
                    description: {
                      type: "string",
                      example: "Course not found",
                    },
                  },
                },
                examples: {
                  courseNotFound: {
                    summary: "Course does not exist",
                    value: {
                      code: "COURSE_NOT_FOUND",
                      statusCode: 404,
                      statusCodeAsString: "NOT_FOUND",
                      description: "Course not found",
                    },
                  },
                },
              },
            },
          },
          500: {
            description:
              "Internal server error – unexpected error during course retrieval.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "INTERNAL_SERVER_ERROR",
                    },
                    statusCode: {
                      type: "number",
                      example: 500,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "INTERNAL_SERVER_ERROR",
                    },
                    description: {
                      type: "string",
                      example: "Internal server error",
                    },
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Courses"],
        summary: "Update a course",
        description:
          "Updates the details of an existing course by its ID. Requires authentication via Bearer Token.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the course to update.",
            schema: { type: "integer", example: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Advanced Node.js" },
                  description: {
                    type: "string",
                    example: "An advanced course on Node.js.",
                  },
                  duration: { type: "integer", example: 15 },
                  instructorId: { type: "integer", example: 2 },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Course updated successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    title: { type: "string", example: "Advanced Node.js" },
                    description: {
                      type: "string",
                      example: "An advanced course on Node.js.",
                    },
                    duration: { type: "integer", example: 15 },
                    instructorId: { type: "integer", example: 2 },
                  },
                },
              },
            },
          },
          400: {
            description:
              "Bad Request - Invalid course ID or missing/invalid parameters",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "MISSING_OR_INVALID_PARAMETERS",
                    },
                    statusCode: { type: "number", example: 400 },
                    statusCodeAsString: {
                      type: "string",
                      example: "BAD_REQUEST",
                    },
                    description: {
                      type: "string",
                      example: "Missing or invalid parameters",
                    },
                  },
                },
                examples: {
                  invalidCourseId: {
                    summary: "Invalid course ID",
                    value: {
                      code: "INVALID_COURSE_ID",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "Invalid course ID",
                    },
                  },
                  missingOrInvalidParameters: {
                    summary: "Missing or invalid parameters",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "Missing or invalid parameters",
                    },
                  },
                },
              },
            },
          },
          401: {
            description:
              "Unauthorized - Invalid token or missing authorization",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: { type: "string", example: "INVALID_TOKEN" },
                    statusCode: { type: "number", example: 401 },
                    statusCodeAsString: {
                      type: "string",
                      example: "UNAUTHORIZED",
                    },
                    description: { type: "string", example: "Invalid token" },
                  },
                },
                examples: {
                  missingOrMalformedToken: {
                    summary: "Missing or malformed authorization token",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Authorization header missing or malformed",
                    },
                  },
                  invalidToken: {
                    summary: "Invalid or expired token",
                    value: {
                      code: "INVALID_TOKEN",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Invalid token",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found - Course or Instructor not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: { type: "string", example: "COURSE_NOT_FOUND" },
                    statusCode: { type: "number", example: 404 },
                    statusCodeAsString: {
                      type: "string",
                      example: "NOT_FOUND",
                    },
                    description: {
                      type: "string",
                      example: "Course not found",
                    },
                  },
                },
                examples: {
                  courseNotFound: {
                    summary: "Course does not exist",
                    value: {
                      code: "COURSE_NOT_FOUND",
                      statusCode: 404,
                      statusCodeAsString: "NOT_FOUND",
                      description: "Course not found",
                    },
                  },
                  instructorNotFound: {
                    summary: "Instructor does not exist",
                    value: {
                      code: "INSTRUCTOR_NOT_FOUND",
                      statusCode: 404,
                      statusCodeAsString: "NOT_FOUND",
                      description: "Instructor not found",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Courses"],
        summary: "Delete a course",
        description:
          "Deletes a course by its ID. Requires authentication via Bearer Token.",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID of the course to delete.",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          204: {
            description: "Course deleted successfully.",
          },
          400: {
            description: "Bad Request - Missing or invalid parameters",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "MISSING_OR_INVALID_PARAMETERS",
                    },
                    statusCode: {
                      type: "number",
                      example: 400,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "BAD_REQUEST",
                    },
                    description: {
                      type: "string",
                      example: "Missing or invalid parameters",
                    },
                  },
                },
                examples: {
                  missingOrInvalidParameters: {
                    summary: "Missing or invalid parameters",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 400,
                      statusCodeAsString: "BAD_REQUEST",
                      description: "Missing or invalid parameters",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized - Invalid credentials or token errors",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "INVALID_TOKEN",
                    },
                    statusCode: {
                      type: "number",
                      example: 401,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "UNAUTHORIZED",
                    },
                    description: {
                      type: "string",
                      example: "Invalid token",
                    },
                  },
                },
                examples: {
                  missingOrMalformedToken: {
                    summary: "Missing or malformed authorization token",
                    value: {
                      code: "MISSING_OR_INVALID_PARAMETERS",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Authorization header missing or malformed",
                    },
                  },
                  invalidToken: {
                    summary: "Invalid or expired token",
                    value: {
                      code: "INVALID_TOKEN",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Invalid token",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Not Found - Course not found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "COURSE_NOT_FOUND",
                    },
                    statusCode: {
                      type: "number",
                      example: 404,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "NOT_FOUND",
                    },
                    description: {
                      type: "string",
                      example: "Course not found",
                    },
                  },
                },
                examples: {
                  courseNotFound: {
                    summary: "Course does not exist",
                    value: {
                      code: "COURSE_NOT_FOUND",
                      statusCode: 404,
                      statusCodeAsString: "NOT_FOUND",
                      description: "Course not found",
                    },
                  },
                },
              },
            },
          },
          500: {
            description:
              "Internal server error – unexpected error during course deletion.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                      example: "INTERNAL_SERVER_ERROR",
                    },
                    statusCode: {
                      type: "number",
                      example: 500,
                    },
                    statusCodeAsString: {
                      type: "string",
                      example: "INTERNAL_SERVER_ERROR",
                    },
                    description: {
                      type: "string",
                      example: "Internal server error",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
