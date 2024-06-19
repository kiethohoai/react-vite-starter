import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  resetIsUpdatePostSuccess,
  updateBlogPost,
} from "../../redux/blog/blogSlice";

const BlogUpdatePost = (props: any) => {
  // props, state, redux state
  const { isShowUpdate, setIsShowUpdate, dataUpdate } = props;
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const dispatch = useAppDispatch();
  const isUpdatePosstSuccess = useAppSelector(
    (state) => state.blog.isUpdatePostSuccess,
  );

  // fill data
  useEffect(() => {
    if (
      Object.keys(dataUpdate).length === 0 &&
      dataUpdate.constructor === Object
    ) {
      return;
    }

    setId(dataUpdate.id);
    setTitle(dataUpdate.title);
    setContent(dataUpdate.content);
    setAuthor(dataUpdate.author);
  }, [dataUpdate]);

  // finish & notify
  useEffect(() => {
    if (isUpdatePosstSuccess === true) {
      toast.success("Update A Post Success!");
      dispatch(resetIsUpdatePostSuccess());
      // finish
      handleClose();
    }
  }, [isUpdatePosstSuccess]);

  // handleClose
  const handleClose = () => {
    setIsShowUpdate(false);
  };
  const handleShow = () => setIsShowUpdate(true);

  // handleUpdatePost
  const handleUpdatePost = () => {
    // validate
    if (!title) {
      toast.error("Invalid title");
      return;
    }
    if (!content) {
      toast.error("Invalid content");
      return;
    }

    if (!author) {
      toast.error("Invalid author");
      return;
    }

    // dispatch
    dispatch(updateBlogPost({ id, title, content, author }));
  };

  return (
    <>
      <Modal
        size="lg"
        show={isShowUpdate}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Post - Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title-input" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Content */}
          <div className="mb-3">
            <label htmlFor="content-input" className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              id="content-input"
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          {/* Author */}
          <div className="mb-3">
            <label htmlFor="author-input" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="author-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleUpdatePost()}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogUpdatePost;
