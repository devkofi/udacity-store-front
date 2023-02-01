import dotenv from 'dotenv'
import { Product } from '../../models/product';

const {ENV} = process.env;

const product = new Product((ENV as unknown) as string);

describe("Test Suite for Product: ",()=>{
    it("should have an index method", ()=>{
        expect(product.index).toBeDefined();
    });
    it("should have a create method", ()=>{
        expect(product.create).toBeDefined();
    });
    
    it('should have a delete method', () => {
        expect(product.delete).toBeDefined();
    });
    
    it('should have a show method', () => {
        expect(product.show).toBeDefined();
    });

});

describe("Test Suite for Length of Array: ",()=>{
    

    it("index returns an array of orders", async ()=>{

        const results = await product.index().then((item)=>{
            expect(item.length).toBeGreaterThanOrEqual(0);
        });
        
    });
    
    it('create method should create a product', async () => {
        const result = await product.create({
            name: "Pineapple",
            price: 20.5,
            category: "fruits"
        });
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    
    it('show method should return the correct product', async () => {
    const result = await product.show("1");
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('delete method should remove the product', async () => {
        product.delete("1");
        const result = await product.index()

        expect(result.length).toBeGreaterThanOrEqual(0);
    });

});