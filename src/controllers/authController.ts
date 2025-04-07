import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const result = await authService.register(req.body.name, req.body.lastName, req.body.email, req.body.password);
    if (!result.success) {
      res.status(result.status).json({ message: result.message });
      return;
    }

    res.status(201).json({ token: result.token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const result = await authService.login(req.body.email, req.body.password);
    if (!result.success) {
      res.status(result.status).json({ message: result.message });
      return;
    }
    res.json({ token: result.token, userName: result.userName }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
