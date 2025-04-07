import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthResult } from "../interfaces/interfaces";


export const register = async (name: string, lastName: string, email: string, password: string): Promise<AuthResult> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, status: 400, message: "El usuario ya existe" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, lastName, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return { success: true, status: 201, token };
};

export const login = async (email: string, password: string): Promise<AuthResult> => {
  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, status: 400, message: "Credenciales inválidas" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, status: 400, message: "Credenciales inválidas" };
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
  return { success: true, status: 200, token, userName: user.name || "" };
};
