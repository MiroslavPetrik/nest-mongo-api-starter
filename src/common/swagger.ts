import { SwaggerBaseConfig, SwaggerModule } from '@nestjs/swagger';

const documents = [];

/**
 * Registers a swagger document for a module to be later setup.
 */
export const setupSwaggerDocument = (
  path: string,
  config: SwaggerBaseConfig,
) => module => documents.push({ path, config, module });

/**
 * Configure swagger /docs endpoints for each defined document
 */
export const setupSwaggerDocuments = app =>
  documents.forEach(({ path, config, module }) => {
    SwaggerModule.setup(
      `docs/${path}`,
      app,
      SwaggerModule.createDocument(app, config, { include: [module] }),
    );
  });
