import { UnauthorizedError } from "@/shared/errors";
import { ISecurityService } from "@/shared/securityService/interfaces";
import { IAuthService } from "./interfaces/IAuthService";
import { IUserService } from "@/modules/User/Interfaces";
import { AuthErrorCode } from "./error";

export class AuthService implements IAuthService {
  constructor(
    private userService: IUserService,
    private securityService: ISecurityService,
  ) {}

  async authenticate(
    email: string,
    password: string,
  ): Promise<{ token: string }> {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedError(
        "Invalid credentials",
        AuthErrorCode.INVALID_CREDENTIALS,
      );
    }

    const isPasswordValid = await this.securityService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError(
        "Invalid credentials",
        AuthErrorCode.INVALID_CREDENTIALS,
      );
    }

    const token = this.securityService.generateToken({
      userId: user.id,
      email: user.email,
    });

    return { token };
  }
}
