import "./index.css";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Video from "./Pages/Video/Video.jsx";
import { useState } from "react";
import Channel from "./Pages/Channel/Channel.jsx";
import NotFound from "./Pages/NotFound/NotFound.jsx";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [search, setSearch] = useState(false);
  let [query, setQuery] = useState("");
  return (
    <>
      <Navbar
        setSidebar={setSidebar}
        setSearch={setSearch}
        setQuery={setQuery}
      />
      <Routes>
        <Route
          path="/"
          element={<Home sidebar={sidebar} search={search} query={query} />}
        />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        <Route path="/channel/:channelId" element={<Channel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
