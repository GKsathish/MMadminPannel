import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';

const visualStoriesData = [
  {
    categoryName: 'Fashion',
    storyTitle: 'HBD Kajal Aggarwal! Five career-defining roles of the talented actress',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
  {
    categoryName: 'Fashion',
    storyTitle: 'Sai Pallavi BDay Special: Top Films You Can\'t Miss!',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
  {
    categoryName: 'Fashion',
    storyTitle: 'Rowdy Boy\'s Birthday Bash: Unveiling His Diet and Fitness Hacks',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
  {
    categoryName: 'Fashion',
    storyTitle: 'Met Gala 2024: Indian Celebs Who Shone Bright With Their Amazing Looks',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
  {
    categoryName: 'Fashion',
    storyTitle: 'Birthday special: Anushka Sharma\'s heartwarming pictures',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
  {
    categoryName: 'Fashion',
    storyTitle: 'HBD Rohit Sharma: Top 5 Records Of The Hitman That Will Stand The Best Of All Time',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
  {
    categoryName: 'Fashion',
    storyTitle: 'Bollywood Stars Making Waves in Tollywood Films in 2024!',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
  {
    categoryName: 'Fashion',
    storyTitle: 'Happy Birthday the musical maestro: The journey of birthday boy Arijit Singh',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
  {
    categoryName: 'Fashion',
    storyTitle: 'Varun Dhawan Birthday Special: 5 upcoming projects of the Bawaal Actor',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
  {
    categoryName: 'Fashion',
    storyTitle: 'HBD S. Janaki: Some Interesting Facts About India\'s Nightingale & Legendary Singer!',
    categoryType: 'visualstories',
    date: '2024-06-15 11:40:53',
  },
];

const VisualStories = () => {
  const Navigate=useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter visual stories data based on search term
  const filteredVisualStoriesData = visualStoriesData.filter(story =>
    story.storyTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
const gotoaddvisualstories=()=>{
 Navigate("/addvisual");
}

const gotoaddstory=()=>{
  Navigate("/addstory");

}

const gotoeditstory=()=>{
  Navigate("/editvisualstory");

}
  return (
    <section className="container-fluid m-auto p-auto">
      <div className="row">
        <div className="col-12">
        <div className="d-flex justify-content-between m-3">
          <h3 className="fs-4 m-1">Visual Stories</h3>
          <button className="btn btn-outline-info m-2" onClick={gotoaddvisualstories}>Add new</button>
   
</div>
          {/* Search Input and CSV Download Button */}
          <div className="d-flex justify-content-between m-3">
          <CSVLink
              data={filteredVisualStoriesData}
              filename={"visual_stories_data.csv"}
              className="btn btn-outline-success text-dark"
              target="_blank"
            >
              Download CSV
            </CSVLink>
            <input
              type="text"
              className="form-control me-2 w-50"
              placeholder="Search Visual Stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </div>
          <div
                            className="table-responsive rounded  shadow"
                            style={{ height: "70vh", overflowY: "auto" }}
                          >
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category Name</th>
                <th>Story Title</th>
                <th>Category Type</th>
                <th>Manage/substory</th>

                <th>Date</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisualStoriesData.map((story, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{story.categoryName}</td>
                  <td>{story.storyTitle}</td>
                  <td>{story.categoryType}</td>
                  <td>
                    {/* View button (link to view more details can be added) */}
                    <button className="btn btn-outline-info" onClick={gotoaddstory}>Click Here</button>
                  </td>
                  <td>{story.date}</td>
                  <td>
                                      <i class="bi bi-eye fw-bold text-dark"></i>
                                    </td>
                  <td className='d-flex'>
                    <button className="btn btn-outline-warning mx-1"  onClick={gotoeditstory}>edit</button>
                    <button className="btn btn-outline-danger mx-1">Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualStories;
