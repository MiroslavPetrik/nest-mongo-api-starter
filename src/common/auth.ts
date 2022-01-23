import * as bcrypt from "bcryptjs";
import {Request} from "express";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(
    password,
    await bcrypt.genSalt(parseInt(process.env.AUTH_SALT_ROUNDS!, 10)),
  );

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);

export const getOriginHeader = ({headers: {origin}}: Request): string => {
  if (origin) {
    return typeof origin === "string" ? origin : origin[0];
  }
  return "";
};
