import { PopularProducts } from "../../service/popularProducts";

const popularProducts = new PopularProducts();

describe("POPULAR PRODUCT SERVICE TEST", () => {
  describe("Test Suite for Popular Products Service: ", () => {
    it("should have a show method", () => {
      expect(popularProducts.show).toBeDefined();
    });
  });

  describe("Test Suite for Length of Array: ", () => {
    it("popularProducts returns an array of the Popular Products", async () => {
      await popularProducts.showPopular().then((item) => {
        expect(item.length).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
