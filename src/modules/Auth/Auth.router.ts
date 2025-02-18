import { Router } from "express";
import { AuthControllerFactory } from ".";

const router = Router();
const authController = AuthControllerFactory.getInstance();

router.post("/login", authController.authenticate.bind(authController));

export default router;
