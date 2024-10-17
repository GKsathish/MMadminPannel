import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://172.22.9.88:9966/mm/getcategory");
      const apiResponse = await response.json();
      const formattedCategories = apiResponse.data.map((category) => ({
        categoryId: category.categoryId,
        categoryName: category.categoryName || "N/A",
        categoryUrl: category.categoryUrl || "N/A",
        categoryCode: category.categoryCode || "N/A",
        language: category.language || "N/A",
        categoryType: category.categoryType || "N/A",
        categoryQuery: category.categoryQuery || "N/A",
        homeViewType: category.homeViewType || "N/A",
        categoryGroupId: category.categoryGroupId || "N/A",
        status: category.status,
      }));
      setLoading(true);

      setCategories(formattedCategories);

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const redirectToAdds = () => {
    navigate("/addcategory");
  };

  // Function to navigate to the edit category page

  const handleEditCategory = (category) => {
    navigate(`/editcategory`, { state: { category } }); // Pass the category object
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter categories based on the search term
  const filteredCategories = categories.filter((category) => {
    const nameMatch = category.categoryName.includes(searchTerm);
    const languageMatch =
      (category.language === 1 && "english".includes(searchTerm)) ||
      (category.language === 2 && "hindi".includes(searchTerm)) ||
      (category.language === 3 && "telugu".includes(searchTerm));
    return nameMatch || languageMatch;
  });
  const convertToCSV = (data) => {
    const header = [
      "Category ID",
      "Category Name",
      "Category URL",
      "Category Code",
      "Language",
      "Category Type",
      "Category Query",
      "Home View Type",
      "Category Group ID",
      "Status",
    ];

    const rows = data.map((category) => [
      category.categoryId,
      category.categoryName,
      category.categoryUrl,
      category.categoryCode,
      category.language,
      category.categoryType,
      category.categoryQuery,
      category.homeViewType,
      category.categoryGroupId,
      category.status,
    ]);

    // Create a CSV string
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    return csvContent;
  };

  // Function to trigger CSV download
  const downloadCSV = () => {
    const csvData = convertToCSV(filteredCategories);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "categories.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteCategory = (category) => {
    const apiUrl = `http://172.22.9.88:9966/mm/delete/${category.categoryId}`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setAlert({ show: true, message: "Deleted Suuccess", type: "success" });

          setTimeout(() => {
            setAlert({ show: false, message: "", type: "" });
            navigate("/category");
            fetchCategories();
          }, 1000);
        } else {
          // Handle unsuccessful response
          return response.json().then((errorData) => {
            alert(`Failed to delete category: ${errorData.message}`);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while deleting the category.");
      });
  };

  const handleAlertClose = () => {
    setAlert({ show: false, message: "", type: "" });
    navigate("/category");
  };

  return (
    <section className="container-fluid p-auto m-auto">
      <div className="row">
        <div className="d-flex    justify-content-between  flex-wrap mt-5 px-4">
          <h3 className="fs-4">Category</h3>
          <button
            className="btn btn-outline-info text-dark shadow"
            onClick={redirectToAdds}
          >
            Add Category
          </button>
        </div>
        {alert.show && (
          <div
            className={`alert alert-${alert.type} alert-dismissible  w-50 fade show m-auto p-auto`}
            role="alert"
          >
            {alert.message}
            <button
              type="button"
              className="btn-close"
              onClick={handleAlertClose}
            ></button>
          </div>
        )}
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="page-title-box pt-2"></div>
              <div className="row">
                <div className="col-12">
                {loading ? <> 
                  <div className="card shadow cutsom-shadow">
                    <div className="card-body">
                   
                      <div className="mb-3 d-flex  align-items-center  flex-wrap">
                        <label className="form-group fw-bold fs-5 ">
                          Search Category :
                        </label>
                        <input
                          type="text"
                          placeholder="Search by Name or Language..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="form-control mx-3 w-auto"
                        />
                        <button
                          className="btn btn-outline-success m-3 m-2"
                          onClick={downloadCSV}
                        >
                          Download
                        </button>
                      </div>
                    <div className="table-responsive" style={{ height: "70vh", overflowY: 'auto'}}>
                        <table className="table table-hover  table-bordered">
                          <thead className="text-start">
                            <tr>
                              <th>Category Name</th>
                              <th>Language</th>
                              <th>Category Type</th>
                              <th>Home View Type</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody className="text-start ">
                            {filteredCategories.map((category) => (
                              <tr
                                key={category.categoryId}
                                onClick={() =>
                                  handleEditCategory(category.categoryId)
                                }
                              >
                                <td>{category.categoryName}</td>
                                <td>
                                  {category.language === 1
                                    ? "English"
                                    : category.language === 2
                                    ? "Hindi"
                                    : category.language === 3
                                    ? "Telugu"
                                    : ""}
                                </td>
                                <td>
                                  {category.categoryType === 1
                                    ? "Post"
                                    : category.categoryType === 2
                                    ? "Videos"
                                    : category.categoryType === 3
                                    ? "Vstories"
                                    : ""}
                                </td>
                                <td>{category.homeViewType}</td>
                                <td>
                                  <div
                                    className={`badge ${
                                      category.status === 0
                                        ? "bg-success"
                                        : "bg-danger"
                                    }`}
                                  >
                                    {category.status === 0
                                      ? "Active"
                                      : "InActive"}
                                  </div>
                                </td>
                                <td className="d-flex">
                                  <button
                                    className="btn btn-outline-secondary btn-sm mx-1"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click event
                                      handleEditCategory(category);
                                    }}
                                  >
                                    <i class="bi bi-pencil-square m-1 text-dark"></i>
                                  </button>
                                  <button
                                    className="btn btn-outline-danger btn-sm mx-1"
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent row click event
                                      handleDeleteCategory(category);
                                    }}
                                  >
                                    <i class="bi bi-trash m-1 text-dark"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                   
                    </div>
                  </div>
                  </>
                  :<center  className="m-4"><FadeLoader color="#102154"/></center>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;


