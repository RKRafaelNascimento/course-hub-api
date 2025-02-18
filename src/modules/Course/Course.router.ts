import { Router } from "express";
import { CourseControllerFactory } from ".";
import { AuthMiddleware } from "@/modules/Auth";

const router = Router();
const courseController = CourseControllerFactory.getInstance();

router.post("/course", AuthMiddleware.verifyToken, (req, res) =>
  courseController.create(req, res),
);

router.delete("/course/:id", AuthMiddleware.verifyToken, (req, res) =>
  courseController.delete(req, res),
);

export default router;
