import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const trendingNewsData = [
  {
    categoryName: 'Movies',
    postTitle: "Vijay Antony's next titled Gagana Maargan; first look and all details here",
    rssName: 'OTT (HT, Mint, DM)',
    status: 'Publish',
    publishedOn: '16-10-2024 14:25:23',
  },
  {
    categoryName: 'Film Gossip',
    postTitle: 'National Crush Rashmika Mandanna is now Brand Ambassador for Indian Cyber Crime Coordination I4C',
    rssName: 'Own Post',
    status: 'Publish',
    publishedOn: '16-10-2024 12:57:38',
  },
  {
    categoryName: 'Film Gossip',
    postTitle: 'लाइव शो में प्रियंका चोपड़ा के पति को महसूस हुआ खतरा, स्टेज से भागे निक जोनस, वीडियो वायरल',
    rssName: 'Manoranjan Hindi',
    status: 'Publish',
    publishedOn: '16-10-2024 12:57:28',
  },
  {
    categoryName: 'Film Gossip',
    postTitle: 'भड़कीं दिव्या खोसला, बोलीं- मिस्टर करण जौहर मुझे चुप कराने के लिए…',
    rssName: 'Manoranjan Hindi',
    status: 'Publish',
    publishedOn: '16-10-2024 12:55:13',
  },
  {
    categoryName: 'Film Gossip',
    postTitle: 'ఇండియన్ సైబర్ క్రైమ్ కోఆర్డినేషన్ బ్రాండ్ అంబాసిడర్ గా ఎంపికైన నేషనల్ క్రష్ రష్మిక మందన్న',
    rssName: 'Own Post',
    status: 'Publish',
    publishedOn: '16-10-2024 12:52:56',
  },
  {
    categoryName: 'Film Gossip',
    postTitle: 'సినిమా టికెట్ ధరలపై ఉప ముఖ్యమంత్రి శ్రీ పవన్ కళ్యాణ్ తో చర్చ',
    rssName: 'Own Post',
    status: 'Publish',
    publishedOn: '16-10-2024 12:40:58',
  },
  {
    categoryName: 'Movies',
    postTitle: "'త్రిముఖ' మోషన్ పోస్టర్ ఆవిష్కరించిన హీరో సాయి ధరమ్ తేజ్",
    rssName: 'Own Post',
    status: 'Publish',
    publishedOn: '16-10-2024 12:33:36',
  },
  {
    categoryName: 'Movies',
    postTitle: 'HBD Prithviraj Sukumaran: L2 Empuraan makers unveil Zayed Masood\'s character poster from Mohanlal starrer',
    rssName: 'OTT (HT, Mint, DM)',
    status: 'Publish',
    publishedOn: '16-10-2024 10:24:45',
  },
  {
    categoryName: 'Film Gossip',
    postTitle: 'Aishwarya Rai fans roast content creator who ‘made fun of’ actor’s style and love for Aaradhya: ‘The audacity…’',
    rssName: 'Hindustan Times',
    status: 'Publish',
    publishedOn: '16-10-2024 10:19:27',
  },
  {
    categoryName: 'Movies',
    postTitle: 'Suriya 45 update: Suriya and RJ Balaji’s project’s genre, shoot plans, and all you need to know',
    rssName: 'OTT (HT, Mint, DM)',
    status: 'Publish',
    publishedOn: '16-10-2024 10:09:08',
  },
];

const Trending = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter trending news data based on search term
  const filteredTrendingNewsData = trendingNewsData.filter(news =>
    news.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container-fluid m-auto p-auto">
      <div className="row">
        <div className="col-12 shadow m-auto">
          <h3 className="fs-4 m-4">Trending News</h3>

          {/* Search Input and CSV Download Button */}
          <div className="d-flex justify-content-between mb-3">
          <CSVLink
              data={filteredTrendingNewsData}
              filename={"trending_news_data.csv"}
              className="btn btn-outline-success text-dark"
              target="_blank"
            >
              Download CSV
            </CSVLink>
            <input
              type="text"
              className="form-control me-2 w-50"
              placeholder="Search Trending News..."
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
                <th>Post Title</th>
                <th>RSS Name</th>
                <th>Status</th>
                <th>Published On</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrendingNewsData.map((news, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{news.categoryName}</td>
                  <td className='wrap'>{news.postTitle}</td>
                  <td>{news.rssName}</td>
                  <td>{news.status}</td>
                  <td>{news.publishedOn}</td>
                  <td>
                    {/* View button (link to view more details can be added) */}
                    <button className="btn btn-outline-info">View</button>
                  </td>
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

export default Trending;
