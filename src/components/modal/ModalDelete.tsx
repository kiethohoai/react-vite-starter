import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteUser, resetIsDeleteSucess } from "../../redux/user/userSlice";
import { toast } from "react-toastify";

function ModalDelete(props: any) {
  const { show, setShow, delUser } = props;
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();
  const isDeleteSucess = useAppSelector((state) => state.user.isDeleteSucess);
  useEffect(() => {
    if (isDeleteSucess === true) {
      toast.success("Delete Success!");
      dispatch(resetIsDeleteSucess());
      handleClose();
    }
  }, [isDeleteSucess]);

  useEffect(() => {
    setEmail(delUser.email);
    setName(delUser.name);
  }, [delUser]);

  const handleClose = () => setShow(false);
  const handleDeleteUser = () => {
    // redux
    let id: number = delUser.id;
    dispatch(deleteUser({ id, email, name }));

    handleClose();
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure To Delete This User? {email}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
