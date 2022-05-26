import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/context";
import { GET_ARTICLES } from "../../context/type";
// icons & bootstrap
import { Divider } from "@material-ui/core";
import { AiOutlineClose } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { FaFolder } from "react-icons/fa";
import { Button } from "react-bootstrap";
// taskbar icons
import { MdLabelImportant, MdDashboard, MdHideSource } from "react-icons/md";
import "./Home.scss";
// API UTIL
import { AXIOSPOST } from "../../context/ApiUtil";
// URL Type
import { LOADMORE_URL, LOAD_MORE_ACTION } from "../../context/type";
// Components
import ArticleCard from "../UtilComp/Card";

const Home = () => {
  // accessing state
  const {
    state: { articles, initSort, isAuth },
    state,
    dispatch,
  } = useContext(MyContext);
  const [showOBR, setCloseOBR] = useState(false);

  console.log("in home", articles.length);
  // load more articles
  const loadMore = () => {
    // onclick dispatch to update initsort
    let limit = state.initSort?.limit;
    dispatch({
      type: LOAD_MORE_ACTION,
      payload: (limit += 1),
    });
  };

  console.log("current state", state);

  // loadmore check√
  useEffect(() => {
    AXIOSPOST(LOADMORE_URL, initSort).then(res => {
      dispatch({ type: GET_ARTICLES, payload: res });
    });
  }, [initSort]);

  const closeOBR = () => {
    setCloseOBR(!showOBR);
  };

  if (articles.length > 0) {
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

        <div className="home_taskbar">
          <div className="filler"></div>
          <div className="taskbar_icons">
            <FaFolder className="task_icon task_i0 " />
            <MdLabelImportant className="task_icon task_i1 " />
            <MdDashboard className="task_icon task_i2" />
            <MdHideSource className="task_icon task_i3" />
          </div>
        </div>

        <Divider />
        <div className="article_card">
          {articles &&
            articles.map((article, idx) => {
              return (
                <div key={article._id} className="card_container">
                  <ArticleCard
                    key={article._id}
                    article={article}
                    idx={idx}
                    content={articles}
                  />
                </div>
              );
            })}

          <Button
            className="button loadmore"
            variant="outline"
            onClick={() => loadMore()}
          >
            <GrAdd className="loadmore_icon" />
          </Button>
        </div>
      </div>
    );
  } else {
    <h1>loading...</h1>;
  }
};

const Banner = ({ closeOBR }) => {
  return (
    <div className="home_header">
      <div className="home_header_prompt">
        <h2>Good Morning, Deo</h2>
        <p>Get to know our services by starting your onboarding</p>
        <button>Launch onboarding</button>
      </div>
      <button className="home_toggle_onboarding" onClick={() => closeOBR()}>
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default React.memo(Home);
