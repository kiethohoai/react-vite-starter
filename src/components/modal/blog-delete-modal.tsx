import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteBlogPost,
  resetIsDeletePostSuccess,
} from "../../redux/blog/blogSlice";

const BlogDeletePost = (props: any) => {
  const { isShowDelete, setIsShowDelete, dataDelete } = props;
  console.log("🚀CHECK  dataDelete =", dataDelete);
  const dispatch = useAppDispatch();

  if (
    Object.keys(dataDelete).length === 0 &&
    dataDelete.constructor === Object
  ) {
    return;
  }
  const isDeletePostSuccess = useAppSelector(
    (state) => state.blog.isDeletePostSuccess,
  );

  useEffect(() => {
    if (isDeletePostSuccess === true) {
      toast.success("DELETED!");
      dispatch(resetIsDeletePostSuccess());
      handleClose();
    }
  }, [isDeletePostSuccess]);

  // handleClose
  const handleClose = () => {
    setIsShowDelete(false);
  };

  // const handleShow = () => setIsShowDelete(true);

  // handleConfirmDelete
  const handleConfirmDelete = () => {
    dispatch(deleteBlogPost(dataDelete));
  };

  return (
    <>
      <Modal
        size="lg"
        show={isShowDelete}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Your Delete Post Information:</strong> <br />
          {`ID=${dataDelete?.id}, Title=${dataDelete?.title}`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleConfirmDelete()}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogDeletePost;
