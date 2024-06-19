import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const BlogAddNew = (props: any) => {
  const [isShowBlog, setIsShowBlog] = useState(false);
  const handleClose = () => setIsShowBlog(false);
  const handleShow = () => setIsShowBlog(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ position: "relative", top: "-8px", left: "1155px" }}
      >
        Add New Post
      </Button>

      <Modal
        size="lg"
        show={isShowBlog}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Post (Blog)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Save Changes</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogAddNew;
