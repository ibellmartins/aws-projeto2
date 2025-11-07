import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Img1 from "./imgs/img1.svg";
import "./App.css";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="app-container">
      <h1>Prateleira Virtual</h1>
      <img src={Img1} alt="Ilustração de leitura" className="header-image"/>

      <h4>
        Um ambiente feito para você organizar suas leituras e ter visibilidade do quanto investiu
        em conhecimento e cultura de uma forma rápida e simples!
      </h4>

      <h3>Insira seu novo livro abaixo</h3>

      <BookForm onAdd={() => setRefresh(!refresh)} />
      <BookList refresh={refresh} />


      <footer className="footer">
        <p>
          Desenvolvido com ❤️ por Isabella Martins & Jennifer Tondade - {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
