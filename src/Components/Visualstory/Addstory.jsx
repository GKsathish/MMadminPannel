import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Addstory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [storyTitle, setStoryTitle] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [language, setLanguage] = useState("");
  const Navigate=useNavigate();

  const stories = [
    {
      title: "Celeb Style File: Lakme Fashion Week 2024",
      category: "Fashion",
      description: "Shraddha Kapoor",
      imageUrl: "path_to_image/shraddha_kapoor.jpg",
      language: "English",
    },
    {
      title: "Celeb Style File: Lakme Fashion Week 2024",
      category: "Fashion",
      description: "Aditi Rao Hydari",
      imageUrl: "path_to_image/aditi_rao_hydari.jpg",
      language: "English",
    },
    {
      title: "Celeb Style File: Lakme Fashion Week 2024",
      category: "Fashion",
      description: "Bhumi Pednekar",
      imageUrl: "path_to_image/bhumi_pednekar.jpg",
      language: "English",
    },
    {
      title: "Celeb Style File: Lakme Fashion Week 2024",
      category: "Fashion",
      description: "Ananya Panday",
      imageUrl: "path_to_image/ananya_panday.jpg",
      language: "English",
    },
    {
      title: "Celeb Style File: Lakme Fashion Week 2024",
      category: "Fashion",
      description: "Manushi Chhillar",
      imageUrl: "path_to_image/manushi_chhillar.jpg",
      language: "English",
    },
  ];
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({
      categoryName,
      image,
      storyTitle,
      storyDescription,
      language,
    });
  };

  const gotoeditstory=()=>{
      Navigate("/editstory");
  }
  return (
    <div className="container-fluid  p-auto m-auto">
      <h2 className="text-left mb-4">Add Story</h2>
      <form onSubmit={handleSubmit} className="card shadow">
        <div className="row m-2">
          <div className="col-12 col-md-6">
            <label className="form-label">Category Name *</label>
            <select
              className="form-select"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Fashion">Fashion</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Technology">Technology</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label">Choose Images *</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <small className="text-danger">
              Please Upload 720 X 1280 in Pixels Only
            </small>
          </div>
        </div>
        <div className="row m-2">
          <div className="col-12 col-md-6">
            <label className="form-label">Story Title *</label>
            <input
              type="text"
              className="form-control"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              required
            />
          </div>
          <div className=" col-12 col-md-6">
            <label className="form-label">Select Language</label>
            <select
              className="form-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Telugu">Telugu</option>
              {/* Add more languages as needed */}
            </select>
          </div>
        </div>
        <div className="row m-2">
          <div className=" col-6">
            <label className="form-label">Story Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={storyDescription}
              onChange={(e) => setStoryDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center m-3">
          <button type="submit" className="btn btn-primary mx-1">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary mx-1"
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </form>
      <div>
        <div
          className="table-responsive rounded  shadow my-3"
          style={{ minheight: "60vh", overflowY: "auto" }}
        >
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Image</th>
                <th>Language</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((story, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{story.title}</td>
                  <td>{story.category}</td>
                  <td>{story.description}</td>
                  <td>
                    {story.image && (
                      <img
                        src={story.imageUrl}
                        alt={story.storyTitle}
                        style={{ width: "100px", height: "auto" }}
                      />
                    )}
                  </td>
                  <td>{story.language}</td>
                  <td>
                    <button className="btn btn-outline-warning mx-1" onClick={gotoeditstory}>Edit</button>
                    <button className="btn btn-outline-danger mx-1">Del</button>
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

export default Addstory;
