import {Document} from "mongoose";

export type UserPublicData = Readonly<{
  id: string;
  email: string;
  isActive: boolean;
}>;

export type UserMethods = {
  getPublicData: () => UserPublicData;
};

export type User = Readonly<{
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: string;
  isActive: boolean;
  activationExpires: string;
  activationToken: string;
}> &
  UserMethods &
  Document;
