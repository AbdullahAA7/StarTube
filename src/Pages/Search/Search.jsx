import "./Search.css";
import user from "../../assets/user_profile.jpg";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { API_KEY } from "../../Utilities/apikey";
import { fetchDataWithCache } from "../../Utilities/fetchDataWithCache";
function Search({ query }) {
  const [isVideo, setIsVideo] = useState(true);
  const [searchVideos, setSearchVideos] = useState([]);
  const [searchChannels, setSearchChannels] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [videoId, setVideoId] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSearchData = async () => {
    const Url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${query}&key=${API_KEY}`;
    const localStorageKey = `searchData_${query}`;
    const data = await fetchDataWithCache(Url, localStorageKey);

    if (data) {
      if (data.items && data.items.length > 0) {
        const videoResults = data.items.filter(
          (item) => item.id.kind === "youtube#video"
        );
        const channelResults = data.items.filter(
          (item) => item.id.kind === "youtube#channel"
        );
        const firstVideoId = videoResults[0]?.id?.videoId;
        setVideoId(firstVideoId);
        setSearchVideos(videoResults);
        setSearchChannels(channelResults);

        const channelIds = data.items?.map((item) => item.snippet?.channelId);
        getChannelData(channelIds);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getSearchData();
  }, [query]);

  const getChannelData = async (channelIds) => {
    const Url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds?.join(
      ","
    )}&key=${API_KEY}`;
    const localStorageKey = `channelData_${query}`;
    const data = await fetchDataWithCache(Url, localStorageKey);

    if (data) {
      const images = data.items?.reduce((acc, item) => {
        acc[item.id] = item.snippet?.thumbnails?.default?.url; // Store channel image by channel ID.
        return acc;
      }, {});

      setChannelData(images);
    }
    setLoading(false);
  };

  const getVideoData = async () => {
    const Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const localStorageKey = `videoData_${query}`;
    const data = await fetchDataWithCache(Url, localStorageKey);

    if (data) {
      setVideoData(data.items);
    }
    setLoading(false);
  };

  useEffect(() => {
    getVideoData();
  }, [videoId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="Home">
      <div className="searchVideos">
        <div className="nav">
          <div className="buttons">
            <button onClick={() => setIsVideo(true)}>Videos</button>
            <button onClick={() => setIsVideo(false)}>Channels</button>
          </div>
        </div>
        {(isVideo ? searchVideos : searchChannels).map((data, index) => {
          return (
            <Link
              to={
                isVideo
                  ? `/video/${videoData[0]?.snippet?.categoryId}/${data.id?.videoId}`
                  : `/channel/${data.snippet?.channelId}`
              }
              className={`searchVideo ${isVideo ? "" : "channel-img"}`}
              key={index}
            >
              <div className="image">
                <img
                  src={
                    isVideo
                      ? data.snippet?.thumbnails.high.url
                      : channelData[data.snippet?.channelId]
                  }
                  alt=""
                />
              </div>
              <div className="content">
                <h2>{data.snippet?.title}</h2>
                <p>
                  {isVideo && `3M Views`} &bull; &nbsp;
                  {moment(data.snippet?.publishedAt).fromNow()}
                </p>
                {isVideo && (
                  <div className="channel">
                    <img
                      src={channelData[data.snippet?.channelId] || user}
                      alt=""
                    />

                    <Link
                      to={`/channel/${data.snippet?.channelId}`}
                      className="channelName"
                    >
                      <p>{data.snippet?.channelTitle}</p>
                    </Link>
                  </div>
                )}
                <div className="description">
                  <p>{data.snippet?.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
