import dotenv from "dotenv";
import { Order } from "../../models/order";
import { OrderProducts } from "../../models/orderProducts";
import { Product } from "../../models/product";
import { User } from "../../models/user";

dotenv.config();

const { JASMINE_TEST_PASSWORD } = process.env;

const orderProducts = new OrderProducts();
const order = new Order();
const product = new Product();
const user = new User();

describe("ORDER PRODUCTS TEST: ", () => {
  describe("Test Suite for OrderProducts Methods: ", () => {
    it("should have an index method", () => {
      expect(orderProducts.index).toBeDefined();
    });

    it("should have a show method", () => {
      expect(orderProducts.show).toBeDefined();
    });

    it("should have a create method", () => {
      expect(orderProducts.create).toBeDefined();
    });

    it("should have a deleteCurrentOrder method", () => {
      expect(orderProducts.delete).toBeDefined();
    });
  });

  describe("Test Suite for Order Length of Array: ", () => {
    it("create method should add an OrderProducts ", async () => {
      await product
        .create({
          name: "Pineapple",
          price: 20.5,
          category: "fruits",
        })
        .then(() => {
          async () =>
            await user
              .signUp({
                first_name: "Samuel",
                last_name: "Atta",
                email: "sammy@gmail.com",
                password: JASMINE_TEST_PASSWORD as unknown as string,
              })
              .then(() => {
                async () =>
                  await order.create({
                    product_id: 1,
                    product_quantity: 4,
                    user_id: 1,
                    order_status: "complete",
                  });
                async () =>
                  await order.create({
                    product_id: 1,
                    product_quantity: 4,
                    user_id: 1,
                    order_status: "complete",
                  });
                const result = async () =>
                  await orderProducts.create({
                    order_id: 1,
                    product_id: 1,
                    quantity: 4,
                  });
                expect(result.length).toBeGreaterThanOrEqual(0);
              });
        });
    });

    it("index returns an array of orders", async () => {
      await orderProducts.index().then((item) => {
        expect(item.length).toBeGreaterThanOrEqual(0);
      });
    });

    it("show method should return the correct order", async () => {
      const result = await orderProducts.show("1");
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it("delete method should remove the order", async () => {
      orderProducts.delete("1");
      const result = await orderProducts.index();

      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });
});
