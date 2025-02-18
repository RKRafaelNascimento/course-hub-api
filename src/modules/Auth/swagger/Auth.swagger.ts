export const authSwagger = {
  tags: [
    {
      name: "Authentication",
      description: "Endpoints related to user authentication, including login.",
    },
  ],
  paths: {
    "/login": {
      post: {
        tags: ["Authentication"],
        summary: "Authenticate a user and generate a JWT token",
        description:
          "Authenticates the user using email and password. Returns a JWT token if the credentials are valid.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "user@example.com",
                  },
                  password: {
                    type: "string",
                    format: "password",
                    example: "password123",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "User authenticated successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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
                      example: "INVALID_CREDENTIALS",
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
                      example: "Invalid credentials",
                    },
                  },
                },
                examples: {
                  invalidCredentials: {
                    summary: "Invalid credentials",
                    value: {
                      code: "INVALID_CREDENTIALS",
                      statusCode: 401,
                      statusCodeAsString: "UNAUTHORIZED",
                      description: "Invalid credentials",
                    },
                  },
                },
              },
            },
          },
          500: {
            description:
              "Internal server error – unexpected error during authentication.",
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
