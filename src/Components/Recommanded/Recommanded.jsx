import "./Recommanded.css";
import { convert } from "../../Utilities/digitConverter";
import { Link } from "react-router-dom";
import moment from "moment";

const Recommanded = ({ recomVideos }) => {
  return (
    <div className="Recommanded">
      <div className="Recommanded-videos">
        <h2>Recommanded Videos:</h2>
        {recomVideos ? (
          recomVideos.map((video, index) => {
            return (
              <Link
                to={`/video/${video.snippet?.categoryId}/${video.id}`}
                className="videos"
                key={index}
              >
                <div className="video">
                  <img src={video.snippet?.thumbnails?.standard?.url} alt="" />
                </div>
                <div className="video-info">
                  <h3>{video.snippet?.title.slice(0, 40)}</h3>
                  <Link
                    className="channel-link"
                    to={`/channel/${video.snippet?.channelId}`}
                  >
                    <h4>{video.snippet?.channelTitle}</h4>
                  </Link>
                  <p>
                    {convert(video.statistics?.viewCount)} &bull;
                    {` ` + moment(video.snippet?.publishedAt).fromNow()}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <div>Recommanded Vidoes will appear here</div>
        )}
      </div>
    </div>
  );
};

export default Recommanded;
