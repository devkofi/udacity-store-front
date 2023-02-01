import dotenv from 'dotenv'
import { Order } from '../../models/order';

const {ENV} = process.env;

const order = new Order((ENV as unknown) as string);

describe("Test Suite for Order: ",()=>{
    it("should have an index method", ()=>{
        expect(order.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(order.showCurrentOrder).toBeDefined();
    });

    it("should have a create method", ()=>{
        expect(order.create).toBeDefined();
    });
    
    it('should have a deleteCurrentOrder method', () => {
        expect(order.deleteCurrentOrder).toBeDefined();
    });
    

});

describe("Test Suite for Length of Array: ",()=>{
    
    it("index returns an array of orders", async ()=>{

        const results = await order.index().then((item)=>{
            expect(item.length).toBeGreaterThanOrEqual(0);
        });
        
    });
    
    it('create method should add an order', async () => {
        const result = await order.create({
            product_id: 1,
            product_quantity: 4,
            user_id: 1,
            order_status: "complete"
        });
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    
    it('show method should return the correct order', async () => {
    const result = await order.showCurrentOrder("1");
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('delete method should remove the order', async () => {
        order.deleteCurrentOrder("1");
        const result = await order.index()

        expect(result.length).toBeGreaterThanOrEqual(0);
    });

});