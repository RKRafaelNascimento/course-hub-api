import { AuthController, AuthService } from "./index";
import { IAuthController, IAuthService } from "./interfaces";
import { UserServiceFactory } from "@/modules/User";
import { ValidatorService } from "@/shared/validator";
import { SecurityService } from "@/shared/securityService";

export class AuthServiceFactory {
  private static instance: IAuthService;

  static getInstance(): IAuthService {
    if (!this.instance) {
      const userService = UserServiceFactory.getInstance();
      const securityService = new SecurityService();
      this.instance = new AuthService(userService, securityService);
    }
    return this.instance;
  }
}

export class AuthControllerFactory {
  private static instance: IAuthController;

  static getInstance(): IAuthController {
    if (!this.instance) {
      const authService = AuthServiceFactory.getInstance();
      const validatorService = ValidatorService.getInstance();
      this.instance = new AuthController(validatorService, authService);
    }
    return this.instance;
  }
}
