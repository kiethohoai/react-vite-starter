import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  createABlogPost,
  resetIsCreatePostSuccess,
} from "../../redux/blog/blogSlice";

const BlogAddNew = (props: any) => {
  // props, state, redux state
  const [isShowBlog, setIsShowBlog] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const dispatch = useAppDispatch();
  const isCreatePostSuccess = useAppSelector(
    (state) => state.blog.isCreatePostSuccess,
  );

  useEffect(() => {
    if (isCreatePostSuccess === true) {
      toast.success("CREATED!");
      dispatch(resetIsCreatePostSuccess());
      handleClose();
    }
  }, [isCreatePostSuccess]);

  // handleClose
  const handleClose = () => {
    setIsShowBlog(false);
    setTitle("");
    setContent("");
    setAuthor("");
  };
  const handleShow = () => setIsShowBlog(true);

  // handleAddNewPost
  const handleAddNewPost = () => {
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
    dispatch(createABlogPost({ title, content, author }));
  };

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
          <Button variant="primary" onClick={() => handleAddNewPost()}>
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

export default BlogAddNew;
