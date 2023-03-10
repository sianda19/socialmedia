import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./topbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useRef } from "react";
const PF = "https://amarsocial.herokuapp.com/images/";

const Topbar = () => {
  const { dispatch, user } = useContext(AuthContext);
  const history = useNavigate();
  const searchQuery = useRef();
  const showSearch = (e) => {
    if (e.keyCode === 13) {
      console.log("Enerererkekerj");
      history(`/search/${searchQuery.current.value}`);
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    history("/login");
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">MetaSocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="Search for People ,Posts"
            ref={searchQuery}
            onKeyDown={(e) => showSearch(e)}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Homepage</span>
          </Link>

          <span className="topbarLink" onClick={logoutHandler}>
            Logout
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">3</span>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">3</span>
          </div>
          <div className="topbarIconItem">
          <Link to="/messenger" style={{ textDecoration: "none", color: "white" }}>
            <ChatIcon />

          </Link>
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <Link to={`/profile/${user._id}`}>
          <img
            src={user.profilePicture ? user.profilePicture : PF + "avatar.png"}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
