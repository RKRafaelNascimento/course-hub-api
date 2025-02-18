import { Request, Response } from "express";

export interface ICourseController {
  create(req: Request, res: Response): Promise<void>;
}
