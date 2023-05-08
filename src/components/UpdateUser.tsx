import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { User, crudType } from "../App";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { AlertParams, PrintAlert } from "./Alert";

export default function UpdateUser({
  enabled,
  setEnabled,
  getUser,
  user,
  alert,
  setAlert,
}: {
  enabled: boolean;
  setEnabled: (a: crudType) => void;
  getUser: (message?: string) => Promise<void>;
  user: Partial<User>;
  alert: AlertParams;
  setAlert: (a: AlertParams) => void;
}) {
  const [alunoSelecionado, setAlunoSelecionado] = useState<Partial<User>>(user);
  useEffect(() => {
    setAlunoSelecionado(user);
  }, [user]);

  function handleRequestPut(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/${alunoSelecionado.Id}`, alunoSelecionado)
      .then(() => {
        setAlert({
          enabled: true,
          message: `Aluno de Id: ${alunoSelecionado.Id} foi atualizado com sucesso`,
          type: "success",
        });
        setEnabled("");
        getUser();
      })
      .catch(() => {
        setAlert({
          enabled: true,
          message: `Aluno de Id: ${alunoSelecionado.Id} teve um erro ao atualizar informações`,
        });
      });
  }

  return (
    <Modal isOpen={enabled}>
      <ModalHeader>Editar Aluno</ModalHeader>
      <PrintAlert
        enabled={alert.enabled}
        message={alert.message}
        setErr={setAlert}
        type={alert.type}
      />
      <ModalBody>
        <form id="put-user" onSubmit={handleRequestPut}>
          <label htmlFor="id">
            ID:{" "}
            <input
              id="id"
              readOnly
              value={user.Id}
              className="form-control"
              type="text"
            />
          </label>
          <label htmlFor="nome">
            Nome:{" "}
            <input
              id="nome"
              name="nome"
              defaultValue={user.Nome}
              className="form-control"
              type="text"
              onChange={(a) =>
                setAlunoSelecionado({
                  ...alunoSelecionado,
                  Nome: a.target.value,
                })
              }
            />
          </label>
          <label htmlFor="email">
            Email:{" "}
            <input
              id="email"
              name="email"
              defaultValue={user.Email}
              className="form-control"
              type="text"
              onChange={(a) =>
                setAlunoSelecionado({
                  ...alunoSelecionado,
                  Email: a.target.value,
                })
              }
            />
          </label>
          <label htmlFor="idade">
            Idade:{" "}
            <input
              id="idade"
              name="idade"
              defaultValue={user.Idade}
              className="form-control"
              type="number"
              onChange={(a) =>
                setAlunoSelecionado({
                  ...alunoSelecionado,
                  Idade: parseInt(a.target.value),
                })
              }
            />
          </label>
          <div className="buttons">
            <button type="submit" className="btn btn-primary">
              Editar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setEnabled("")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
