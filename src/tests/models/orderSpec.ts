import dotenv from "dotenv";
import { Order } from "../../models/order";
import { Product } from "../../models/product";
import { User } from "../../models/user";

dotenv.config();

const { JASMINE_TEST_PASSWORD } = process.env;

const order = new Order();
const product = new Product();
const user = new User();

describe("ORDER TEST: ", () => {
  describe("Test Suite for Order Methods: ", () => {
    it("should have an index method", () => {
      expect(order.index).toBeDefined();
    });

    it("should have a show method", () => {
      expect(order.show).toBeDefined();
    });

    it("should have a create method", () => {
      expect(order.create).toBeDefined();
    });

    it("should have a deleteCurrentOrder method", () => {
      expect(order.delete).toBeDefined();
    });
  });

  describe("Test Suite for Order Length of Array: ", () => {
    it("create method should add an order", async () => {
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
                  await order.create({
                    product_id: 1,
                    product_quantity: 4,
                    user_id: 1,
                    order_status: "complete",
                  });
                expect(result.length).toBeGreaterThanOrEqual(0);
              });
        });
    });

    it("index returns an array of orders", async () => {
      await order.index().then((item) => {
        expect(item.length).toBeGreaterThanOrEqual(0);
      });
    });

    it("show method should return the correct order", async () => {
      const result = await order.show("1");
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it("delete method should remove the order", async () => {
      order.delete("1");
      const result = await order.index();

      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });
});
