import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response} from "express";

import logger from "../logger";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    logger.info(req.method, req.originalUrl);
    next();
  }
}
