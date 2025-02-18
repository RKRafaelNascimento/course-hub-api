export interface IAuthService {
  authenticate(email: string, password: string): Promise<{ token: string }>;
}
