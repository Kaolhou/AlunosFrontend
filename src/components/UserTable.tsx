import { User, crudType } from "../App";
import { useState } from "react";
import UpdateUser from "./UpdateUser";
import { AlertParams, PrintAlert } from "./Alert";
interface TableProps {
  data: User[] | undefined;
  modalEnabled: crudType;
  setEnabled: (a: crudType) => void;
  getUser: () => Promise<void>;
}
export function UserTable({
  data,
  modalEnabled,
  getUser,
  setEnabled,
}: TableProps) {
  const [alunoSelecionado, setAlunoSelecionado] = useState<Partial<User>>({});
  const [alert, setAlert] = useState<AlertParams>({
    message: "",
    enabled: false,
    type: "success",
  });

  function handleUpdateClick(user: User) {
    setAlunoSelecionado(user);
    setEnabled("update");
  }

  return (
    <>
      <UpdateUser
        alert={alert}
        setAlert={setAlert}
        user={alunoSelecionado}
        enabled={modalEnabled == "update"}
        setEnabled={setEnabled}
        getUser={getUser}
      />
      <PrintAlert
        enabled={alert.enabled}
        message={alert.message}
        setErr={setAlert}
        type={alert.type}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i) => (
            <tr key={i.Id}>
              <td>{i.Id}</td>
              <td>{i.Nome}</td>
              <td>{i.Email}</td>
              <td>{i.Idade}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleUpdateClick(i);
                  }}
                >
                  Editar
                </button>
                <button className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
