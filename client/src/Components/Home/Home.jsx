import React, { useContext, useEffect } from "react";
import { MyContext } from "../../context/context";
import { GET_ARTICLES } from "../../context/type";
import { Grid } from "@material-ui/core";
import "./Home.scss";

// API UTIL
import { AXIOSPOST } from "../../context/apiUtil";
// URL Type
import { LOADMORE_URL } from "../../context/type";
// Components
import ArticleCard from "../UtilComp/Card";

const Home = () => {
  const {
    state: { articles },
    dispatch,
  } = useContext(MyContext);

  useEffect(() => {
    AXIOSPOST(LOADMORE_URL).then(res => {
      dispatch({ type: GET_ARTICLES, payload: res });
    });
  }, []);

  if (articles.length > 0) {
    return (
      <div>
        <div className="carousel">CAROUSEL</div>
        <div className="article_card">
          {articles &&
            articles.map(article => {
              return (
                <div className="card_container">
                  <ArticleCard article={article} />
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    <h1>loading...</h1>;
  }
};

export default Home;
