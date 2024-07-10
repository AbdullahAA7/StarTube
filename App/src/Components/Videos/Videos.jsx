import "./Videos.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { useEffect, useState } from "react";
import { convert } from "../../Utilities/digitConverter";
import { API_KEY } from "../../Utilities/apikey";
import img from "../../assets/noimg.png";
import { fetchDataWithCache } from "../../Utilities/fetchDataWithCache";

const Videos = ({ sidebar, category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&regionCode=US&chart=mostPopular&maxResults=100&videoCategoryId=${category}&prettyPrint=true&key=${API_KEY}`;
    const localStorageKey = `youtubeData_${category}`;
    const fetchedData = await fetchDataWithCache(url, localStorageKey);

    if (fetchedData) {
      setData(fetchedData.items);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <div className={`videos ${sidebar ? "" : "more-video"}`}>
        {data?.map((video, index) => (
          <Link
            to={`/video/${video.snippet.categoryId}/${video.id}`}
            className="video"
            key={index}
          >
            <img
              src={video.snippet.thumbnails.maxres?.url || img}
              alt="Video"
            />
            <h3>
              {video.snippet.title.length >= 52
                ? video.snippet.title.slice(0, 50) + "..."
                : video.snippet.title}
            </h3>
            <Link
              to={`/channel/${video.snippet.channelId}`}
              className="channel-name"
            >
              <h4 className="channel" style={{ textDecoration: "none" }}>
                {video.snippet.channelTitle}
              </h4>
            </Link>
            <p>
              {convert(video.statistics.viewCount)} Views &bull;{" "}
              {moment(video.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Videos;
