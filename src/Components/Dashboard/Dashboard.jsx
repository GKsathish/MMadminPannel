import React from "react";

const Dashboard = () => {
  return (
    <div className="row m-auto p-auto">
      <div className=" my-5 ">
        <h3 className="fs-4">Dashboard</h3>
        <p>Welcome to Mobile Masala</p>
      </div>
      <div className="col-12 col-md ">
        <span className="rounded-2 p-3 text-light shadow m-1  bg-warning d-flex justify-content-between">
          <img
            src="../01.png"
            alt="log"
            style={{ height: "50px", width: "50px" }}
          />
          <span>
            <h4 className="text-center">Posts</h4>
            <h5 className="text-center">2917</h5>
          </span>
        </span>
      </div>
      <div className="col-12 col-md ">
        <span className="rounded-2 p-3 text-light shadow m-1 bg-success d-flex justify-content-between">
          <img
            src="../02.png"
            alt="logo"
            style={{ height: "50px", width: "50px" }}
          />
          <span>
            <h4 className="text-center">Rss Details</h4>
            <h5 className="text-center">11</h5>
          </span>
        </span>
      </div>{" "}
      <div className="col-12 col-md ">
        <span className="rounded-2 p-3 text-light shadow  m-1  bg-info d-flex justify-content-between">
          <img
            src="../02.png"
            alt="logo"
            style={{ height: "50px", width: "50px" }}
          />
          <span>
            <h4 className="text-center">Visual Stories</h4>
            <h5 className="text-center">143 </h5>
          </span>
        </span>
      </div>
      <div className="col-12  col-md">
        <span className="rounded-2 p-3 text-light shadow  m-1  bg-danger d-flex justify-content-between">
          <img
            src="../02.png"
            alt="logo"
            style={{ height: "50px", width: "50px" }}
          />
          <span>
            <h4 className="text-center">Categories</h4>
            <h5 className="text-center">23</h5>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
