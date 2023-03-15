import { connection } from "../handler/pgConnection";

export type OrderProductsType = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProducts {
  async index(): Promise<OrderProductsType[]> {
    try {
      const conn = connection();
      await conn.connect();
      const sql = "SELECT * FROM order_products";
      const result = await conn.query(sql);
      conn.end();
      //console.log(result.rows)
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order. Error: ${err}`);
    }
  }

  async create(order: OrderProductsType): Promise<OrderProductsType[]> {
    try {
      const sql = `INSERT INTO order_products(order_id, product_id, quantity) VALUES ($1, $2, $3)`;
      const conn = connection();
      await conn.connect();
      await conn.query(sql, [order.order_id, order.product_id, order.quantity]);
      const output = await conn.query(
        "SELECT * FROM orders WHERE order_id=($1)",
        [order.order_id]
      );

      conn.end();
      //console.log(output.rows);
      return output.rows;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async show(id: string): Promise<OrderProductsType[]> {
    try {
      const conn = connection();
      await conn.connect();
      const sql = "SELECT * FROM order_products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.end();
      //console.log(result.rows)
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<OrderProductsType[]> {
    try {
      const conn = connection();
      await conn.connect();
      const sql = "DELETE FROM order_products WHERE id=($1)";
      await conn.query(sql, [id]);
      const output = await conn.query("SELECT * FROM order_products");
      conn.end();
      //console.log(output.rows)
      return output.rows;
    } catch (err) {
      throw new Error(`Could not find order. Error: ${err}`);
    }
  }
}
