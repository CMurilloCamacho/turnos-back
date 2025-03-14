"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const userControllers_1 = require("../controllers/userControllers");
userRouter.get("/", (req, res) => (0, userControllers_1.getUsersController)(req, res));
userRouter.get('/:id', (req, res) => (0, userControllers_1.getUserByIdController)(req, res));
userRouter.post("/register", (req, res) => (0, userControllers_1.registerUserController)(req, res));
userRouter.post("/login", (req, res) => (0, userControllers_1.loginUserController)(req, res));
exports.default = userRouter;
F