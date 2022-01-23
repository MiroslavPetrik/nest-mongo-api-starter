# nest-mongo-api-starter

Full-featured starter for Typescript Node & Mongo Rest API server featuring NestJS!

## Getting started

1. Install packages with `yarn install`
2. Create env file `cp .env.example .env`
   1. Configure mongo db URL (e.g. one pointing to Mongo Atlas)
3. Develop app `yarn start:dev` 

## What's Inside

- [dotenv environment variables](https://github.com/motdotla/dotenv#readme)
- [MongoDB/mongoose configuration](https://docs.nestjs.com/techniques/mongodb)
- [Passport authentication](https://docs.nestjs.com/techniques/authentication)
- [Validation with class-validator](https://docs.nestjs.com/techniques/validation)
- [Mailer](https://github.com/nest-modules/mailer)
- [Serve-static middleware](https://www.npmjs.com/package/@nest-middlewares/serve-static)
  - example files
    - [http://localhost:3001/public/swagger.png](http://localhost:3001/public/swagger.png)
    - [http://localhost:3001/public/tests.png](http://localhost:3001/public/tests.png)
- [Compression](https://docs.nestjs.com/techniques/compression)
- [Security with helmet](https://docs.nestjs.com/techniques/security)
- [Logging middleware (Bunyan)](https://docs.nestjs.com/techniques/logger)
- [Swagger documentation](https://docs.nestjs.com/recipes/swagger)
- [Access logs with Morgan interceptor](https://github.com/mentos1386/nest-morgan#readme)

### Authorization features with end-to-end tests:

![e2e Test output](public/tests.png?raw=true "swagger auth docs")

#### Features:
- user signup
- user activation
- user login
- user relogin
- password reset
- forgotten password

## Configuring swagger

![swagger auth docs](public/swagger.png?raw=true "swagger auth docs")


This project uses modular swagger configuration. Each feature has it's own swagger document.
Follow these steps to add new feature:

1. In feature folder create `feature.swagger.ts` file.
2. Call `setupSwaggerDocument` and export the returned function.
3. Register feature module in `feature.module.ts` by calling the exported function from step 2.
4. Access your document at `/docs/:featurePath`.

For a concrete example see the [auth](http://localhost:3001/docs/auth/) feature.

## More

This backend will play nicely with awesome [react-starter](https://github.com/Kamahl19/react-starter) create-react-app project written in Typescript!

## License
MIT
