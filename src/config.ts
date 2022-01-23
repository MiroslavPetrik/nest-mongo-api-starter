export default {
  isDev,
  isProd,
  isTest,
  mail: {
    from: {
      name: "Your Name",
      address: "youremail@example.com",
    },
  },
  cors: {
    // https://github.com/expressjs/cors#configuration-options
    origin: process.env.CORS_ORIGIN,
    methods: "POST,GET,PUT,OPTIONS,DELETE",
    allowedHeaders:
      "Timezone-Offset,Origin,X-Requested-With,Content-Type,Accept,Authorization",
  },
  auth: {
    jwtTokenExpireInSec: "1d", // 1 day
    passwordResetExpireInMs: 60 * 60 * 1000, // 1 hour
    activationExpireInMs: 24 * 60 * 60 * 1000, // 1 day
    saltRounds: 10,
  },
  static: {
    maxAge: isProd() ? "1d" : 0,
  },
};

function isDev() {
  return process.env.NODE_ENV === "development";
}

function isProd() {
  return process.env.NODE_ENV === "production";
}

function isTest() {
  return process.env.NODE_ENV === "test";
}
