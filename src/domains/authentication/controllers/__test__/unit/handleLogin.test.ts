import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import request from "supertest";

import db from "@src/db";
import {
  INVALID_PASSWORD,
  LOGIN_SUCCESS,
  USER_NOT_FOUND_IN_DB,
} from "@src/constants/messages/const.messages";
import app from "@src/server";

describe("POST /authentication/login", () => {
  const endpoint = "/authentication/login";

  test("should throw error if no email or password provided", async () => {
    const response = await request(app).post(endpoint).send({
      email: "",
      password: "",
    });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);
  });

  test("should throw error if email is invalid", async () => {
    const response = await request(app).post(endpoint).send({
      email: "invalidemail",
      password: "password",
    });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
  });

  test("should return an error message for non-existent user", async () => {
    jest.spyOn(db.user, "findUnique").mockResolvedValue(null);

    const response = await request(app)
      .post(endpoint)
      .send({ email: "nonexistent@example.com", password: "password" });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).toBe(USER_NOT_FOUND_IN_DB);
  });

  test("should return a token and user object on successful login", async () => {
    const user = {
      id: "1",
      email: "test@example.com",
      password: await bcrypt.hash("password", 10),
      name: "Test User",
      avatar: "https://example.com/avatar.png",
      role: "DEVELOPER",
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId: '2',
    };

    jest.spyOn(db.user, "findUnique").mockResolvedValue(user);

    const response = await request(app)
      .post(endpoint)
      .send({ email: "test@example.com", password: "password" });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data.token).toBeTruthy();
    expect(response.body.data.user).toBeTruthy();
    expect(response.body.message).toBe(LOGIN_SUCCESS);
  });

  test("should return an error message for invalid password", async () => {
    const user = {
      id: "1",
      email: "test@example.com",
      password: await bcrypt.hash("password", 10),
      name: "Test User",
      avatar: "https://example.com/avatar.png",
      role: "DEVELOPER",
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId: '2',
    };

    jest.spyOn(db.user, "findUnique").mockResolvedValue(user);

    jest.spyOn(bcrypt, "compareSync").mockReturnValue(false);

    const response = await request(app)
      .post(endpoint)
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.message).toBe(INVALID_PASSWORD);
  });
});
