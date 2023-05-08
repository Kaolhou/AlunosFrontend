import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { User, crudType } from "../App";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { AlertParams } from "./Alert";

interface ConfirmDeleteProps {
  aluno: Partial<User>;
  enabled: boolean;
  setEnabled: (a: crudType) => void;
  getUser: (message?: string) => Promise<void>;
  setAlert: (a: AlertParams) => void;
}
export function ConfirmDelete({
  aluno,
  enabled,
  setEnabled,
  getUser,
  setAlert,
}: ConfirmDeleteProps) {
  function deleteRequest(aluno: Partial<User>) {
    if (
      "Email" in aluno &&
      "Id" in aluno &&
      "Idade" in aluno &&
      "Nome" in aluno
    ) {
      axios.delete<User>(`${BASE_URL}/${aluno.Id}`).then(() => {
        getUser("Aluno deletado com sucesso");
        setEnabled("");
      });
      return;
    }
    setAlert({
      enabled: true,
      message: "Algo houve de errado, por favor, comunique o desenvolvedor",
      type: "danger",
    });
  }

  return (
    <Modal isOpen={enabled}>
      <ModalBody>
        Deseja confirmar a exclusão do aluno(a) : {aluno.Nome}
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-danger" onClick={() => deleteRequest(aluno)}>
          Sim
        </button>
        <button className="btn btn-secundary" onClick={() => setEnabled("")}>
          Não
        </button>
      </ModalFooter>
    </Modal>
  );
}
