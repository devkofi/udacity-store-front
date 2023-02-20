import app from "../../server";
import supertest from "supertest";
import { User } from "../../models/user";
import dotenv from "dotenv";

const request = supertest(app);

dotenv.config();

const { JASMINE_TEST_PASSWORD } = process.env;

const user = new User();

describe("USER ENPOINT TEST", () => {
  describe("Test User Endpoint Responses", function () {
    it("get index endpoint", async () => {
      async () =>
        await user
          .signUp({
            first_name: "Kofi Nyarko",
            last_name: "Kumi",
            email: "someone@gmail.com",
            password: JASMINE_TEST_PASSWORD as unknown as string,
          })
          .then(async () => {
            const response = await request.get("/users");
            expect(response.status).toBe(200);
          });
    });

    it("get user with an id of 1", async () => {
      async () =>
        await user
          .signIn({
            email: "someone@gmail.com",
            password: JASMINE_TEST_PASSWORD as unknown as string,
          })
          .then(async () => {
            const response = await request.get("/users/1");
            expect(response.status).toBe(200);
          });
    });
  });
});
