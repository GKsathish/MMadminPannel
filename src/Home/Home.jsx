import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="container-fluid p-0 d-flex flex-column justify-content-between"  >
      <nav className="navbar navbar-expand-lg"  >                                                                                       
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Face Liveness
          </Link>
          {/* <img src='admin-app/public/logo512.png' alt=''/>. */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mr-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown link
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* content */}
      <div className="row">
        <div className="col-lg-12 m-lg-5 p-lg-5  p-5   d-flex justify-content-center">
          <div className="card p-lg-4 m-lg-5 p-3" >
            <img className="img-fluid " src="../logo192.png" alt="Company Logo"/>
            <div className="text-center">
              <h1 className="card-title">Face Liveness</h1>
              <p className="card-text p-lg-5 ">
                Welcome to the  FACE LIVENESS
              </p>
              <Link to="#" className="btn btn-primary">
                Go somewhere 
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="footer bg-warning p-2 ">
                  <div className="d-flex justify-content-center">
                  <h5>© 2023 Faceliveness</h5>
                  </div>
      </div>
    </div>
  );
};

export default Homepage;
