import { Product, ProductType } from "../models/product";
import {connection} from "../handler/pgConnection";

export class ProductsByCategory extends Product{
    constructor (environment: string){
        super(environment);
    }

    async show(category: string): Promise<ProductType[]>{
        try{
            // @ts-ignore
            const conn = connection();
            await conn.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql,[category]);
            conn.end();
            console.log(result.rows)
            return result.rows;

        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
        
    }
}