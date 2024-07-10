import "./Navbar.css";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import search from "../../assets/search.png";
import upload from "../../assets/upload.png";
import notification from "../../assets/notification.png";
import user from "../../assets/user_profile.jpg";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Navbar = ({ setSidebar, setSearch, setQuery }) => {
  const inputRef = useRef(null);

  const handleSearch = async () => {
    let query = inputRef.current?.value;
    setQuery(query);
    if (setSearch == false) {
      query = "";
    }
  };
  return (
    <div className="nav">
      <div className="navbar">
        <div className="logo-box">
          <div className="menu-icon">
            <img
              src={menu}
              alt="Menu Icons"
              className="icon"
              onClick={() => setSidebar((prev) => !prev)}
            />
          </div>
          <Link onClick={() => setSearch(false)}>
            <Link to={"/"}>
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </Link>
        </div>

        <div className="search-box">
          <div className="input-box">
            <input type="text" placeholder="Search" ref={inputRef} />
            <div className="search-icon" onClick={handleSearch}>
              <div onClick={() => setSearch(true)}>
                <img src={search} alt="Search Icon" className="icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="info-box">
          <Link to="/Upload">
            <div className="upload-icon">
              <img src={upload} alt="Upload Icon" className="icon" />
            </div>
          </Link>
          <Link to="/Notification">
            <div className="notifiy-icon">
              <img
                src={notification}
                alt="Notification Icon"
                className="icon"
                style={{ filter: "invert(100%)" }}
              />
            </div>
          </Link>
          <Link to="/MyChannel">
            <div className="user-icon">
              <img src={user} alt="User Img" className="icon" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
