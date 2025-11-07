
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let books = [
  { id: 1, title: "Dom Casmurro", author: "Machado de Assis", price: 49.90 },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const id = books.length + 1;
  const newBook = { id, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.map((b) =>
    b.id === id ? { ...b, ...req.body } : b
  );
  res.json({ message: "Livro atualizado com sucesso!" });
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter((b) => b.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor mock rodando na porta ${PORT}`));
