import { pool } from "../config/database.js";

class Product {
  constructor(connection) {
    this.conn = connection;
  }

  static async create() {
    const connection = await pool.getConnection();
    return new Product(connection);
  }

  async getProducts() {
    try {
      const [results] = await this.conn.query("SELECT * FROM products");

      return results;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async getProduct(id) {
    try {
      const [result] = await this.conn.execute(
        "SELECT * FROM products WHERE id = ?",
        [id],
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async postProduct(data) {
    try {
      return await this.conn.execute(
        "INSERT INTO products (id, name, price, category_id, user_id) VALUES (?, ?, ?, ?, ?)",
        [data.id, data.name, data.price, data.category_id, data.user_id],
      );
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async putProduct(data, id) {
    try {
      const [result] = await this.conn.execute(
        "UPDATE products SET name = ?, price = ?, category_id = ?, user_id = ?, updated_at = ? WHERE id = ?",
        [
          data.name,
          data.price,
          data.category_id,
          data.user_id,
          data.updated_at,
          id,
        ],
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async deleteProduct(id) {
    try {
      const [result] = await this.conn.execute(
        "DELETE FROM products WHERE id = ?",
        [id],
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }
}

export { Product };
