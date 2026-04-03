import { pool } from "../config/database.js";

class Category {
  constructor(connection) {
    this.conn = connection;
  }

  static async create() {
    const connection = await pool.getConnection();
    return new Category(connection);
  }

  async getCategories() {
    try {
      const [results] = await this.conn.query("SELECT * FROM categories");

      return results;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async getCategory(id) {
    try {
      const [result] = await this.conn.execute(
        "SELECT * FROM categories WHERE id = ?",
        [id],
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async postCategory(data) {
    try {
      return await this.conn.execute(
        "INSERT INTO categories (id, name, description) VALUES (?, ?, ?)",
        [data.id, data.name, data.description],
      );
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async putCategory(data, id) {
    try {
      const [result] = await this.conn.execute(
        "UPDATE categories SET name = ?, description = ?, updated_at = ? WHERE id = ?",
        [data.name, data.description, data.updated_at, id],
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async deleteCategory(id) {
    try {
      const [result] = await this.conn.execute(
        "DELETE FROM categories WHERE id = ?",
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

export { Category };
