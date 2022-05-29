import React, { useEffect, useState } from "react";
import { GET_ARTICLES } from "../../context/type";
import { Link } from "react-router-dom";
// icons & bootstrap
import { Divider } from "@material-ui/core";
import { GrAdd } from "react-icons/gr";
import { Button } from "react-bootstrap";
import "./Home.scss";
// API UTIL
import { LOADMORE_ARTICLES, INIT_GET_ARTICLES } from "../../context/apiUtil";
// URL Type
import {
  LOADMORE_URL,
  UPDATE_INIT_SORT,
  GET_CONTENT_URL,
} from "../../context/type";
// Components
import ArticleCard from "../UtilComp/Card";
import Banner from "./HomeHeader";
import TaskBar from "./Taskbar";
// images
import doodle404 from "../../multimedia/doodle404.png";

// ************COMPONENT***********************
// ************COMPONENT***********************
// ************COMPONENT***********************
// ************COMPONENT***********************

const Home = ({ state, dispatch }) => {
  const { articles, initSort, isAuth, currentUser, favorites } = state;
  const [showOBR, setCloseOBR] = useState(false);
  const loadMore = () => {
    let limit = state.initSort?.limit;
    dispatch({
      type: UPDATE_INIT_SORT,
      payload: (limit += 1),
    });
  };

  // console.log(state, "sort");

  // initial load of articles / home page loads

  useEffect(() => {
    INIT_GET_ARTICLES(GET_CONTENT_URL).then(content => {
      dispatch({ type: GET_ARTICLES, payload: content });
    });
  }, [articles]);

  const closeOBR = () => {
    setCloseOBR(!showOBR);
  };

  return (
    <div className="home_container">
      <Divider />
      {showOBR ? (
        <div className="home_header_message">
          <h1 className="home_start_tour">
            Welcome, <span onClick={() => closeOBR()}>Start tour</span>{" "}
          </h1>
        </div>
      ) : (
        <Banner closeOBR={closeOBR} />
      )}

      <Divider />

      <TaskBar currentUser={currentUser} dispatch={dispatch} state={state} />

      {/* <Favorites favorites={favorites} /> */}
      <Divider />

      <div className="article_card">
        {articles?.length > 0 ? (
          articles?.map((article, idx) => {
            return (
              <div key={article._id} className="card_container">
                <ArticleCard
                  key={article._id}
                  article={article}
                  idx={idx}
                  content={articles}
                  currentUser={currentUser}
                  dispatch={dispatch}
                />
              </div>
            );
          })
        ) : (
          <div className="home_no_content">
            <img src={doodle404} alt="" className="doodleimg_anim" />
            <h3>
              You have no articles,{" "}
              <span className="home_add_nudge">
                <Link to="/dashboard/articles"> click to add</Link>
              </span>
            </h3>
          </div>
        )}
        {articles?.length > 0 ? (
          <Button
            className="button loadmore"
            variant="outline"
            onClick={() => loadMore()}
          >
            <GrAdd className="loadmore_icon" />
          </Button>
        ) : (
          <h1>no articles</h1>
        )}
      </div>
    </div>
  );
};

export default React.memo(Home);
