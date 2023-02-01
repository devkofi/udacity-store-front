import dotenv from 'dotenv'
import { ProductsByCategory } from '../../service/productsByCategory';

const {ENV} = process.env;

const productsByCategory = new ProductsByCategory((ENV as unknown) as string);

describe("Test Suite for Popular Products Service: ",()=>{
    it("should have a show method", ()=>{
        expect(productsByCategory.show).toBeDefined();
    });    

});

describe("Test Suite for Length of Array: ",()=>{
    
    it("popularProducts returns an array of products by category", async ()=>{

        const results = await productsByCategory.show("complete").then((item)=>{
            expect(item.length).toBeGreaterThanOrEqual(0);
        });
        
    });

});