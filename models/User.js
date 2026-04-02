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
      throw error;
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

  async putUser(target, data) {
    try {
      const [result] = await this.conn.execute(
        "UPDATE users SET username = ?, email = ?, password_hash = ?, updated_at = ? WHERE id = ?",
        [
          data.username,
          data.email,
          data.password_hash,
          data.updated_at,
          target,
        ],
      );

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.conn.release();
    }
  }

  async deleteUser(target) {
    try {
      const [result] = await this.conn.execute(
        "DELETE FROM users WHERE id = ?",
        [target],
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
