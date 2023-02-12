import dotenv from 'dotenv'
import { CompletedOrder } from '../../service/completedOrders';

const {ENV} = process.env;

const completedOrder = new CompletedOrder((ENV as unknown) as string);

describe("COMPLETED ORDER SERVICE TEST", ()=>{
    describe("Test Suite for Completed Order Service: ",()=>{
        it("should have a show method", ()=>{
            expect(completedOrder.completed).toBeDefined();
        });    
    
    });
    
    describe("Test Suite for Length of Array: ",()=>{
        
        it("index returns an array of the Order", async ()=>{
    
            const results = await completedOrder.completed("1", "complete").then((item)=>{
                expect(item.length).toBeGreaterThanOrEqual(0);
            });
            
        });
    
    });
})
