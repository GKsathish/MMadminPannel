import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import QuillToolbar, { modules, formats } from "./EditorToolbar";

import { useNavigate, useLocation } from "react-router-dom";

const Posts1 = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    postTitle: "",
    contentType: "",
    users: "",
    trendingNow: false,
    hotContent: false,
    sendGmail: false,
    schedulePost: "",
    language: "",
    hashtag: "",
    status: "",
    author: "",
    description: "",
    videoPath: "",
  });
  const [imageFile, setImageFile] = useState(null); // To handle image file

  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file); // Assuming you have setImageFile state to manage the selected file
  };

  const location = useLocation();
  const { categories } = location.state || {};
  const Navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      categoryName: formData.categoryName,
      postTitle: formData.postTitle,
      contentType: formData.contentType,
      users: formData.users,
      trendingNow: formData.trendingNow,
      hotContent: formData.hotContent,
      sendGmail: formData.sendGmail,
      schedulePost: formData.schedulePost,
      language: formData.language,
      hashtag: formData.hashtag,
      status: formData.status,
      description: formData.description,
      videoPath: formData.videoPath
    };

    const wrappedData = new FormData();
    wrappedData.append("data", JSON.stringify(data)); // Send 'data' as the expected part
    wrappedData.append("image", imageFile);
    fetch("http://172.22.9.88:9966/mm/articles", {
      method: "POST",
      body: wrappedData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAlert({ show: true, message: data.message, type: "success" });
        setFormData({
          categoryName: "",
          postTitle: "",
          contentType: "",
          users: "",
          trendingNow: false,
          hotContent: false,
          sendGmail: false,
          schedulePost: "",
          language: "",
          hashtag: "",
          status: "",
          description: "",
        });
        setTimeout(() => {
          setAlert({ show: false, message: "", type: "" });
          Navigate("/Posts");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlert({
          show: true,
          message: "Error adding post. Please try again.",
          type: "danger",
        });
      });
  };

  const redirecttoposts = () => {
    Navigate("/Posts");
  };

  const handleAlertClose = () => {
    setAlert({ show: false, message: "", type: "" });
    Navigate("/Posts");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex justify-content-between mt-3">
          <h4 className="fs-4">Add Posts</h4>
          <button
            className="btn btn-outline-warning text-dark shadow px-3"
            onClick={redirecttoposts}
          >
            Posts
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
        <div className="p-2">
          <form
            className="col-12 h-100 w-100 shadow p-5"
            onSubmit={handleSubmit}
          >
            <div className="row my-4">
              <div className="form-group col-lg">
                <label htmlFor="category">Category Name</label>
                <select
                  id="category"
                  name="categoryName"
                  className="form-control"
                  value={formData.categoryName}
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <option key={item.categoryId} value={item.categoryId}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group col-lg">
                <label htmlFor="postTitle">Post Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="postTitle"
                  name="postTitle"
                  placeholder="Enter Title"
                  value={formData.postTitle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row my-4">
              <div className="form-group col-lg">
                <label htmlFor="rssName">Content Type</label>
                <select
                  id="rssName"
                  name="contentType"
                  className="form-control"
                  value={formData.contentType}
                  onChange={handleChange}
                >
                  <option value="">...Select...</option>
                  <option value="1">Posts</option>
                  <option value="2">Videos</option>

                  <option value="3">Vstories</option>
                </select>
              </div>

              <div className="form-group col-lg">
                <label htmlFor="users">Users</label>
                <select
                  id="users"
                  name="users"
                  className="form-control"
                  value={formData.users}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="infomasala@gmail.com">
                    infomasala@gmail.com
                  </option>
                </select>
              </div>
            </div>

            <div className="row my-4">
              <div className="form-group col-lg">
                <label htmlFor="options" className="m-1">
                  Select Options
                </label>
                <br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="trendingNow"
                    name="trendingNow"
                    checked={formData.trendingNow}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="trendingNow">
                    Trending Now
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="hotContent"
                    name="hotContent"
                    checked={formData.hotContent}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="hotContent">
                    Hot Content
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sendGmail"
                    name="sendGmail"
                    checked={formData.sendGmail}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="sendGmail">
                    Send Gmail
                  </label>
                </div>
              </div>

              <div className="form-group col-lg">
                <label htmlFor="formFileMultiple" className="form-label">
                  Select Images
                </label>
                <input
                  className="form-control"
                  id="formFileMultiple"
                  name="ImagePath"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="row my-4">
              <div className="form-group col-md-6">
                <label htmlFor="videoPath" className="form-label">
                  Video Path
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="videoPath"
                  name="videoPath"
                  placeholder="Video URL"
                  value={formData.videoPath}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row my-4">
              <div className="form-group col-lg">
                <label htmlFor="schedulePost">Schedule Post</label>
                <select
                  id="schedulePost"
                  name="schedulePost"
                  className="form-control"
                  value={formData.schedulePost}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group col-lg">
                <label htmlFor="language">Select Language</label>
                <select
                  id="language"
                  name="language"
                  className="form-control"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="">...Select...</option>
                  <option value="1">English</option>
                  <option value="2">Hindi</option>

                  <option value="3">Telugu</option>
                </select>
              </div>
            </div>

            <div className="row my-4">
              <div className="form-group col-lg">
                <label htmlFor="hashtag">HashTag</label>
                <input
                  type="text"
                  className="form-control"
                  id="hashtag"
                  name="hashtag"
                  placeholder="Enter Hashtag"
                  value={formData.hashtag}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-lg">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">...Select...</option>
                  <option value="1">Publish</option>
                  <option value="0">Pending</option>
                </select>
              </div>
            </div>

            <div className="row my-4">
              <div className="form-group col-12">
                <label htmlFor="content">Content</label>
                <QuillToolbar toolbarId="toolbar" />
                <ReactQuill
                  value={formData.description}
                  onChange={handleQuillChange}
                  modules={modules("toolbar")}
                  formats={formats}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Posts1;
