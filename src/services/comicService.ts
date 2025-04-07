import { ComicData } from "../interfaces/interfaces";
import Comic from "../models/Comic";

export const createComic = async (comicData: ComicData, userId: string) => {
  const comic = new Comic({
    ...comicData,
    creator: userId,
  });
  await comic.save();
  return comic;
};

export const getComics = async () => {
  return Comic.find().sort({ createdAt: -1 });
};

export const getComicById = async (id: string) => {
  return Comic.findById(id);
};

export const updateComic = async (id: string, updateData: ComicData, userId: string) => {
  const comic = await Comic.findById(id);
  if (!comic) return null;
  if (comic.creator.toString() !== userId) return null;
  Object.assign(comic, updateData);
  await comic.save();
  return comic;
};

export const deleteComic = async (id: string, userId: string): Promise<boolean> => {
  const comic = await Comic.findById(id);
  if (!comic || comic.creator.toString() !== userId) return false;
  await comic.deleteOne();
  return true;
};
