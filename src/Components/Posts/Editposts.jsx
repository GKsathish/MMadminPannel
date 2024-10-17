

  import React, { useState,useEffect } from 'react';
  import ReactQuill from "react-quill";
  import "react-quill/dist/quill.snow.css"; // Import Quill CSS
  import QuillToolbar, { modules, formats } from "./EditorToolbar"; // Import the correct path

  import { useNavigate, useLocation } from "react-router-dom";


  const Editposts = () => {
    const location = useLocation();
    const { item, categories } = location.state || {}; // Extract 'item' and 'categories' from location state
    const [image, setImage] = useState(null); // State for the new image file


    const [formData, setFormData] = useState({
      categoryName: item?.categoryName || "",
      postTitle: item?.postTitle || "",
      rssName: item?.rssName || "",
      users: item?.users || "",
      trendingNow: item?.trendingNow || false,
      hotContent: item?.hotContent || false,
      sendGmail: item?.sendGmail || false,
      schedulePost: item?.schedulePost || "",
      language: item?.language || "",
      hashtag: item?.hashtag || "",
      status: item?.status || "",
      author: item?.author || "",
      description: item?.description || "",
      contentType: parseInt(item?.contentType) || "",
    });

    const Navigate = useNavigate();

        const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };

    const handleQuillChange = (value) => {
      setFormData({
        ...formData,
        description: value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      const wrappeddata= new FormData();
      wrappeddata.append('data',JSON.stringify(formData));
      console.log(wrappeddata)
      wrappeddata.append('image',image);
      fetch("http://172.22.9.88:9966/mm/articles", {
        method: 'POST', // Use PUT or PATCH for updating data
       
        body: wrappeddata
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        Navigate('/Posts'); // Redirect after successful submission
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
    };
    const [imagePreview, setImagePreview] = useState(item?.imagePath || ""); // Initialize with existing image path if available

    const postredirect = () => {
      Navigate('/Posts');
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl); // Set the image preview URL
        setImage(file); 
      }
    };
    
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='d-flex justify-content-between mt-3'>
            <h4 className='fs-4'>Edit Posts</h4>
            <button className='btn btn-outline-warning text-dark shadow' onClick={postredirect}> Posts</button>
          </div>
          <div className='p-2'>
            <form className='col-12 h-100 w-100 shadow p-5' onSubmit={handleSubmit}>
              <div className="row my-4">
                <div className="form-group col-lg">
                  <label htmlFor="category">Category Name</label>
                  <select
              id="category"
              name="categoryName" // Ensure this matches the state key
              className="form-control"
              value={formData.categoryName} // Adjust this to match your state
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              {categories && categories.map((category) => (
                <option key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
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
                    value={formData.postTitle} // Corrected to formData.postTitle
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
                    value={parseInt(formData.contentType)}
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
                    <option value="infomasala@gmail.com">infomasala@gmail.com</option>
                  </select>
                </div>
              </div>

              <div className="row my-4">
                <div className="form-group col-lg">
                  <label htmlFor="options" className='m-1'>Select Options</label><br />
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="trendingNow"
                      name="trendingNow"
                      checked={formData.trendingNow}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="trendingNow">Trending Now</label>
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
                    <label className="form-check-label" htmlFor="hotContent">Hot Content</label>
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
                    <label className="form-check-label" htmlFor="sendGmail">Send Gmail</label>
                  </div>
                </div>

                <div className="form-group col-lg">
                  <label htmlFor="formFileMultiple" className="form-label">Select Images</label>
                  <input className="form-control w-50" id="formFileMultiple" type="file"  value={formData.imagePath}                       onChange={handleFileChange}
/>
                
              
             
            
                  {imagePreview && (
    <img
      src={imagePreview}
      alt="Preview"
      className='img-fluid mt-3' // Add some margin to separate from the input
      style={{ maxHeight: '300px', objectFit: 'contain' }} // Optional styles for better display
    />
  )}
              
                  </div>
          
              </div>

              <div className="row my-4">
                <div className="form-group col-lg">
                  <label htmlFor="schedulePost">Schedule Post</label>
                  <select
                    id="schedulePost"
                    name="schedulePost"
                    className="form-control"
                    value={formData.schedule_date}
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
                    <option value="">Choose...</option>
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
                    <option value="">Choose...</option>
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
                    modules={modules('toolbar')}
                    formats={formats}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  export default Editposts;

