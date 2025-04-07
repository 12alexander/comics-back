import { Router } from "express";
import { check } from "express-validator";
import { register, login } from "../controllers/authController";

const router = Router();

router.get("/", (req, res) => {
  res.send("Bienvenido a la API de autenticación");
});

router.post(
  "/register",
  [
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    check("name").notEmpty(),
    check("lastName").notEmpty()
  ],
  register
);

router.post(
  "/login",
  [check("email").isEmail(), check("password").exists()],
  login
);

export default router;
