import dotenv from 'dotenv'
import { ProductsByCategory } from '../../service/productsByCategory';

dotenv.config();


const productsByCategory = new ProductsByCategory();

describe("PRODUCTS BY CATEGORY SERVICE TEST", ()=>{
    describe("Test Suite for Popular Products Service: ",()=>{
        it("should have a show method", ()=>{
            expect(productsByCategory.show).toBeDefined();
        });    
    
    });
    
    describe("Test Suite for Length of Array: ",()=>{
        
        it("popularProducts returns an array of products by category", async ()=>{
    
            await productsByCategory.showCategory("complete").then((item)=>{
                expect(item.length).toBeGreaterThanOrEqual(0);
            });
            
        });
    
    });
})
