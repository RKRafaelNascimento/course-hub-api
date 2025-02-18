import { AuthService } from "@/modules/Auth";
import { UnauthorizedError } from "@/shared/errors";
import { ISecurityService } from "@/shared/securityService/interfaces";
import { IAuthService } from "@/modules/Auth/interfaces/IAuthService";
import { IUserService } from "@/modules/User/Interfaces";
import { AuthErrorCode } from "@/modules/Auth/error";

describe("AuthService", () => {
  let authService: IAuthService;
  let mockUserService: jest.Mocked<IUserService>;
  let mockSecurityService: jest.Mocked<ISecurityService>;

  beforeEach(() => {
    mockUserService = {
      getByEmail: jest.fn(),
    } as unknown as jest.Mocked<IUserService>;

    mockSecurityService = {
      comparePassword: jest.fn(),
      generateToken: jest.fn(),
    } as unknown as jest.Mocked<ISecurityService>;

    authService = new AuthService(mockUserService, mockSecurityService);
  });

  describe("Method: authenticate", () => {
    it("Should return a token when valid email and password are provided", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashed_password",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = "valid_token";

      mockUserService.getByEmail.mockResolvedValue(mockUser);
      mockSecurityService.comparePassword.mockResolvedValue(true);
      mockSecurityService.generateToken.mockReturnValue(mockToken);

      const result = await authService.authenticate(
        "test@example.com",
        "password",
      );

      expect(mockUserService.getByEmail).toHaveBeenCalledWith(
        "test@example.com",
      );
      expect(mockSecurityService.comparePassword).toHaveBeenCalledWith(
        "password",
        mockUser.password,
      );
      expect(mockSecurityService.generateToken).toHaveBeenCalledWith({
        userId: mockUser.id,
        email: mockUser.email,
      });

      expect(result).toEqual({ token: mockToken });
    });

    it("Should throw UnauthorizedError when email is not found", async () => {
      mockUserService.getByEmail.mockResolvedValue(null);

      await expect(
        authService.authenticate("invalid@example.com", "password"),
      ).rejects.toThrow(
        new UnauthorizedError(
          "Invalid credentials",
          AuthErrorCode.INVALID_CREDENTIALS,
        ),
      );

      expect(mockUserService.getByEmail).toHaveBeenCalledWith(
        "invalid@example.com",
      );
      expect(mockSecurityService.comparePassword).not.toHaveBeenCalled();
      expect(mockSecurityService.generateToken).not.toHaveBeenCalled();
    });

    it("Should throw UnauthorizedError when password is incorrect", async () => {
      const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashed_password",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserService.getByEmail.mockResolvedValue(mockUser);
      mockSecurityService.comparePassword.mockResolvedValue(false);

      await expect(
        authService.authenticate("test@example.com", "wrongpassword"),
      ).rejects.toThrow(
        new UnauthorizedError(
          "Invalid credentials",
          AuthErrorCode.INVALID_CREDENTIALS,
        ),
      );

      expect(mockUserService.getByEmail).toHaveBeenCalledWith(
        "test@example.com",
      );
      expect(mockSecurityService.comparePassword).toHaveBeenCalledWith(
        "wrongpassword",
        mockUser.password,
      );
      expect(mockSecurityService.generateToken).not.toHaveBeenCalled();
    });
  });
});
