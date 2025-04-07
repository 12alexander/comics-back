import { Request, Response } from "express";
import { validationResult } from "express-validator";
import * as comicService from "../services/comicService";
import { AuthRequest } from "../middlewares/auth";

export const createComic = async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const comic = await comicService.createComic(req.body, req.userId as string);
    res.status(201).json(comic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getComics = async (req: Request, res: Response): Promise<void> => {
  try {
    const comics = await comicService.getComics();
    res.json(comics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getComicById = async (req: Request, res: Response): Promise<void> => {
  try {
    const comic = await comicService.getComicById(req.params.id);
    if (!comic) {
      res.status(404).json({ message: "Cómic no encontrado" });
      return;
    }
    res.json(comic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateComic = async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const comic = await comicService.updateComic(req.params.id, req.body, req.userId as string);
    if (!comic) {
      res.status(404).json({ message: "Cómic no encontrado o no autorizado" });
      return;
    }
    res.json(comic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const deleteComic = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const success = await comicService.deleteComic(req.params.id, req.userId as string);
    if (!success) {
      res.status(404).json({ message: "Cómic no encontrado o no autorizado" });
      return;
    }
    res.json({ message: "Cómic eliminado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
