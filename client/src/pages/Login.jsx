import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/user/login",
        input
      );
      alert(res.data.message);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="container shadow">
      <h2 className="text-center my-3">Log into Your Account</h2>
      <div className="col-md-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          <form onSubmit={handleLogin}>
            {/* <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter Name"
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Password
              </label>
              <input
                type="password"
                name={input.password}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter Password"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary btn-black" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
