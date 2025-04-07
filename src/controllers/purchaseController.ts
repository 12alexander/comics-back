import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService";
import { AuthRequest } from "../middlewares/auth";

export const purchaseComic = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await purchaseService.purchaseComic(req.params.comicId, req.userId as string);
    if (!result.success) {
      res.status(result.status).json({ message: result.message });
      return;
    }
    res.json({ message: "Compra exitosa", purchase: result.purchase });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getPurchases = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const purchases = await purchaseService.getPurchases(req.userId as string);
    res.json(purchases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
