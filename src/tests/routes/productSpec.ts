import app from "../../server";
import supertest from "supertest";
import { Product } from "../../models/product";
import dotenv from "dotenv";

dotenv.config();

const request = supertest(app);

const product = new Product();

describe("PRODUCT ENDPOINT TEST", () => {
  describe("Test Product Endpoint Responses", function () {
    beforeAll(function () {
      async () => {
        await product.create({
          name: "Pineapple",
          price: 20.5,
          category: "fruits",
        });
      };
    });

    it("get index endpoint", async () => {
      const response = await request.get("/products");
      expect(response.status).toBe(200);
    });

    it("get product with id=1", async () => {
      const response = await request.get("/products/1");
      expect(response.status).toBe(200);
    });
  });

  describe("Test Product Service Endpoint Responses", function () {
    it("get popular product endpoint", async () => {
      const response = await request.get("/products/popular/5");
      expect(response.status).toBe(200);
    });

    it("get product by category", async () => {
      const response = await request.get("/products/category/fruits");
      expect(response.status).toBe(200);
    });
  });
});
