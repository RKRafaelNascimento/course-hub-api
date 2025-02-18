import bcrypt from "bcrypt";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { ISecurityService } from "./interfaces";

export class SecurityService implements ISecurityService {
  constructor(private readonly saltRounds = 10) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(payload: object, expiresIn: string = "1h"): string {
    const options: SignOptions = {
      expiresIn: expiresIn as SignOptions["expiresIn"],
    };
    return jwt.sign(payload, process.env.JWT_SECRET || "JWT_SECRET", options);
  }

  verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET || "JWT_SECRET");
  }
}
