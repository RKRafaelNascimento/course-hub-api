import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IAuthController, IAuthService, IAuthLogin } from "./interfaces";
import { IValidatorService } from "@/shared/validator/interfaces";
import { AuthSchema } from "./schemas";
import { AuthErrorCode } from "./error";
import { BadRequestError } from "@/shared/errors";
import { HttpHelpers } from "@/shared/httpHelper";

export class AuthController implements IAuthController {
  constructor(
    private validatorService: IValidatorService,
    private authService: IAuthService,
  ) {}

  async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { value, error } = this.validatorService.validate<IAuthLogin>(
        AuthSchema.authenticate,
        req.body,
      );

      if (error) {
        throw new BadRequestError(
          "Missing or invalid parameters",
          AuthErrorCode.MISSING_OR_INVALID_PARAMETERS,
          this.validatorService.formatErrorMessage(error),
        );
      }

      const { email, password } = value;

      const token = await this.authService.authenticate(email, password);
      res.status(StatusCodes.OK).json(token);
    } catch (error) {
      const response = HttpHelpers.handleError(error);
      res.status(response.statusCode).json(response);
    }
  }
}
