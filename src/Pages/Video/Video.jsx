import "./Video.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import user from "../../assets/user_profile.jpg";
import Recommanded from "../../Components/Recommanded/Recommanded";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { convert } from "../../Utilities/digitConverter";
import { API_KEY } from "../../Utilities/apikey";
import { fetchDataWithCache } from "../../Utilities/fetchDataWithCache";
const Video = () => {
  const [videoData, setVideoData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [recomVideos, setRecomVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId, videoId } = useParams();

  const getVideoData = async () => {
    const Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const localStorageKey = `videoData_${videoId}`;
    const data = await fetchDataWithCache(Url, localStorageKey);
    if (data) {
      setVideoData(data?.items[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getVideoData();
  }, [videoId]);

  const getChannelData = async () => {
    const Url = ` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videoData?.snippet?.channelId}&key=${API_KEY}`;
    const localStorageKey = `channelData_${videoId}`;
    const data = await fetchDataWithCache(Url, localStorageKey);
    if (data) {
      setChannelData(data?.items[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getChannelData();
  }, [videoData]);

  const getVideoComments = async () => {
    const Url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=30&videoId=${videoId}&key=${API_KEY}`;
    const localStorageKey = `videoComments_${videoId}`;
    const data = await fetchDataWithCache(Url, localStorageKey);
    if (data) {
      setCommentData(data?.items);
    }
  };
  useEffect(() => {
    getVideoComments();
  }, [channelData]);

  const getRecomVideos = async () => {
    const Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&regionCode=US&chart=mostPopular&maxResults=50&videoCategoryId=${categoryId}&key=${API_KEY}`;
    const localStorageKey = `recomVideos_${categoryId}`;
    const data = await fetchDataWithCache(Url, localStorageKey);
    if (data) {
      setRecomVideos(data?.items);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRecomVideos();
  }, [videoData]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="Video">
      <div className="video-section">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <h2>
          {videoData ? videoData?.snippet?.title : "Here you can see title"}
        </h2>
        <div className="info">
          <div className="video-info">
            <p>
              {convert(videoData?.statistics?.viewCount)} Views &bull;{" "}
              {moment(videoData?.snippet?.publishedAt).fromNow()}
            </p>
          </div>
          <div className="space"></div>
          <div className="icons-section">
            <div className="likes-icons">
              <div className="icon">
                <img src={like} alt="" />
                <p>{convert(videoData?.statistics?.likeCount)}</p>
              </div>
              <div className="line"></div>
              <div className="icon dislike">
                <img src={dislike} alt="" />
              </div>
            </div>
            <div className="icon share">
              <img src={share} alt="" />
              <p>share</p>
            </div>

            <div className="icon save">
              <img src={save} alt="" />
              <p>save</p>
            </div>
          </div>
        </div>

        <div className="channel-info">
          <div className="channel-data">
            <img
              src={channelData?.snippet?.thumbnails?.high?.url}
              alt="Channel onwer profile pic"
            />
            <div className="channel-name">
              <Link
                to={`/channel/${videoData?.snippet?.channelId}`}
                className="channel-link"
              >
                <h2>{videoData?.snippet?.channelTitle}</h2>
              </Link>
              <p>
                {convert(channelData?.statistics?.subscriberCount)} Subscribers
              </p>
            </div>
          </div>
          <div className="space"></div>
          <div className="subs-btn">
            <button>Subscribe</button>
          </div>
        </div>
        <div className="description">
          <p>
            {videoData
              ? videoData?.snippet?.description.slice(0, 500)
              : "Here you can see description"}
          </p>
        </div>
        <div className="comment-section">
          <div className="line"></div>
          <h3>{convert(videoData?.statistics?.commentCount)} comments</h3>
          <br />
          {commentData ? (
            commentData?.map((comment, index) => {
              return (
                <div className="comments" key={index}>
                  <div className="comments-owner">
                    <div className="owner-pic">
                      <img
                        src={
                          comment.snippet?.topLevelComment?.snippet
                            ?.authorProfileImageUrl || user
                        }
                        alt="User Image"
                      />
                    </div>
                    <div className="owner-info">
                      <h3>
                        {
                          comment.snippet?.topLevelComment?.snippet
                            ?.authorDisplayName
                        }
                      </h3>
                      <p>
                        {moment(
                          comment.snippet?.topLevelComment?.publishedAt
                        ).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div className="comment">
                    <p className="commentContent">
                      {comment.snippet?.topLevelComment?.snippet?.textDisplay.slice(
                        0,
                        200
                      )}
                    </p>
                  </div>
                  <div className="icons">
                    <div className="icon">
                      <img src={like} alt="Like Icon" />
                      <p>
                        {comment.snippet?.topLevelComment?.snippet?.likeCount}
                      </p>
                    </div>
                    <div className="icon">
                      <img src={dislike} alt="Like Icon" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <br />
              <h2>The user disable to show comments</h2>
            </div>
          )}
        </div>
        <div className="line"></div>
      </div>
      <Recommanded recomVideos={recomVideos} />
    </div>
  );
};

export default Video;
