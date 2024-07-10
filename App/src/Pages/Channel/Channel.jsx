import "./Channel.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_KEY } from "../../Utilities/apikey.js";
import { convert } from "../../Utilities/digitConverter.js";
import moment from "moment";
import Footer from "../../Components/Footer/Footer.jsx";
const Channel = () => {
  const [videos, setVideos] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [bannerImg, setBannerImg] = useState([]);
  const [videoCategory, setVideoCategory] = useState([]);
  const { channelId } = useParams();

  const getChannelData = async () => {
    const Url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;
    await fetch(Url)
      .then((res) => res.json())
      .then((data) => setChannelData(data?.items[0]));

    const banner_url = ` https://youtube.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${API_KEY}`;
    await fetch(banner_url)
      .then((res) => res.json())
      .then((data) =>
        setBannerImg(data.items[0]?.brandingSettings?.image?.bannerExternalUrl)
      );
  };
  useEffect(() => {
    getChannelData();
  }, []);
  const getVideosData = async () => {
    const Url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=50&type=video&order=date&key=${API_KEY}`;
    await fetch(Url)
      .then((res) => res.json())
      .then((data) => setVideos(data?.items));
  };
  useEffect(() => {
    getVideosData();
  }, [channelData]);

  const getVideoCategory = async () => {
    const Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videos[0]?.id?.videoId}&key=${API_KEY}`;
    await fetch(Url)
      .then((res) => res.json())
      .then((data) => setVideoCategory(data?.items[0]));
  };
  useEffect(() => {
    getVideoCategory();
  }, [videos]);
  console.log(channelData?.statistics?.videoCount);
  return (
    <div className="Channel">
      <div className="channel-details">
        <div className="banner-img">
          {bannerImg && <img src={bannerImg} alt="" />}
        </div>
        <div className="channel">
          <div className="channel-img">
            <img src={channelData?.snippet?.thumbnails?.high?.url} alt="" />
          </div>
          <div className="channel-info">
            <h2>{channelData?.snippet?.title}</h2>
            <h4>
              {channelData?.snippet?.customUrl} &nbsp;
              {convert(channelData?.statistics?.subscriberCount)} subscriber
              &bull; {convert(channelData?.statistics?.videoCount)} videos
            </h4>
            <p>{channelData?.snippet?.description.slice(0, 100) + "..."}</p>
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="navbar">
        <div className="links">
          <h3>Videos</h3>
          <div className="line"></div>
        </div>
      </div>
      <div className="sep-line"></div>

      <div className="videos">
        {videos.map((video, index) => {
          return (
            <Link
              to={`/video/${videoCategory?.snippet?.categoryId}/${video?.id?.videoId}`}
              className="video"
              key={index}
            >
              <img src={video?.snippet?.thumbnails?.high?.url} alt="" />
              <h3>{video?.snippet?.title.slice(0, 70)}</h3>
              <p>
                3M Views &bull; {moment(video?.snippet?.publishedAt).fromNow()}
              </p>
            </Link>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Channel;
