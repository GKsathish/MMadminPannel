import React, { useState } from 'react';

const Editstory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyDescription, setStoryDescription] = useState('');
  const [language, setLanguage] = useState('');

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

  return (
    <div className="container-fluid  p-auto m-auto">
      <h2 className="text-left mb-4">Add  Story</h2>
      <form onSubmit={handleSubmit} className="card shadow" >
        <div className="row m-3">
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
            <small className="text-danger">Please Upload 720 X 1280 in Pixels Only</small>
          </div>
        </div>
        <div className="row m-3">
         
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
        <div className='row m-3'>
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

     

        <div className="d-flex justify-content-between m-3">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default Editstory;
