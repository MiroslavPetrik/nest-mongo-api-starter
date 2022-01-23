import {Strategy} from "passport-local";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";

import {AuthService} from "./auth.service";
import {User} from "../user/user.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return await this.authService.validateUser(email, password);
  }
}
