import * as path from "path";
import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {MailerModule} from "@nest-modules/mailer";
import {ServeStaticMiddleware} from "@nest-middlewares/serve-static";
import {MorganModule} from "nest-morgan";

import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import {GlobalAccessLogger} from "./common/accessLogger";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import config from "./config";

const DEV_TRANSPORTER = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ethereal.user@ethereal.email",
    pass: "verysecret",
  },
};

@Module({
  imports: [
    AuthModule,
    MorganModule,
    MongooseModule.forRoot(process.env.MONGO_URL!),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.MAILGUN_TRANSPORT || DEV_TRANSPORTER,
        defaults: {
          from: config.mail.from,
        },
      }),
    }),
    UserModule,
  ],
  providers: config.isTest() ? undefined : [GlobalAccessLogger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    ServeStaticMiddleware.configure(
      path.resolve(__dirname, "..", "public"),
      config.static,
    );
    consumer.apply(ServeStaticMiddleware).forRoutes("public");

    if (!config.isTest()) {
      consumer.apply(LoggerMiddleware).forRoutes("api");
    }
  }
}
