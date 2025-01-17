import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(async () => {
    const fetchAllBlogs = async () => {
      const res = await axios.get("http://localhost:9000/api/v1/get/allblogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(res.data);
    };
    fetchAllBlogs();
  }, []);
  return (
    <main className="my-5">
      <div className="container shadow-lg">
        <section className="text-center">
          <h2 className="mb-5 my-3">
            <strong>Latest posts</strong>
          </h2>
          <div className="row">
            {blogs && blogs.length > 0 ? (
              blogs.map((item) => {
                return (
                  <div className="col-lg-4 col-md-12 mb-4">
                    <div className="card">
                      <div
                        className="bg-image hover-overlay ripple"
                        data-mdb-ripple-color="light"
                      >
                        <img src={`http://localhost:9000${item.thumbnail}`} />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </a>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <Link
                          to={`/blog/${item._id}`}
                          className="btn btn-primary"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
