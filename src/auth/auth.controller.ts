import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  UseGuards,
  Body,
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Request} from "express";

import {
  ActivateParams,
  ForgottenPasswordDto,
  ResetPasswordDto,
  SignUpDto,
  LoginDto,
} from "./auth.interface";
import {AuthService} from "./auth.service";
import {getOriginHeader} from "../common/auth";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("auth")
@Controller("api")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("activate/:userId/:activationToken")
  activate(@Param() params: ActivateParams, @Param("userId") userId: string) {
    return this.authService.activate(params);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Req() req: Request, @Body() loginDto: LoginDto) {
    // TODO: remove loginDto, swagger should find it somehow by exploring the AuthGuard
    return this.authService.login(req.user);
  }

  @Post("signup")
  async signup(@Body() signUpDto: SignUpDto, @Req() req: Request) {
    return this.authService.signUpUser(signUpDto, getOriginHeader(req));
  }

  @UseGuards(AuthGuard())
  @Get("me")
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthGuard())
  @Get("relogin")
  relogin(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post("forgotten-password")
  forgottenPassword(@Body() body: ForgottenPasswordDto, @Req() req: Request) {
    return this.authService.forgottenPassword(body, getOriginHeader(req));
  }

  @Post("reset-password")
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body);
  }
}
