import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MyContext } from "../../../context/context";
import { getDataLocalStorage } from "../../UtilComp/Tools";
import { ARTICLES_STORED } from "../../../context/type";
import ScoreCard from "../../UtilComp/scoreCard";

const Article = ({ state: { articles } }) => {
  const { id } = useParams();
  const { _id, status, actors, content, director, score, title, createdAt } =
    articles.find(article => article._id === id);
  const current = articles.find(article => article._id === id);

  return (
    <div className="article_container">
      <Link to="/home">BACK</Link>
      <div
        style={{
          background: `url(https://picsum.photos/1920/1080)`,
          width: "100%",
          height: "50vh",
        }}
      ></div>

      <h3>{title}</h3>
      <div className="mt-3 content">
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>

      <ScoreCard current={current} />
    </div>
  );
};

export default Article;
