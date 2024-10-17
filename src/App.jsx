import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Posts from "./Components/Posts/Posts";
import Addpost from "./Components/Posts/Addpost";
import Editposts from "./Components/Posts/Editposts";
import Paparazzi from "./Components/Paparazzi/Paparazzi";
import RssDetails from "./Components/Rss Details/RssDetails";
import Trending from "./Components/Trending/Trending";
import Visualstory from "./Components/Visualstory/Visualstory";
import Login from "./Components/Login/Login";
import Category from "./Components/Category/Category";
import Addcategory from "./Components/Category/Addcategory";
import EditCategory from "./Components/Category/EditCategory";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Addvisual from "./Components/Visualstory/Addvisual";
import Addstory from "./Components/Visualstory/Addstory";
import Editstory from "./Components/Visualstory/editstory";
import Editvisual from "./Components/Visualstory/Editvisual";
import Role from "./Components/Role/Role";
import Createusers from "./Components/Users/Users";
import "./App.css";

function App() {
  const [toggleed, setToggleed] = useState(false);

  const toggle = () => {
    setToggleed(!toggleed);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="d-flex vh-100 p-0 m-0">
          <AuthenticatedContent toggleed={toggleed} toggle={toggle} />
        </div>
      </Router>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? element : <Navigate to="/" />;
};

const AuthenticatedContent = ({ toggleed, toggle }) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && (
       
         <div className={toggleed ? "d-none vh-100 sidebar-visible" : "w-auto h-auto"}>
          <Sidebar />
        </div>
        
      )}
      <div className="col-lg col-md col-sm overflow-auto">
        {isLoggedIn && <Navbar toggle={toggle} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path="/Posts"
                element={<ProtectedRoute element={<Posts />} />}
              />
              <Route
                path="/addpost"
                element={<ProtectedRoute element={<Addpost />} />}
              />
              <Route
                path="/editposts"
                element={<ProtectedRoute element={<Editposts />} />}
              />
              <Route
                path="/paparazzi"
                element={<ProtectedRoute element={<Paparazzi />} />}
              />
              <Route
                path="/category"
                element={<ProtectedRoute element={<Category />} />}
              />
              <Route
                path="/addcategory"
                element={<ProtectedRoute element={<Addcategory />} />}
              />
              <Route
                path="/editcategory"
                element={<ProtectedRoute element={<EditCategory />} />}
              />
              <Route
                path="/rssdetails"
                element={<ProtectedRoute element={<RssDetails />} />}
              />

              <Route
                path="/trending"
                element={<ProtectedRoute element={<Trending />} />}
              />

              <Route
                path="/visualstories"
                element={<ProtectedRoute element={<Visualstory />} />}
              />

              <Route
                path="/addvisual"
                element={<ProtectedRoute element={<Addvisual />} />}
              />
              <Route
                path="/addstory"
                element={<ProtectedRoute element={<Addstory />} />}
              />

              <Route
                path="/editstory"
                element={<ProtectedRoute element={<Editstory />} />}
              />
              <Route
                path="/editvisualstory"
                element={<ProtectedRoute element={<Editvisual />} />}
              />
               <Route
                path="/role"
                element={<ProtectedRoute element={<Role />} />}
              />
               <Route
                path="/createusers"
                element={<ProtectedRoute element={<Createusers />} />}
              />
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
        </Routes>
      </div>
    </>
  );
};

export default App;
