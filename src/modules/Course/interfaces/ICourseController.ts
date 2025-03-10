import { Request, Response } from "express";

export interface ICourseController {
  create(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  findByFilters(req: Request, res: Response): Promise<void>;
}
