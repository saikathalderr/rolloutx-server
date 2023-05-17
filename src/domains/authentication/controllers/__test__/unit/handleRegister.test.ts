import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import app from "@src/server";
import db from "@src/db";
import { StatusCodes } from "http-status-codes";

describe("POST /authentication/register", () => {
  const endpoint = "/authentication/register";

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should throw error if empty request body", async () => {
    const user = {
      id: "1",
      email: "test@example.com",
      password: await bcrypt.hash("password", 10),
      name: "Test User",
      avatar: "https://example.com/avatar.png",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId: "2",
    };

    const token = jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    const response = await request(app)
      .post(endpoint)
      .set("authorization", token)
      .send({
        role: "DEVELOPER",
      });

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body.errors).toHaveLength(3);
  });
});
