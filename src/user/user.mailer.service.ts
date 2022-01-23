import {Injectable} from "@nestjs/common";
import {MailerService} from "@nest-modules/mailer";

import config from "../config";

@Injectable()
export class UserMailerService {
  constructor(private readonly mailerService: MailerService) {}

  sendActivationMail(
    email: string,
    userId: string,
    activationToken: string,
    origin: string,
  ) {
    if (!config.isTest()) {
      this.mailerService
        .sendMail({
          to: email,
          subject: "Activate your account",
          text: `Please click on the following link, or paste this into your browser to activate your account:\n
${origin}/activate/${userId}/${activationToken}\n`,
        })
        .catch();
    }
  }

  sendForgottenPasswordMail(
    to: string,
    passwordResetToken: string,
    origin: string,
  ) {
    if (!config.isTest()) {
      this.mailerService
        .sendMail({
          to,
          subject: "Reset your password",
          text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n
Please click on the following link, or paste this into your browser to complete the process:\n
${origin}/auth/reset-password/${passwordResetToken}\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        })
        .catch();
    }
  }

  sendResetPasswordMail(email: string) {
    if (!config.isTest()) {
      this.mailerService
        .sendMail({
          to: email,
          subject: "Your password has been changed",
          text: `Hello,\n\nThis is a confirmation that the password for your account ${email} has just been changed.\n`,
        })
        .catch();
    }
  }
}
