# nest-mongo-api-starter

## Configuring swagger

This project uses modular swagger configuration. Each feature has it's own swagger document.
Follow these steps to add new feature:

1. In feature folder create `feature.swagger.ts` file.
2. Call `setupSwaggerDocument` and export the returned function.
3. Register feature module in `feature.module.ts` by calling the exported function from step 2.
4. Access your document at `/docs/:featurePath`.

For a concrete example see the `auth` feature.
