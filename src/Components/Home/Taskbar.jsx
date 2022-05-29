import { FaFolder } from "react-icons/fa";
import { MdLabelImportant, MdDashboard, MdHideSource } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsFillPenFill, BsFillPersonFill } from "react-icons/bs";
import { GETLIKED_ARTICLE_URL, GET_FAV_ARTICLES } from "../../context/type";
import { GETLIKED_ARTICLE } from "../../context/apiUtil";
import React, { useContext, useState } from "react";
import { MyContext } from "../../context/context";
import Favorites from "./Favorites";

const TaskBar = ({ currentUser: { id }, state: source }) => {
  const { state, dispatch } = useContext(MyContext);
  const [position, setPosition] = useState(false);

  const moveFavAway = () => {
    setPosition(!position);
  };

  return (
    <div className="home_taskbar">
      <div className="filler"></div>
      <div className="taskbar_icons">
        <button onClick={() => moveFavAway()} className="task_favorite">
          <FaFolder className="task_icon task_i0 " />
        </button>
        <Link to="/dashboard">
          <MdDashboard className="task_icon task_i2" />
        </Link>
        <Link to="/dashboard/articles">
          <BsFillPenFill className="task_icon task_i3 pen" />
        </Link>
      </div>
      <Favorites
        moveFavAway={moveFavAway}
        state={source}
        position={position}
        setPosition={setPosition}
      />
    </div>
  );
};

export default TaskBar;
