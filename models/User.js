import { pool } from "../config/database.js";

class User {
  constructor(connection) {
    this.conn = connection;
  }

  static async create() {
    const connection = await pool.getConnection();
    return new User(connection);
  }

  async getUsers() {
    try {
      const [results] = await this.conn.query("SELECT * FROM users");
      return results;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      this.conn.release();
    }
  }

  async postUser(data) {
    try {
      const [result] = await this.conn.execute(
        "INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)",
        [data.id, data.username, data.email, data.password_hash],
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }
}

export { User };
