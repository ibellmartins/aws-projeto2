import { useState } from "react";
import api from "../api";

export default function BookForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    summary: "",
    price: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post("/books", form);
    onAdd();
    setForm({ title: "", author: "", summary: "", price: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="Título"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Autor"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
      />
      <input
        placeholder="Preço"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
