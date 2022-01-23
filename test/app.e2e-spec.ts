import {Test, TestingModule} from "@nestjs/testing";
import * as request from "supertest";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({path: path.resolve(__dirname, ".env")});

import {AppModule} from "../src/app.module";
import {configureApp} from "../src/bootstrap";

import seeder from "./seeder";

describe("AppController (e2e)", () => {
  let app: any;

  beforeAll(async () => {
    await seeder.initialize();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
  });

  describe("/api/activate/:userId/:activationToken", () => {
    it("should fail with status 403 when sent invalid activation token", () => {
      return request(app.getHttpServer())
        .get(
          `/api/activate/507f1f77bcf86cd799439011/16d12e06-6119-4b6e-b9c2-6530fd2f591b`,
        )
        .expect(403);
    });

    it("should succeed with status 200 when sent valid activation token", () => {
      return request(app.getHttpServer())
        .get(
          `/api/activate/507f1f77bcf86cd799439011/16d12e06-6119-4b6e-b9c2-6530fd2f591a`,
        )
        .expect(200);
    });
  });

  describe("/api/login (POST)", () => {
    it("should fail with status 401 when posted incorrect body params", () => {
      return request(app.getHttpServer())
        .post("/api/login")
        .send({incorrect: "field"})
        .expect(401);
    });

    it("should fail with status 404 when email does not exist", async () => {
      const {status} = await request(app.getHttpServer())
        .post("/api/login")
        .send({email: "doesnt@exist.com", password: "password"});

      expect(status).toBe(404);
    });

    it("should fail with status 401 when posted incorrect credentials", async () => {
      const {status} = await request(app.getHttpServer())
        .post("/api/login")
        .send({email: "foo@bar.com", password: "notInDatabase"});

      expect(status).toBe(401);
    });

    it("should succeed with status 201 and return token when posted correct credentials", async () => {
      const {status, body} = await request(app.getHttpServer())
        .post("/api/login")
        .send({email: "foo@bar.com", password: "password"});

      expect(status).toBe(201);
      expect(body.token).toBeDefined();
    });
  });

  describe("/api/signup (POST)", () => {
    it("should fail with status 400 when email has wrong form", async () => {
      const {status} = await request(app.getHttpServer())
        .post("/api/signup")
        .send({email: "email", password: "password"});

      expect(status).toBe(400);
    });

    it("should fail with status 409 for existing email", () => {
      return request(app.getHttpServer())
        .post("/api/signup")
        .send({email: "foo@bar.com", password: "password"})
        .expect(409);
    });

    it("should succeed with status 201 and return user with token when valid data provided", async () => {
      const {status, body} = await request(app.getHttpServer())
        .post("/api/signup")
        .send({email: "email@email.com", password: "password"});

      expect(status).toBe(201);
      expect(body.token).toBeDefined();
      expect(body.user).toBeDefined();
    });
  });

  describe("/api/me (GET)", () => {
    let token: string;

    beforeAll(async () => {
      const {body} = await request(app.getHttpServer())
        .post("/api/login")
        .send({email: "foo@bar.com", password: "password"});

      token = body.token;
    });

    it("should fail with status 401 when provided invalid authorization header", () => {
      return request(app.getHttpServer()).get("/api/me").expect(401);
    });

    it("should succeed with status 200 when provided valid authorization header", async () => {
      const {status, body} = await request(app.getHttpServer())
        .get("/api/me")
        .set("Authorization", `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body.email).toBeDefined();
    });
  });

  describe("/api/relogin (GET)", () => {
    let token: string;

    beforeAll(async () => {
      const {body} = await request(app.getHttpServer())
        .post("/api/login")
        .send({email: "foo@bar.com", password: "password"});

      token = body.token;
    });

    it("should succeed with status 200 and return new token when provided valid authorization header", async () => {
      const {status, body} = await request(app.getHttpServer())
        .get("/api/relogin")
        .set("Authorization", `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body.token).toBeDefined();
    });

    it("should fail with status 401 when provided invalid authorization header", () => {
      return request(app.getHttpServer()).get("/api/relogin").expect(401);
    });
  });

  describe("/api/reset-password (POST)", () => {
    it("should fail with status 403 when provided invalid passwordResetToken", async () => {
      const {status} = await request(app.getHttpServer())
        .post("/api/reset-password")
        .send({
          email: "foo@bar.com",
          passwordResetToken: "3bdafa11-c3d0-4f15-8811-ce4ab2da2ebb",
          password: "newPassword",
        });
      expect(status).toBe(403);
    });

    it("should succeed with status 200 and login body when provided valid passwordResetToken", async () => {
      const {status, body} = await request(app.getHttpServer())
        .post("/api/reset-password")
        .send({
          email: "foo@bar.com",
          passwordResetToken: "3bdafa11-c3d0-4f15-8811-ce4ab2da2eba",
          password: "newPassword",
        });

      expect(status).toBe(201);
      expect(body.token).toBeDefined();
      expect(body.user).toBeDefined();
    });

    describe("after password reset", () => {
      it("should be able to log in with the new password", () => {
        return request(app.getHttpServer())
          .post("/api/login")
          .send({email: "foo@bar.com", password: "newPassword"})
          .expect(201);
      });
    });
  });

  describe("/api/forgotten-password (POST)", () => {
    it("should fail with status 400 when email malformed", async () => {
      const {status} = await request(app.getHttpServer())
        .post("/api/forgotten-password")
        .send({email: "unknown"});

      expect(status).toBe(400);
    });

    it("should fail with status 404 when email not found", async () => {
      const {status} = await request(app.getHttpServer())
        .post("/api/forgotten-password")
        .send({email: "unknown@email.com"});

      expect(status).toBe(404);
    });

    it("should succeed with status 200 when email found", async () => {
      const {status} = await request(app.getHttpServer())
        .post("/api/forgotten-password")
        .send({email: "foo@bar.com"});

      expect(status).toBe(201);
    });
  });

  afterAll(async () => {
    await seeder.disconnect();

    await app.close();
  });
});
