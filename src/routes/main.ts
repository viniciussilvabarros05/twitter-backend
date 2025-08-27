import { Router } from "express";
import * as authController from "../controllers/auth";

export const mainRouter = Router();



mainRouter.post("/auth/signup", authController.signup);
// mainRouter.post("/auth/signip");

// mainRouter.post("/tweet");
// mainRouter.post("/tweet:id");
// mainRouter.get("/tweet/:id/answers");
// mainRouter.post("/tweet/:id/like");

// mainRouter.get("/user/:slug");
// mainRouter.get("/user/:slug/tweets");
// mainRouter.get("/user/:slug/follow");
// mainRouter.put("/user");
// mainRouter.put("/user/avatar");
// mainRouter.put("/user/cover");

// mainRouter.get("/feed");
// mainRouter.get("/search");
// mainRouter.get("/trending");
// mainRouter.get("/suggestions");
