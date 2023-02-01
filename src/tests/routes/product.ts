import app from "../../server"
import supertest from "supertest"

const request = supertest(app);

describe("Test Endpoint Responses", function () {
  it("get index endpoint", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("get popular product endpoint", async () => {
    const response = await request.get("/products/popular");
    expect(response.status).toBe(200);
  });

  it("get product by category", async () => {
    const response = await request.get("/products/fruits");
    expect(response.status).toBe(200);
  });

  it("get product with id=1", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });

});

describe("Test Service Endpoint Responses", function () {

  it("get popular product endpoint", async () => {
    const response = await request.get("/products/popular");
    expect(response.status).toBe(200);
  });

  it("get product by category", async () => {
    const response = await request.get("/products/fruits");
    expect(response.status).toBe(200);
  });

});

