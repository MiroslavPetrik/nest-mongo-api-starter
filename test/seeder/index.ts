import * as mongoose from "mongoose";
import {Seeder} from "mongoose-seed-2";

import {hashPassword} from "../../src/common/auth";
import {UserSchema} from "../../src/user/user.schema";
import config from "../../src/config";

const UserModel = mongoose.model("User", UserSchema);

const seeder = new Seeder(process.env.MONGO_URL!);

export default {
  async initialize() {
    const data = await getData();
    await seeder.clearModels(["User"]);
    await UserModel.collection.drop();
    await seeder.populateModels(data);

    (console as any).info("DB seed was successful");
  },

  async disconnect() {
    await seeder.disconnect();
  },
};

async function getData() {
  return {
    User: [
      {
        _id: "507f1f77bcf86cd799439011",
        email: "foo@bar.com",
        isActive: false,
        activationToken: "16d12e06-6119-4b6e-b9c2-6530fd2f591a",
        activationExpires: Date.now() + config.auth.activationExpireInMs,
        passwordResetToken: "3bdafa11-c3d0-4f15-8811-ce4ab2da2eba",
        passwordResetExpires: Date.now() + config.auth.passwordResetExpireInMs,
        password: await hashPassword("password"),
      },
    ],
  };
}
