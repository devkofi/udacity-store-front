import { Product, ProductType } from "../models/product";

export class PopularProducts extends Product{
    constructor (environment: string){
        super(environment);
    }

    async show(): Promise<ProductType[]>{
        try{
            const conn = this.connection();
            await conn.connect();
            const sql = 'SELECT * FROM products LIMIT 5';
            const result = await conn.query(sql);
            conn.end();
            console.log(result.rows)
            return result.rows;

        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
        
    }
}