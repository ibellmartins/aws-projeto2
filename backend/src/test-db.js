import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function testConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  const [rows] = await connection.query("SELECT NOW() AS now");
  console.log("Conexão OK, hora do banco:", rows[0].now);
  await connection.end();
}

testConnection().catch(console.error);
