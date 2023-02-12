import dotenv from 'dotenv'
import { PopularProducts } from '../../service/popularProducts';

const {ENV} = process.env;

const popularProducts = new PopularProducts((ENV as unknown) as string);

describe("POPULAR PRODUCT SERVICE TEST", ()=>{
    describe("Test Suite for Popular Products Service: ",()=>{
        it("should have a show method", ()=>{
            expect(popularProducts.show).toBeDefined();
        });    
    
    });
    
    describe("Test Suite for Length of Array: ",()=>{
        
        it("popularProducts returns an array of the Popular Products", async ()=>{
    
            const results = await popularProducts.showPopular().then((item)=>{
                expect(item.length).toBeGreaterThanOrEqual(0);
            });
            
        });
    
    });
})
