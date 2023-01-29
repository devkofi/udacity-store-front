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

export type OrderType = {
    id?: number;
    product_id: number;
    product_quantity: number;
    user_id:number,
    order_status: string
};

export class Order{
    constructor(environment: string){

    }

    async index(): Promise<OrderType[]>{
        try {
            
            const conn = this.connection();
            await conn.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.end();
            console.log(result.rows)
            return result.rows;


        } catch (err) {
            throw new Error(`Could not find order. Error: ${err}`)
        }
    }

    async create(order: OrderType): Promise<OrderType[]>{
        try {
            const sql = `INSERT INTO orders(product_id, product_quantity, user_id, order_status) VALUES ($1, $2, $3, $4)`;
            const conn = this.connection();
            await conn.connect();
            const result = await conn.query(sql, [order.product_id, order.product_quantity, order.user_id, order.order_status]);
            const output = await conn.query('SELECT * FROM orders WHERE product_id=($1)', [order.product_id]);
            
            conn.end();
            console.log(output.rows);
            return output.rows;

        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }

    async showCurrentOrder(id: string): Promise<OrderType[]>{
        try {
            
            const conn = this.connection();
            await conn.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.end();
            console.log(result.rows)
            return result.rows;


        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async deleteCurrentOrder(id: string): Promise<OrderType[]>{
        try {
            
            const conn = this.connection();
            await conn.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const output = await conn.query('SELECT * FROM orders');
            conn.end();
            console.log(output.rows)
            return output.rows;


        } catch (err) {
            throw new Error(`Could not find order. Error: ${err}`)
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