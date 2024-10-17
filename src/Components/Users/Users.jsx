import React, { useState } from "react";
import { CSVLink } from "react-csv";

const Users = () => {
  // Static roles data
  const [roles, setRoles] = useState([
    { userName: "konkati.sravya",roleName: "konkati.sravya@beeinnovations.com", status: "Active" },
    { userName: "satish",roleName: "satish@mm", status: "Active" },
    { userName: "md.abdul",roleName: "md.abdul@beeinnovations.com", status: "Active" },
    { userName: "rjsuneetha",roleName: "rjsuneetha@beeinnovations.com", status: "Active" },
    { userName: "nirisha",roleName: "nirisha.g@beeinnovations.com", status: "Active" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter roles based on search term
  const filteredRoles = roles.filter((role) =>
    role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CSV headers and data
  const csvHeaders = [
    { label: "Role Name", key: "roleName" },
    { label: "Status", key: "status" },
  ];

  const csvData = filteredRoles.map((role) => ({
    roleName: role.roleName,
    status: role.status,
  }));

  // Delete Role
  const handleDelete = (index) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    setRoles(updatedRoles);
  };

  return (

      <div className="row m-auto p-auto">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center m-3">
            <h3 className="fs-4">Create user</h3>
            <div>
              <button
                className="btn btn-outline-primary me-2 shadow"
                onClick={() => alert("Add Role clicked!")}
              >
                Add user
              </button>
              {/* CSV Download Button */}
            </div>
          </div>
          <div className="d-flex  justify-content-between m-3">
            {/* Search bar */}

            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename={"roles.csv"}
              className="btn btn-outline-success text-dark"
            >
              Download CSV
            </CSVLink>

            <input
              type="text"
              className="form-control  mx-2 w-50"
              placeholder="Search by role name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div
            className="table-responsive rounded shadow "
            style={{ minHeight: "60vh", overflowY: "auto" }}
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>RSS Access</th>
                  <th>Status</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{role.userName}</td>
                    <td>{role.roleName}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => alert("Permissions clicked!")}
                      >
                       <i
                          class="bi bi-eye m-1 text-light"
                          onClick={() => handleDelete(index)}
                        ></i>
                      </button>
                    </td>
                    <td>{role.status}</td>
                    <td>
                      <span>
                        <i
                          class="bi bi-trash m-1 text-dark"
                          onClick={() => handleDelete(index)}
                        ></i>
                      </span>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
};

export default Users;
