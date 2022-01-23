import {Module} from "@nestjs/common";

import {UserMailerService} from "./user.mailer.service";
import {UserService} from "./user.service";
import {UserModel} from "./user.model";

@Module({
  imports: [UserModel],
  providers: [UserMailerService, UserService],
  exports: [UserService],
})
export class UserModule {}
