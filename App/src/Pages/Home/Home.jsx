import Sidebar from "../../Components/Sidebar/Sidebar";
import Videos from "../../Components/Videos/Videos";
import "./Home.css";
import { useState } from "react";
import Search from "../Search/Search";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
const Home = ({ sidebar, search, query }) => {
  const [category, setCategory] = useState(0);

  return (
    <div className="Page">
      <div className="Home">
        <Sidebar
          sidebar={sidebar}
          category={category}
          setCategory={setCategory}
        />
        <div className="videos-section">
          {search == false ? (
            <Videos sidebar={sidebar} category={category} />
          ) : (
            <Search query={query} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
