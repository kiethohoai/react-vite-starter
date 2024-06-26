import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createNewUser, resetIsCreateSucess } from "../../redux/user/userSlice";
import { toast } from "react-toastify";

function ModalAddNew(props: any) {
  const { show, setShow } = props;
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();
  const isCreateSucess = useAppSelector((state) => state.user.isCreateSucess);
  useEffect(() => {
    //
    if (isCreateSucess === true) {
      toast.success("Create Succeed!");
      handleClose();
      setEmail("");
      setName("");
      dispatch(resetIsCreateSucess());
    }
  }, [isCreateSucess]);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setName("");
  };

  const handleAddNew = () => {
    // validate
    if (!email) {
      alert("Invalid Email!");
      return;
    }
    if (!name) {
      alert("Invalid Name!");
      return;
    }

    // Check
    // Call API => Call Redux
    dispatch(createNewUser({ name, email })); //payload
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingPassword">Name</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddNew()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAddNew;
