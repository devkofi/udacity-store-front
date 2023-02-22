import { ProductType } from "../models/product";

import { connection } from "../handler/pgConnection";

export class PopularProducts {
  
  async showPopular(limit: string): Promise<ProductType[]>{
    try {
      const conn = connection();
      await conn.connect();

      const result = await conn.query('SELECT * FROM products LIMIT ($1)',[limit]);
      conn.end();
      //console.log(result.rows)
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }
}
