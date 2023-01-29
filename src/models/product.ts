import dotenv from 'dotenv'
import {Pool} from 'pg';

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env 

console.log(ENV)

export type ProductType = {
    id?: number;
    name: string;
    price: number;
    category:string
};

export class Product{
    //conn: Pool;

    constructor(environment: string){
        
    }
    
    async index(): Promise<ProductType[]>{
        try{
            const conn = this.connection();
            await conn.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.end();
            console.log(result.rows)
            return result.rows;

        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
        
    }

    async show(id: string): Promise<ProductType[]>{
        try {
            
            const conn = this.connection();
            await conn.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.end();
            console.log(result.rows)
            return result.rows;


        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(product: ProductType): Promise<ProductType[]>{
        try {
            const sql = `INSERT INTO products(name, price, category) VALUES ($1, $2, $3)`;
            const conn = this.connection();
            await conn.connect();
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            const output = await conn.query('SELECT * FROM products WHERE name=($1)', [product.name]);
            
            conn.end();
            console.log(output.rows);
            return output.rows;

        } catch (err) {
            throw new Error(`Could not add new product ${product.name}. Error: ${err}`);
        }
    }

    async update(id: string, product: ProductType): Promise<ProductType[]>{
        try {
            const conn = this.connection();
            const sql = 'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4)';
            await conn.connect();
            const result = await conn.query(sql, [product.name, product.price, product.category, id]);
            conn.end();
            console.log(result.rows[0]);
            return result.rows[0];
        } catch (err) {
            throw new Error('Could not update product')
        }
    }

    async delete(id: string): Promise<ProductType[]>{
        try {
            const conn = this.connection();
            const sql = 'DELETE FROM products WHERE id=($1)';
            await conn.connect();
            const result = await conn.query(sql,[id]);
            const output = await conn.query('SELECT * FROM products');
            conn.end();
            console.log(output.rows)
            return output.rows;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }

    connection(): Pool{
        const conn = ENV === "dev" ? new Pool({
            host: POSTGRES_HOST,
            port: Number(POSTGRES_PORT),
            database: POSTGRES_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
        }) : new Pool({
            host: POSTGRES_HOST,
            port: Number(POSTGRES_PORT),
            database: POSTGRES_TEST_DB,
            user: POSTGRES_USER,
            password: POSTGRES_PASSWORD,
        });

        return conn;
    }


}