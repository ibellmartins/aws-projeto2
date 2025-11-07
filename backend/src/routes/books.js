import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM books");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { title, author, summary, published_date, price } = req.body;
  const [result] = await pool.query(
    "INSERT INTO books (title, author, summary, published_date, price) VALUES (?, ?, ?, ?, ?)",
    [title, author, summary, published_date, price]
  );
  res.status(201).json({ id: result.insertId });
});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM books WHERE id = ?", [req.params.id]);
  res.status(204).end();
});

export default router;
