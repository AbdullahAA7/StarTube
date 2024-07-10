import { Link, useLocation } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  let location = useLocation();
  let query = location.pathname;
  return (
    <div className="page">
      <h2>
        Sorry Buddy 😔! {query.slice(1)} page is in development proccess.....
      </h2>
      <Link to="/" className="link">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
