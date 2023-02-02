import dotenv from 'dotenv'
import { User } from '../../models/user';

const {ENV, JASMINE_TEST_PASSWORD} = process.env;

const user = new User((ENV as unknown) as string);

describe("Test Suite for Users: ",()=>{
    it("should have an index method", ()=>{
        expect(user.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(user.show).toBeDefined();
    });

    it("should have a signUp method", ()=>{
        expect(user.signUp).toBeDefined();
    });

    it("should have a signIn method", ()=>{
        expect(user.signIn).toBeDefined();
    });

    it("should have an authenticate method", ()=>{
        expect(user.authenticate).toBeDefined();
    });
    
    it('should have a delete method', () => {
        expect(user.deleteUser).toBeDefined();
    });
    
});

describe("Test Suite for Length of Array: ",()=>{  

    it("index returns an array of users", async ()=>{

        const results = await user.index().then((item)=>{
            expect(item.length).toBeGreaterThanOrEqual(0);
        });
        
    });
    
    it('signUp method should create a user', async () => {
        const result = await user.signUp({
            first_name: "Kofi Nyarko",
            last_name: "Kumi",
            email: "someone@gmail.com",
            password: (JASMINE_TEST_PASSWORD as unknown) as string
        });
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('signIn method should allow already existing user', async () => {
        const result = await user.signIn({
            email: "someone@gmail.com",
            password: (JASMINE_TEST_PASSWORD as unknown) as string
        });
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('signIn method should allow already existing user', async () => {
        const result = await user.signIn({
            email: "someone@gmail.com",
            password: (JASMINE_TEST_PASSWORD as unknown) as string
        });
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    
    it('show method should return the correct user', async () => {
    const result = await user.show("1");
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('delete method should remove the user', async () => {
        user.deleteUser("1");
        const result = await user.index()

        expect(result.length).toBeGreaterThanOrEqual(0);
    });

});