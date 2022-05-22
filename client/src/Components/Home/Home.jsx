import React, { useContext, useEffect } from "react";
import { MyContext } from "../../context/context";
import { GET_ARTICLES } from "../../context/type";
import { Grid } from "@material-ui/core";
import "./Home.scss";
import { Button } from "react-bootstrap";

// API UTIL
import { AXIOSPOST } from "../../context/ApiUtil";
// URL Type
import { LOADMORE_URL, LOAD_MORE_ACTION } from "../../context/type";
// Components
import ArticleCard from "../UtilComp/Card";

const Home = () => {
  const {
    state: { articles, initSort },
    state,
    dispatch,
  } = useContext(MyContext);
  // load more function
  const loadMore = () => {
    // onclick dispatch to update initsort
    let limit = state.initSort?.limit;
    dispatch({
      type: LOAD_MORE_ACTION,
      payload: (limit += 2),
    });
    // access initsort in the state
    // use the new value in state to post
  };
  useEffect(() => {
    AXIOSPOST(LOADMORE_URL, initSort).then(res => {
      dispatch({ type: GET_ARTICLES, payload: res });
    });
  }, [initSort]);

  if (articles.length > 0) {
    return (
      <div>
        <div className="carousel">CAROUSEL</div>
        <div className="article_card">
          {articles &&
            articles.map(article => {
              return (
                <div key={article._id} className="card_container">
                  <ArticleCard key={article._id} article={article} />
                </div>
              );
            })}

          <Button
            className="button loadmore"
            variant="secondary"
            onClick={() => loadMore()}
          >
            Load more
          </Button>
        </div>
      </div>
    );
  } else {
    <h1>loading...</h1>;
  }
};

export default Home;
