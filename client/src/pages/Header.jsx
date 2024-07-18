import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("LogOut Success");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <Link className="navbar-brand text-white mx-3" to="/">
        My Blog App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto text-white">
          <li className="nav-item active">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-white" to="/add-blog">
              Add Blog
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link text-white" to="/add-category">
              Add Category
            </Link>
          </li>
          <div className="div-inline mx-auto my-2 my-lg-0">
            {token && token !== null ? (
              <>
                <button className="btn btn-primary">Welcome: {username}</button>
                <button className="btn btn-primary" onClick={handlelogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-primary">Register</button>
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
