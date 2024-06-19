import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchListBlogs } from "../redux/blog/blogSlice";

const Blogs = (props: any) => {
  const dispatch = useAppDispatch();
  const listBlogs = useAppSelector((state) => state.blog.listBlogs);

  useEffect(() => {
    // fetchListBlogs
    dispatch(fetchListBlogs());
  }, []);

  return (
    <>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {listBlogs &&
            listBlogs.length > 0 &&
            listBlogs.map((item, index) => {
              return (
                <tr key={`blog-${index}`}>
                  <th>{item.id}</th>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>{item.author}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Blogs;
