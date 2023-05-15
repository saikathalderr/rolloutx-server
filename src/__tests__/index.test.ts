import request from "supertest";
import app from "@src/server";

describe("Index", () => {
  test("responds to GET / endpoint with 'OK'", async () => {
    request(app).get("/").expect(200);
  });
});
