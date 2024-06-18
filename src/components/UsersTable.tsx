import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchListUsers } from "../redux/user/userSlice";
import { toast } from "react-toastify";
import "./UsersTable.css";
import ModalAddNew from "./ModalAddNew";
import ModalUpdate from "./ModalUpdate";
import ModalDelete from "./ModalDelete";

function UsersTable() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.listUsers);
  const [isShowAddNew, setIsShowAddNew] = useState(false);
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);

  const [upUser, setUpUser] = useState({});
  const [delUser, setDelUser] = useState({});

  useEffect(() => {
    dispatch(fetchListUsers());
    toast.success("Fetch List Users Success!");
  }, []);

  const handleUpdateUser = (user: object) => {
    setIsShowUpdate(true);
    setUpUser(user);
  };

  const handleDeleteUser = (user: object) => {
    setIsShowDelete(true);
    setDelUser(user);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={`yser-${user.id}`} style={{ textAlign: "center" }}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleUpdateUser(user)}
                    className="btn btn-outline-success"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-outline-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="add-new">
        <button
          onClick={() => setIsShowAddNew(true)}
          className="btn btn-outline-primary"
        >
          Add New User
        </button>
      </div>
      <ModalAddNew show={isShowAddNew} setShow={setIsShowAddNew} />
      <ModalUpdate
        show={isShowUpdate}
        setShow={setIsShowUpdate}
        upUser={upUser}
      />
      <ModalDelete
        show={isShowDelete}
        setShow={setIsShowDelete}
        delUser={delUser}
      />
    </>
  );
}

export default UsersTable;
