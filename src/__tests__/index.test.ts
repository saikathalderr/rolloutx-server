import request from "supertest";
import expressServer from "@src/server";
import { Server } from "http";

describe("Index", () => {
  let app: Server;

  beforeAll(() => {
    app = expressServer.listen(3000);
  });

  afterAll((done) => {
    app.close(done);
  });

  test("responds to GET / endpoint with 'OK'", async () => {
    request(app).get("/").expect(200);
  });
});
