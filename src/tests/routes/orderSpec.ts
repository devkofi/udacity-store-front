import app from "../../server"
import supertest from "supertest"
import { Order } from '../../models/order';
import dotenv from 'dotenv';
import { User } from "../../models/user";
dotenv.config();

const {JASMINE_TEST_PASSWORD} = process.env;

const order = new Order();
const user = new User();
const request = supertest(app);

describe("ORDER ENPOINT TEST", ()=>{
  describe("Test Order Enpoint Responses", function () {
    it("get index endpoint", async () => {
      async ()=> await user.signIn({
        email: "someone@gmail.com",
        password: (JASMINE_TEST_PASSWORD as unknown) as string
      }).then(async ()=>{
        await order.create({
          product_id: 2,
          product_quantity: 4,
          user_id: 2,
          order_status: "complete"
        })
        .then(async ()=>{
          await order.create({
            product_id: 2,
            product_quantity: 5,
            user_id: 2,
            order_status: "complete"
          })
        })
        .then(async ()=>{
        const response = await request.get("/orders");
        expect(response.status).toBe(200);
      })
      
    })});
  
    it("show a specific order", async () => {
      async ()=> await user.signIn({
        email: "someone@gmail.com",
        password: (JASMINE_TEST_PASSWORD as unknown) as string
      }).then(async ()=>{
        const response = await request.get("/orders/2");
        expect(response.status).toBe(200);
      })
      
    });
  });
  
  
  describe("Test Order Service Endpoint Responses", function () {
    it("show completed orders", async () => {
      const response = await request.get("/orders/2/complete");
      expect(response.status).toBe(200);
    });
  
  });
});




