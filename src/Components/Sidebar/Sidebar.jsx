import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Sidebar = ({ toggle, userRole }) => {
  const [activeStep, setActiveStep] = useState(1);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Define menu items based on role
  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: "bi bi-house",
      path: "/dashboard",
      roles: 0,
    },
    {
      id: 2,
      label: "Posts",
      icon: "bi bi-file-earmark-image",
      path: "/posts",
      roles: 0,
    },
    {
      id: 3,
      label: "Rss Details",
      icon: "bi bi-file-earmark-image",
      path: "/rssdetails",
      roles: 0,
    },
    {
      id: 4,
      label: "Visual Stories",
      icon: "bi bi-quote",
      path: "/visualstories",
      roles: 0,
    },
    {
      id: 5,
      label: "Trending",
      icon: "bi bi-newspaper",
      path: "/trending",
      roles: 0,
    },
    { id: 6, label: "Roles", icon: "bi bi-people", path: "/role", roles: 0 },
    {
      id: 7,
      label: "Create User",
      icon: "bi bi-people",
      path: "/createusers",
      roles: 0,
    },
    {
      id: 8,
      label: "Category",
      icon: "bi bi-bookmarks-fill",
      path: "/category",
      roles: 0,
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.roles === 0);

  return (
    <aside
      className="d-flex justify-content-between flex-column text-black vh-100 pe-4"
      style={{ backgroundColor: "#333547" }}
    >
      <div className="ms-3">
        <Link to="/Dashboard">
          <img
            src="../MMLogo3.png"
            style={{ height: "3rem" }}
            className="ms-3 mt-2"
            alt="CoolBrand"
          />
        </Link>
        <ul className="nav nav-pills flex-column justify-content-center list-unstyled mt-2">
          {filteredMenuItems.map((item) => (
            <li
              key={item.id}
              className={
                activeStep === item.id ? "nav-item  m-3 active" : "nav-item m-3"
              }
              onClick={() => setActiveStep(item.id)}
            >
              <Link to={item.path}>
                <i className={`${item.icon} fs-5 m-3`}></i>
                <span className=" fs-6  fw-bold">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="p-1 d-flex flex-column  align-items-center"
        style={{ color: "#f0e9e9" }}
      >
        <hr style={{ width: "100%", borderColor: "#f0e9e9" }} />
        <span className="fs-5 fw-bold cursor-pointer" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left m-2 fw-bold"></i> Log out
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
