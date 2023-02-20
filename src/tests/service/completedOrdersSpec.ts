import dotenv from 'dotenv'
import { CompletedOrder } from '../../service/completedOrders';

dotenv.config();

const completedOrder = new CompletedOrder();

describe("COMPLETED ORDER SERVICE TEST", ()=>{
    describe("Test Suite for Completed Order Service: ",()=>{
        it("should have a show method", ()=>{
            expect(completedOrder.completed).toBeDefined();
        });    
    
    });
    
    describe("Test Suite for Length of Array: ",()=>{
        
        it("index returns an array of the Order", async ()=>{
    
            await completedOrder.completed("1", "complete").then((item)=>{
                expect(item.length).toBeGreaterThanOrEqual(0);
            });
            
        });
    
    });
})
