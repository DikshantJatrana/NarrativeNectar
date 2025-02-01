import jwt from "jsonwebtoken";
import { UserInterface } from "@/lib/interfaceTypescript";
const secret: string = process.env.SECRET || "defaultSecret";

export function setToken(user: UserInterface): string {
  return jwt.sign(user, secret);
}
export function getToken(token: string): UserInterface {
  return jwt.verify(token, secret) as UserInterface;
}
