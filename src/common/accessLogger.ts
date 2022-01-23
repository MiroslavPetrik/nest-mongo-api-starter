import {APP_INTERCEPTOR} from "@nestjs/core";
import {MorganInterceptor} from "nest-morgan";
import {Request, Response} from "express";
import RotatingFileStream from "rotating-file-stream";

import config from "../config";
import {createLogsDirectory} from "./helpers";

export const GlobalAccessLogger = {
  provide: APP_INTERCEPTOR,
  useClass:
    config.isDev() || config.isTest()
      ? MorganInterceptor("dev")
      : MorganInterceptor("combined", {
          skip: (_: Request, res: Response) => res.statusCode < 400,
          stream: RotatingFileStream("access.log", {
            path: createLogsDirectory(),
            interval: "1d",
            maxFiles: 10,
          }),
        }),
};
