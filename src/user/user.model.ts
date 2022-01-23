import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./user.schema";

export const UserModel = MongooseModule.forFeature([
  {name: "User", schema: UserSchema},
]);
