import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete(props: any) {
  const { show, setShow, delUser } = props;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setEmail(delUser.email);
    setName(delUser.name);
  }, [delUser]);

  const handleClose = () => setShow(false);
  const handleDeleteUser = () => {
    console.log("🚀CHECK  id =", delUser.id);
    console.log("🚀CHECK  email =", email);
    console.log("🚀CHECK  name =", name);
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
