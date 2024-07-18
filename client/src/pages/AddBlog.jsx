import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategory = async () => {
      const res = await axios.get("http://localhost:9000/api/v1/add/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(res.data);
    };
    fetchAllCategory();
  }, []);

  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("category", input.category);
  formData.append("description", input.description);
  formData.append("thumbnail", file);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/add/blog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="container shadow">
      <h2 className="text-center my-3">Sign Up Here</h2>
      <div className="col-md-12 my- d-flex items-center justify-content-center">
        <div className="row">
          3
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Blog Title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Category
              </label>
              <select
                className="form-control"
                name="category"
                value={input.category}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
              >
                <option disabled>Select Category</option>
                {categories &&
                  categories.map((item) => {
                    return <option value={item._id}>{item.title}</option>;
                  })}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                placeholder="Blog Description"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Thumbnail
              </label>
              <input
                type="file"
                name="thumbnail"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Select Thumbnail"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary btn-black" type="submit">
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
