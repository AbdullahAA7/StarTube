import "./Sidebar.css";
import home from "../../assets/home.png";
import game from "../../assets/game_icon.png";
import entertainment from "../../assets/entertainment.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import tech from "../../assets/tech.png";
import blogs from "../../assets/blogs.png";
import music from "../../assets/music.png";
import news from "../../assets/news.png";
import tom from "../../assets/tom.png";
import megan from "../../assets/megan.png";
import jack from "../../assets/jack.png";
import gerard from "../../assets/gerard.png";
import cameron from "../../assets/cameron.png";

function Sidebar({ sidebar, category, setCategory }) {
  return (
    <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
      <div className="categorty">
        <div
          className={`home ${category == 0 ? "active" : ""}`}
          onClick={() => setCategory(0)}
        >
          <img src={home} alt="" />
          <div className="para">
            <p>Home</p>
          </div>
        </div>
        <div
          className={`home ${category == 20 ? "active" : ""}`}
          onClick={() => setCategory(20)}
        >
          <img src={game} alt="" />
          <div className="para">
            <p>Gaming</p>
          </div>
        </div>
        <div
          className={`home ${category == 24 ? "active" : ""}`}
          onClick={() => setCategory(24)}
        >
          <img src={entertainment} alt="" />
          <div className="para">
            <p>Entertainment</p>
          </div>
        </div>
        <div
          className={`home ${category == 2 ? "active" : ""}`}
          onClick={() => setCategory(2)}
        >
          <img src={automobiles} alt="" />
          <div className="para">
            <p>Automobiles</p>
          </div>
        </div>
        <div
          className={`home ${category == 17 ? "active" : ""}`}
          onClick={() => setCategory(17)}
        >
          <img src={sports} alt="" />
          <div className="para">
            <p>Sports</p>
          </div>
        </div>
        <div
          className={`home ${category == 25 ? "active" : ""}`}
          onClick={() => setCategory(25)}
        >
          <img src={news} alt="" />
          <div className="para">
            <p>News</p>
          </div>
        </div>
        <div
          className={`home ${category == 22 ? "active" : ""}`}
          onClick={() => setCategory(22)}
        >
          <img src={blogs} alt="" />
          <div className="para">
            <p>Blogs</p>
          </div>
        </div>
        <div
          className={`home ${category == 28 ? "active" : ""}`}
          onClick={() => setCategory(28)}
        >
          <img src={tech} alt="" />
          <div className="para">
            <p>Technology</p>
          </div>
        </div>
        <div
          className={`home ${category == 10 ? "active" : ""}`}
          onClick={() => setCategory(10)}
        >
          <img src={music} alt="" />
          <div className="para">
            <p>Music</p>
          </div>
        </div>
      </div>
      <div className="line"></div>
      <div className="channels">
        <h2>Subscriptions</h2>
        <div className="channel">
          <img src={tom} alt="Tom pics" />
          <p>Visual Boy</p>
        </div>
        <div className="channel">
          <img src={megan} alt="Tom pics" />
          <p>Stylish Girl</p>
        </div>
        <div className="channel">
          <img src={jack} alt="Tom pics" />
          <p>Coding Pro</p>
        </div>
        <div className="channel">
          <img src={gerard} alt="Tom pics" />
          <p>Psychology Guru</p>
        </div>
        <div className="channel">
          <img src={cameron} alt="Tom pics" />
          <p>5 min Craft</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
