import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useState, ChangeEvent, FormEvent } from "react";
import { User } from "../App";
import axios from "axios";
import { BASE_URL } from "../lib/constants";

export function AddUser({
  enabled,
  setEnabled,
  getUser,
}: {
  enabled: boolean;
  setEnabled: (a: boolean) => void;
  getUser: () => Promise<void>;
}) {
  const [alunoSelecionado, setAlunoSelecionado] = useState<Partial<User>>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setAlunoSelecionado({
      ...alunoSelecionado,
      [name]: value,
    });
  }
  function toggleModal() {
    setAlunoSelecionado({});
    setEnabled(!enabled);
  }
  interface SubmitEvent extends FormEvent {
    nativeEvent: Event & {
      submitter?: HTMLElement;
    };
  }
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter;
    if (submitter && submitter.className.includes("btn-primary")) {
      console.log(e.nativeEvent.submitter);
      axios
        .post(BASE_URL, alunoSelecionado)
        .then(async () => {
          toggleModal();
          await getUser();
          setAlunoSelecionado({});
        })
        .catch(console.error);
    }
  }

  return (
    <Modal isOpen={enabled}>
      <ModalHeader>Incluir Aluno</ModalHeader>
      <ModalBody>
        <form id="post-user" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="nome">
            <span>Nome: </span>
            <input
              type="text"
              className="form-control"
              name="nome"
              id="nome"
              defaultValue={alunoSelecionado?.Nome}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="email">
            <span>Email: </span>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              defaultValue={alunoSelecionado?.Email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="idade">
            <span>Idade: </span>
            <input
              type="text"
              className="form-control"
              name="idade"
              id="idade"
              defaultValue={alunoSelecionado?.Idade}
              onChange={handleChange}
              required
            />
          </label>
          <div className="buttons">
            <button className="btn btn-primary" type="submit">
              Incluir
            </button>
            <button className="btn btn-danger" onClick={toggleModal}>
              Cancelar
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
