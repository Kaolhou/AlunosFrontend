import { User } from "../App";

export function UserTable({ data }: { data: User[] | undefined }) {
  return (
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
              <button className="btn btn-primary">Editar</button>
              <button className="btn btn-danger">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
