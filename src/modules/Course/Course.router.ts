import { Router } from "express";
import { CourseControllerFactory } from ".";
import { AuthMiddleware } from "@/modules/Auth";

const router = Router();
const courseController = CourseControllerFactory.getInstance();

router.post("/courses", AuthMiddleware.verifyToken, (req, res) =>
  courseController.create(req, res),
);

router.delete("/courses/:id", AuthMiddleware.verifyToken, (req, res) =>
  courseController.delete(req, res),
);

router.get("/courses/:id", AuthMiddleware.verifyToken, (req, res) =>
  courseController.getById(req, res),
);

router.put("/courses/:id", AuthMiddleware.verifyToken, (req, res) =>
  courseController.update(req, res),
);

router.get("/courses", AuthMiddleware.verifyToken, (req, res) =>
  courseController.findByFilters(req, res),
);

export default router;
