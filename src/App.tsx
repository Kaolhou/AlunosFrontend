import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import addUser from "./assets/add_user.svg";
import { useState, useEffect } from "react";
import { BASE_URL } from "./lib/constants";
import { UserTable } from "./components/UserTable";
import { AddUser } from "./components/AddUser";

export interface User {
  Id: number;
  Nome: string;
  Email: string;
  Idade: number;
}

export function App() {
  const [data, setData] = useState<User[]>();
  const [modalEnabled, setModalEnabled] = useState(false);
  async function getUser() {
    await axios
      .get<User[]>(BASE_URL)
      .then((response) =>
        setData(Array.isArray(response.data) ? response.data : [response.data])
      )
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <main>
        <h3>Cadastro de aluno</h3>
        <header>
          <span className="register">
            <img src={addUser} alt="add-user" className="add_user" />
            <button
              className="btn btn-success"
              onClick={() => setModalEnabled(!modalEnabled)}
            >
              Incluir Novo aluno
            </button>
          </span>
          <button onClick={getUser}>refresh</button>
        </header>
        <UserTable data={data} />
        <AddUser
          enabled={modalEnabled}
          setEnabled={setModalEnabled}
          getUser={getUser}
        />
      </main>
    </div>
  );
}
