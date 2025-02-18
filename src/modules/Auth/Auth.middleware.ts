import { Request, Response, NextFunction } from "express";
import { SecurityService } from "@/shared/securityService";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import { AuthErrorCode } from "./error";
import { HttpHelpers } from "@/shared/httpHelper";

const invalidTokenErrors = ["TokenExpiredError", "JsonWebTokenError"];

export class AuthMiddleware {
  private static securityService = new SecurityService();

  public static verifyToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError(
          "Authorization header missing or malformed",
          AuthErrorCode.MISSING_OR_INVALID_PARAMETERS,
        );
      }

      const token = authHeader.split(" ")[1];
      const decoded = AuthMiddleware.securityService.verifyToken(token);

      (req as any).user = decoded;
      next();
    } catch (error: unknown) {
      if (error instanceof Error && invalidTokenErrors.includes(error.name)) {
        // eslint-disable-next-line no-ex-assign
        error = new UnauthorizedError(
          "Invalid token",
          AuthErrorCode.INVALID_TOKEN,
        );
      }

      const responseError = HttpHelpers.handleError(error);
      res.status(responseError.statusCode).json(responseError);
    }
  }
}
