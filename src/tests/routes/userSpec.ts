import app from "../../server"
import supertest from "supertest"

const request = supertest(app);

describe("Test Endpoint Responses", function () {
  it("get index endpoint", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(401);
  });

  it("get user with an id of 1", async () => {
    const response = await request.get("/users/1");
    expect(response.status).toBe(200);
  });

});
