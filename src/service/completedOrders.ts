import { Order, OrderType } from "../models/order";

export class CompletedOrder extends Order{
    constructor (environment: string){
        super(environment);
    }

    async show(id:string, orderStatus: string): Promise<OrderType[]>{
        try{
            const conn = this.connection();
            await conn.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1) order_status=($2)';
            const result = await conn.query(sql,[id, orderStatus]);
            conn.end();
            console.log(result.rows)
            return result.rows;

        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
        
    }
}