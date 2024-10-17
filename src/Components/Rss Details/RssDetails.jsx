import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const rssData = [
  {
    categoryName: 'Sports',
    rssName: 'HT Sports Hindi',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/livehindustan/cricket',
    status: 'Active',
  },
  {
    categoryName: 'Film Gossip',
    rssName: 'Manoranjan Hindi',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/livehindustan/manoranjan',
    status: 'Active',
  },
  {
    categoryName: 'Horoscope',
    rssName: 'HT Horoscope',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/ht/horoscope',
    status: 'Active',
  },
  {
    categoryName: 'Sports',
    rssName: 'Hindustan Sports (08-12-2021)',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/ht/sports',
    status: 'Active',
  },
  {
    categoryName: 'Tech & Gadgets',
    rssName: 'Hindustan Times',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/ht/technews',
    status: 'Active',
  },
  {
    categoryName: 'Auto News',
    rssName: 'Hindustan Times',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/ht/auto',
    status: 'Active',
  },
  {
    categoryName: 'Health & Wellness',
    rssName: 'Hindustan Times',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/ht/lifestyle',
    status: 'Active',
  },
  {
    categoryName: 'Film Gossip',
    rssName: 'Hindustan Times',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/ht/entertainment',
    status: 'Active',
  },
  {
    categoryName: 'Sports',
    rssName: 'Hindustan Times',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/ht/ipl',
    status: 'Active',
  },
  {
    categoryName: 'Health & Wellness',
    rssName: 'Healthshots',
    rssSourceUrl: 'https://news.htsyndication.com/news/rss/mobilemasala/healthshots/latest',
    status: 'Active',
  },
];

const RssDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter RSS data based on search term
  const filteredRssData = rssData.filter(rss =>
    rss.rssName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container-fluid m-auto p-auto">
      <div className="row">
        <div className="col-12 shadow">
           
        <div className="d-flex justify-content-between my-3">
          <h3 className="fs-4 m-2">RSS Details</h3>

      
          <button className="btn btn-outline-info m-2">Add RSS</button>
</div>
        
          <div className="d-flex justify-content-between m-3">
          

            {/* CSV Download Button */}
            <CSVLink
              data={filteredRssData}
              filename={"rss_data.csv"}
              className="btn btn-outline-success text-dark mx-1"
              target="_blank"
            >
              Download CSV
            </CSVLink>
            <input
              type="text"
              className="form-control  me-2 w-50"
              placeholder="Search RSS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div
                            className="table-responsive rounded  shadow"
                            style={{ minHeight: "70vh", overflowY: "auto" }}
                          >
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category Name</th>
                <th>RSS Name</th>
                <th>RSS Source URL</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRssData.map((rss, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rss.categoryName}</td>
                  <td>{rss.rssName}</td>
                  <td>
                    <a href={rss.rssSourceUrl} target="_blank" rel="noopener noreferrer">
                      {rss.rssSourceUrl}
                    </a>
                  </td>
                  <td>{rss.status}</td>
                  <td className='d-flex'>
                    <button className="btn btn-outline-warning m-1">Edit</button>
                    <button className="btn btn-outline-danger m-1">Del</button>
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

export default RssDetails;
