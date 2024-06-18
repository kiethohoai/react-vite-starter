import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { resetIsUpdateSucess, updateUser } from "../../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toast } from "react-toastify";

function ModalUpdate(props: any) {
  const { show, setShow, upUser } = props;
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();
  const isUpdateSucess = useAppSelector((state) => state.user.isUpdateSucess);

  useEffect(() => {
    setEmail(upUser.email);
    setName(upUser.name);
  }, [upUser]);

  useEffect(() => {
    if (isUpdateSucess === true) {
      toast.success("Update Success!");
      dispatch(resetIsUpdateSucess());
      handleClose();
    }
  }, [isUpdateSucess]);

  const handleClose = () => setShow(false);
  const handleUpdateUser = () => {
    console.log("🚀CHECK  id =", upUser.id);
    console.log("🚀CHECK  email =", email);
    console.log("🚀CHECK  name =", name);

    // Validate
    if (!email) {
      alert("Invalid Email!");
      return;
    }
    if (!name) {
      alert("Invalid Email!");
      return;
    }

    // React => Redux
    let id: number = upUser.id;
    dispatch(updateUser({ id, email, name }));
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleUpdateUser()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdate;
