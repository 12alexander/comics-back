import { PurchaseResult } from "../interfaces/interfaces";
import Comic from "../models/Comic";
import Purchase from "../models/Purchase";

export const purchaseComic = async (comicId: string, userId: string): Promise<PurchaseResult> => {
  const comic = await Comic.findById(comicId);
  if (!comic) {
    return { success: false, status: 404, message: "Cómic no encontrado" };
  }
  if (comic.amount <= 0) {
    return { success: false, status: 400, message: "Cómic agotado" };
  }
  
  comic.amount -= 1;
  await comic.save();

  const purchase = new Purchase({
    user: userId,
    comic: comic._id,
  });
  await purchase.save();

  return { success: true, status: 200, message: "Compra exitosa", purchase };
};

export const getPurchases = async (userId: string) => {
  return Purchase.find({ user: userId }).populate("comic");
};
