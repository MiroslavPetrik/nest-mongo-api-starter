import { SwaggerBaseConfig, SwaggerModule } from '@nestjs/swagger';

interface Document {
  path: string;
  config: SwaggerBaseConfig;
  module: any;
}

const documents: Document[] = [];

/**
 * Registers a swagger document for a module to be later setup.
 */
export const setupSwaggerDocument = (
  path: string,
  config: SwaggerBaseConfig,
) => (module: any) => documents.push({ path, config, module });

/**
 * Configure swagger /docs endpoints for each defined document
 */
export const setupSwaggerDocuments = (app: any) =>
  documents.forEach(({ path, config, module }) => {
    SwaggerModule.setup(
      `docs/${path}`,
      app,
      SwaggerModule.createDocument(app, config, { include: [module] }),
    );
  });
