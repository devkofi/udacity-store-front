import { connection } from "../handler/pgConnection";

export type OrderType = {
  id?: number;
  product_id: number;
  product_quantity: number;
  user_id: number;
  order_status: string;
};

export class Order {
  async index(): Promise<OrderType[]> {
    try {
      const conn = connection();
      await conn.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.end();
      //console.log(result.rows)
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order. Error: ${err}`);
    }
  }

  async create(order: OrderType): Promise<OrderType[]> {
    try {
      const sql = `INSERT INTO orders(product_id, product_quantity, user_id, order_status) VALUES ($1, $2, $3, $4)`;
      const conn = connection();
      await conn.connect();
      await conn.query(sql, [
        order.product_id,
        order.product_quantity,
        order.user_id,
        order.order_status.toLowerCase(),
      ]);
      const output = await conn.query(
        "SELECT * FROM orders WHERE product_id=($1)",
        [order.product_id]
      );

      conn.end();
      //console.log(output.rows);
      return output.rows;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async show(id: string): Promise<OrderType[]> {
    try {
      const conn = connection();
      await conn.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.end();
      //console.log(result.rows)
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<OrderType[]> {
    try {
      const conn = connection();
      await conn.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      await conn.query(sql, [id]);
      const output = await conn.query("SELECT * FROM orders");
      conn.end();
      //console.log(output.rows)
      return output.rows;
    } catch (err) {
      throw new Error(`Could not find order. Error: ${err}`);
    }
  }
}
