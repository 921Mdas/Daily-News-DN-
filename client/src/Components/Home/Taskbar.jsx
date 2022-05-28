import { FaFolder } from "react-icons/fa";
import { MdLabelImportant, MdDashboard, MdHideSource } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsFillPenFill, BsFillPersonFill } from "react-icons/bs";
import { GETLIKED_ARTICLE_URL, GET_FAV_ARTICLES } from "../../context/type";
import { GETLIKED_ARTICLE } from "../../context/apiUtil";
import React, { useContext } from "react";
import { MyContext } from "../../context/context";

const TaskBar = ({ currentUser: { id } }) => {
  const { state, dispatch } = useContext(MyContext);

  const showFavoriteArticles = () => {
    GETLIKED_ARTICLE(id).then(fav => {
      dispatch({ type: GET_FAV_ARTICLES, payload: fav });
    });
    console.log("x", state);
  };

  return (
    <div className="home_taskbar">
      <div className="filler"></div>
      <div className="taskbar_icons">
        <button
          onClick={() => showFavoriteArticles()}
          className="task_favorite"
        >
          <FaFolder className="task_icon task_i0 " />
        </button>
        <Link to="/dashboard">
          <MdDashboard className="task_icon task_i2" />
        </Link>
        <Link to="/dashboard/articles">
          <BsFillPenFill className="task_icon task_i3 pen" />
        </Link>
      </div>
    </div>
  );
};

export default TaskBar;
