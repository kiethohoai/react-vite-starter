import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { fetchListUsers } from "../redux/user/userSlice";

interface IUser {
  id: number;
  name: string;
  email: string;
}

function UsersTable() {
  const [users, setUsers] = useState<IUser[]>([]);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = async () => {
  //   const res = await fetch("http://localhost:8000/users");
  //   const data = await res.json();
  //   setUsers(data);
  // };

  useEffect(() => {
    dispatch(fetchListUsers());
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default UsersTable;
