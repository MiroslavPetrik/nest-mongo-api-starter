import helmet from "helmet";
import * as compression from "compression";
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";

import {setupSwaggerDocuments} from "./common/swagger";
import {AppModule} from "./app.module";
import config from "./config";

/**
 * Helper to be used here & in tests.
 * @param app
 */
export const configureApp = (app: any) => {
  if (config.cors) {
    app.enableCors(config.cors);
  }
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureApp(app);

  setupSwaggerDocuments(app);

  await app.listen(process.env.PORT!);
}
