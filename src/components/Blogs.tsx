import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchListBlogs } from "../redux/blog/blogSlice";
import "./Blogs.css";
import BlogAddNew from "./modal/blog-addnew-modal";

const Blogs = (props: any) => {
  const dispatch = useAppDispatch();
  const listBlogs = useAppSelector((state) => state.blog.listBlogs);

  useEffect(() => {
    // fetchListBlogs
    dispatch(fetchListBlogs());
  }, []);

  return (
    <>
      <BlogAddNew />
      <table className="table-container table table-bordered">
        <thead className="table-head">
          <tr className="table-row">
            <th className="table-id">ID</th>
            <th className="table-title">Title</th>
            <th className="table-content">Content</th>
            <th className="table-author">Author</th>
            <th className="table-action">Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {listBlogs &&
            listBlogs.length > 0 &&
            listBlogs.map((item, index) => {
              return (
                <tr className="table-row" key={`blog-${index}`}>
                  <th className="detail-id">{item.id}</th>
                  <td className="detail-title">{item.title}</td>
                  <td className="detail-content">{item.content}</td>
                  <td className="detail-author">{item.author}</td>
                  <td className="detail-action">
                    <button className="btn btn-success">Edit</button>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "6px" }}
                    >
                      Del-
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Blogs;
