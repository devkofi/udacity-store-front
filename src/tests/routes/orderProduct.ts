import app from "../../server";
import supertest from "supertest";
import dotenv from "dotenv";
import { User } from "../../models/user";
import { OrderProducts } from "../../models/orderProducts";
dotenv.config();

const { JASMINE_TEST_PASSWORD } = process.env;

const order = new OrderProducts();
const user = new User();
const request = supertest(app);

describe("ORDER PRODUCTS ENPOINT TEST", () => {
  describe("Test Order Enpoint Responses", function () {
    it("get index endpoint", async () => {
      async () =>
        await user
          .signIn({
            email: "someone@gmail.com",
            password: JASMINE_TEST_PASSWORD as unknown as string,
          })
          .then(async () => {
            await order
              .create({
                order_id: 1,
                product_id: 1,
                quantity: 4,
              })
              .then(async () => {
                await order.create({
                  order_id: 2,
                  product_id: 2,
                  quantity: 10,
                });
              })
              .then(async () => {
                const response = await request.get("/orderproducts");
                expect(response.status).toBe(200);
              });
          });
    });

    it("show a specific order", async () => {
      async () =>
        await user
          .signIn({
            email: "someone@gmail.com",
            password: JASMINE_TEST_PASSWORD as unknown as string,
          })
          .then(async () => {
            const response = await request.get("/orderproducts/2");
            expect(response.status).toBe(200);
          });
    });

    it("delete entry", async () => {
      const response = await request.delete("/orderproducts/2");
      expect(response.status).toBe(200);
    });
  });
});
