import { useEffect, useState } from "react";
import api from "../api";
import "./BookList.css";

export default function BookList({ refresh }) {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", author: "", price: "" });
  const [readBooks, setReadBooks] = useState(() => {
    // carrega lista de lidos do localStorage
    const saved = localStorage.getItem("readBooks");
    return saved ? JSON.parse(saved) : [];
  });

  // --- CRUD ---

  // Listar livros
  async function fetchBooks() {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Erro ao carregar livros:", err);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  // Criar é feito via BookForm, que já chama o refresh
  // Deletar
  async function handleDelete(id) {
    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      setReadBooks((prev) => prev.filter((rid) => rid !== id)); // remove também se for lido
    } catch (err) {
      console.error("Erro ao deletar livro:", err);
    }
  }

  // Editar
  function startEditing(book) {
    setEditingBook(book);
    setEditForm({ title: book.title, author: book.author, price: book.price });
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/books/${editingBook.id}`, editForm);
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error("Erro ao atualizar livro:", err);
    }
  }

  // Marcar / Desmarcar como lido
  function toggleRead(bookId) {
    setReadBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  }

  // persistir no localStorage
  useEffect(() => {
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }, [readBooks]);

  // --- Lógicas auxiliares ---
  const unreadBooks = books.filter((b) => !readBooks.includes(b.id));
  const readList = books.filter((b) => readBooks.includes(b.id));
  const totalInvested = readList.reduce((acc, b) => acc + Number(b.price), 0);

  return (
    <div className="book-list-container">

      <h2> Livros cadastrados</h2>
      {unreadBooks.length === 0 ? (
        <p className="empty-msg">Não há nenhum livro na sua lista.</p>
      ) : (
        <div className="book-grid">
          {unreadBooks.map((b) => (
            <div className="book-card" key={b.id}>
              {editingBook?.id === b.id ? (
                <form onSubmit={handleEditSubmit} className="edit-form">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    placeholder="Título"
                  />
                  <input
                    type="text"
                    value={editForm.author}
                    onChange={(e) =>
                      setEditForm({ ...editForm, author: e.target.value })
                    }
                    placeholder="Autor"
                  />
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    placeholder="Preço"
                  />
                  <div className="edit-actions">
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={() => setEditingBook(null)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3>{b.title}</h3>
                  <p>
                    <strong>Autor:</strong> {b.author}
                  </p>
                  <p>
                    <strong>Preço:</strong> R${b.price}
                  </p>
                  <div className="card-buttons">
                    <button className="edit" onClick={() => startEditing(b)}>
                      Editar
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(b.id)}
                    >
                      Excluir
                    </button>
                    <button className="read" onClick={() => toggleRead(b.id)}>
                      Lido
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Seção de livros lidos */}
      {readList.length > 0 && (
        <>
          <h2 className="read-section-title">
            Suas leituras
          </h2>
          <h3>Total investido: R${totalInvested.toFixed(2)} | Total de leituras: {readList.length} </h3>

          <div className="book-grid">
            {readList.map((b) => (
              <div className="book-card read-card" key={b.id}>
                <h3>{b.title}</h3>
                <p>
                  <strong>Autor:</strong> {b.author}
                </p>
                <p>
                  <strong>Preço:</strong> R${b.price}
                </p>
                <div className="card-buttons">
                  <button
                    className="delete"
                    onClick={() => handleDelete(b.id)}
                  >
                    Excluir
                  </button>
                  <button
                    className="read active"
                    onClick={() => toggleRead(b.id)}
                  >
                    Desmarcar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
