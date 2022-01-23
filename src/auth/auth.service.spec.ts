import {Test, TestingModule} from "@nestjs/testing";
import {JwtService} from "@nestjs/jwt";

import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";

jest.mock("@nestjs/jwt");
jest.mock("../user/user.service.ts");

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, JwtService, AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
