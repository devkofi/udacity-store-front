import dotenv from 'dotenv'
import { Product } from '../../models/product';

dotenv.config();

const {ENV} = process.env;

const product = new Product((ENV as unknown) as string);

const product1 = async ()=>await product.create({
    name: "Apple",
    price: 10.0,
    category: "fruits"
})
.then(()=>{
    async () =>await product.create({
        name: "Banana",
        price: 15.3,
        category: "fruits"
    })
})
.then(()=>{
    async ()=>await product.create({
        name: "Pear",
        price: 5.9,
        category: "fruits"
    })
})
.then(()=>{
    async ()=>await product.create({
        name: "Guava",
        price: 25.9,
        category: "fruits"
    })
})
.then(()=>{
    async ()=>await product.create({
        name: "Mango",
        price: 5.9,
        category: "fruits"
    })
});

describe("PRODUCT TEST: ",()=>{
    describe("Test Suite for Product Methods: ",()=>{
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

    describe("Test Suite for Product Length of Array: ",()=>{
    
        it('create method should create a product', async () => {
            const result = await product.create({
                name: "Pineapple",
                price: 20.5,
                category: "fruits"
            });
            expect(result.length).toBeGreaterThanOrEqual(0);
        });
    
        it("index returns an array of products", async ()=>{
    
            const results = await product.index().then((item)=>{
                expect(item.length).toBeGreaterThanOrEqual(0);
            });
            
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

});

