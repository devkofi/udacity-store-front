import app from "../../server"
import supertest from "supertest"

const request = supertest(app);

describe("Test Endpoint Responses", function () {
  it("get index endpoint", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(401);
  });

  it("show a specific order", async () => {
    const response = await request.get("/orders/1");
    expect(response.status).toBe(401);
  });

});

describe("Test Service Endpoint Responses", function () {

  it("show completed orders", async () => {
    const response = await request.get("/orders/1/complete");
    expect(response.status).toBe(401);
  });

});


