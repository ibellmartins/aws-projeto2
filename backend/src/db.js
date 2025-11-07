import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function createTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  const sql = `
    CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255),
      price DECIMAL(10,2)
    )
  `;

  try {
    await connection.execute(sql);
    console.log("Tabela 'books' criada (ou já existente)");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  } finally {
    await connection.end();
  }
}

createTable();
