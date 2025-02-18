import { JwtPayload } from "jsonwebtoken";

export interface ISecurityService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateToken(payload: object, expiresIn?: string): string;
  verifyToken(token: string): string | JwtPayload;
}
