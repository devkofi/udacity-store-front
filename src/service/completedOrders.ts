import { Order, OrderType } from "../models/order";
import {connection} from "../handler/pgConnection";

export class CompletedOrder extends Order{
    constructor (environment: string){
        super(environment);
    }

    async completed(user_id:string, order_status: string): Promise<OrderType[]>{
        try{
            
            const conn = connection();
            await conn.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
            const result = await conn.query(sql,[user_id, order_status.toLowerCase()]);
            conn.end();
            //console.log(result.rows)
            return result.rows;

        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
        
    }
}