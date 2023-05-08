import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import addUser from "./assets/add_user.svg";
import { useState, useEffect } from "react";
import { BASE_URL } from "./lib/constants";
import { UserTable } from "./components/UserTable";
import { AddUser } from "./components/AddUser";
import { PrintAlert } from "./components/Alert";
// import UpdateUser from "./components/UpdateUser";

export interface User {
  Id: number;
  Nome: string;
  Email: string;
  Idade: number;
}

export type crudType = "update" | "delete" | "create" | "";

export function App() {
  const [data, setData] = useState<User[]>();
  const [modalEnabled, setModalEnabled] = useState<crudType>("");
  const [alert, setAlert] = useState<{ enabled: boolean; message: string }>({
    enabled: false,
    message: "",
  });
  async function getUser(message?: string) {
    await axios
      .get<User[]>(BASE_URL)
      .then((response) => {
        setData(Array.isArray(response.data) ? response.data : [response.data]);
        setAlert({
          enabled: true,
          message: message ?? "successfully refreshed",
        });
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <main>
        <h3>Cadastro de aluno</h3>
        <PrintAlert
          enabled={alert.enabled}
          message={alert.message}
          setErr={setAlert}
          type="success"
        />
        <header>
          <span className="register">
            <img src={addUser} alt="add-user" className="add_user" />
            <button
              className="btn btn-success"
              onClick={() => setModalEnabled("create")}
            >
              Incluir Novo aluno
            </button>
          </span>
          <button onClick={() => getUser()}>refresh</button>
        </header>
        <UserTable
          data={data}
          getUser={getUser}
          modalEnabled={modalEnabled}
          setEnabled={setModalEnabled}
        />

        <AddUser
          enabled={modalEnabled == "create"}
          setEnabled={setModalEnabled}
          getUser={getUser}
        />
      </main>
    </div>
  );
}
