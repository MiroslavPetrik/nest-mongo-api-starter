import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { UserMailerService } from './user.mailer.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserMailerService, UserService],
  exports: [UserService],
})
export class UserModule {}
