import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(200);
  const [totalPosts, setTotalPosts] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // State variables for filters
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    fetchPosts(currentPage);
    categorydata();
  }, [currentPage, pageSize]);

  const categorydata = async () => {
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
      setCategories(formattedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPosts = async (page) => {
    try {
      const response = await fetch(
        `http://172.22.9.88:9966/mm/getarticles?page=${
          page + 1
        }&size=${pageSize}`
      );
      const apiResponse = await response.json();
      setLoading(true);
      setPosts(apiResponse.data); // Assuming apiResponse.data contains the list of posts
      setTotalPosts(apiResponse.totalPosts); // Make sure your API response contains total posts count
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const navigate = useNavigate();

  const redirectToAdds = () => {
    navigate("/addpost", { state: { categories } });
  };

  const [filterdata, setFiltereddata] = useState("");
  const Searchfunction = (e) => {
    const value = e.target.value;
    setFiltereddata(value);
    if (value !== "") {
      setPosts(filtermethod(value));
    } else {
      fetchPosts(currentPage);
    }
  };

  const filtermethod = (value) => {
    return posts.filter((item) => item.postTitle.includes(value));
  };
  const handleDeleteposts = (item) => {
    alert(item);
  };
  const handleEditposts = async (item) => {
    navigate("/editposts", { state: { item, categories } });
  };

  const convertToCSV = (posts) => {
    const header = [
      "Category ID",
      "Category Name",
      "Category URL",
      "Category Code",
      "Language",
      "Category Type",
      "Category Query",
      "Created At",
      "Published Date",
      "Edited On",
      "Status",
      "Uploaded By",
    ];

    const rows = posts.map((category) => [
      category.categoryId,
      category.categoryName,
      category.categoryUrl,
      category.categoryCode,
      category.language,
      category.categoryType,
      category.categoryQuery,
      category.createdAt,
      category.publishedDate,
      category.publishedOn || "N/A", // Ensure publishedOn is handled properly
      category.status === 1 ? "Publish" : "Pending",
      category.uploadedBy,
    ]);

    // Join headers and rows with commas and new lines
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    return csvContent;
  };

  // Function to trigger CSV download
  const downloadCSV = () => {
    if (!posts || posts.length === 0) {
      alert("No data available to download.");
      return;
    }

    const csvData = convertToCSV(posts);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "posts.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const filteredPosts = posts.filter((post) => {
      // Apply the selected filters
      const matchesCategory = selectedCategory
        ? post.categoryName === selectedCategory
        : true;
     
      const matchesStatus = selectedStatus
        ? post.status === selectedStatus
        : true;

      return matchesCategory  || matchesStatus;
    });

    // Update the state with the filtered posts
    setPosts(filteredPosts);
  };

  return (
    <section className="container-fluid m-auto p-auto">
      <div className="row">
        <div className="d-flex justify-content-between flex-wrap mt-5 px-4">
          <h3 className="fs-4">Posts</h3>
          <button
            className="btn btn-outline-info shadow"
            onClick={redirectToAdds}
          >
            Add Posts
          </button>
        </div>
        <div className="content-page">
          <div className="content">
            <div className="container-fluid">
              <div className="page-title-box pt-2"></div>
              <div className="row">
                <div className="col-12">
                  {loading ? (
                    <>
                      <div className="card shadow  custom-shadow">
                        <div className="card-body">
                          <form onSubmit={handleSubmit} className="row shadow border rounded p-2 m-1">
                            <div className="form-group col-12 col-md d-flex align-items-center m-1">
                              <label className="form-label mb-0 me-2 fw-bold">
                                Categories:{" "}
                              </label>
                              <select id="inputState1" className="form-control"            value={selectedCategory}
 onChange={(e) => setSelectedCategory(e.target.value)}>
                                {categories.map((item) => (
                                  <option
                                    key={item.categoryId}
                                    value={item.categoryName}
                                  >
                                    {item.categoryName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group col-12 col-md d-flex align-items-center m-1">
                              <label className="form-label mb-0 me-2 fw-bold">
                                Language:{" "}
                              </label>
                              <select id="inputState2" className="form-control"   value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}>
                                <option defaultValue>Choose...</option>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Teugu</option>
                              </select>
                            </div>
                            <div className="form-group col-12 col-md d-flex align-items-center m-1">
                              <label className="form-label mb-0 me-2 fw-bold">
                                Status:{" "}
                              </label>
                              <select id="inputState3" className="form-control"  value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}>
                                <option defaultValue>Choose...</option>
                                <option>Publish</option>
                                <option>Pending</option>
                              </select>
                            </div>
                            <div className="col-12 col-md d-flex align-items-center m-1">
                              <button className="btn btn-outline-warning text-dark w-auto fw-bold px-md-4">
                                Submit
                              </button>
                            </div>
                          </form>
                          <div className="row m-3">
                            <div className="col-12 d-flex flex-wrap justify-content-between">
                              <div className="btn btn-outline-success m-auto ">
                                <i
                                  className="fas fa-file-csv fs-sm-6"
                                  onClick={downloadCSV}
                                >
                                  Download csv
                                </i>
                              </div>
                              <div className="form-group m-auto d-flex align-content-center">
                                <label className="form-label m-2 fw-bold">
                                  Search:
                                </label>
                                <input
                                  type="text"
                                  placeholder="Search..."
                                  className="form-control"
                                  onChange={Searchfunction}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="table-responsive rounded "
                            style={{height: "70vh", overflowY: "auto" }}
                          >
                            <table className="table table-hover table-bordered shadow p-2">
                              <thead className="text-start">
                                <tr>
                                  <th>S.No</th>
                                  <th>Category Name</th>
                                  <th>RSS Name</th>
                                  <th>Status</th>
                                  <th>Received on</th>
                                  <th>Published on</th>
                                  <th>Edited on</th>
                                  <th>View</th>
                                  <th>Actions</th>
                                  <th>Uploaded by</th>
                                </tr>
                              </thead>
                              <tbody className="text-start">
                                {posts.map((item, index) => (
                                  <tr key={index}>
                                    <td>
                                      {index + 1 + currentPage * pageSize}
                                    </td>
                                    <td >{item.categoryName}</td>
                                    <td >{item.postTitle}</td>
                                    <td>
                                      {item.status === 1
                                        ? "Publish"
                                        : "Pending"}
                                    </td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.publishedDate}</td>
                                    <td>{item.publishedOn}</td>
                                    <td>
                                      <i class="bi bi-eye fw-bold text-dark"></i>
                                    </td>
                                    <td className="d-flex">
                                      {" "}
                                      <button
                                        className="btn btn-outline-secondary btn-sm mx-1"
                                        onClick={(e) => {
                                          e.stopPropagation(); // Prevent row click event
                                          handleEditposts(item);
                                        }}
                                      >
                                        <i class="bi bi-pencil-square mx-1 text-dark"></i>
                                      </button>
                                      <button
                                        className="btn btn-outline-danger btn-sm mx-1"
                                        onClick={(e) => {
                                          e.stopPropagation(); // Prevent row click event
                                          handleDeleteposts(item);
                                        }}
                                      >
                                        <i class="bi bi-trash m-1 text-dark"></i>
                                      </button>
                                    </td>
                                    <td>{item.uploadedBy}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="d-flex justify-content-center align-content-center m-2">
                                <button
                                  disabled={currentPage === 0}
                                  onClick={() =>
                                    setCurrentPage((prevPage) => prevPage - 1)
                                  }
                                  className="btn btn-outline-info px-3"
                                >
                                  Prev
                                </button>
                                <span className="m-1 px-2">
                                  {currentPage + 1}
                                </span>
                                <button
                                  disabled={
                                    currentPage >=
                                    Math.ceil(totalPosts / pageSize) - 1
                                  }
                                  onClick={() =>
                                    setCurrentPage((prevPage) => prevPage + 1)
                                  }
                                  className="btn btn-outline-info  px-3"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <center className="my-4">
                      <FadeLoader color="#102154" />
                    </center>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Posts;
