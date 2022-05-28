import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const Favorites = ({ favorites }) => {
  const [position, setPosition] = useState(0);
  const moveFavAway = () => {
    setPosition(110);
  };
  return (
    <div
      className="fav_articles"
      style={{ transform: `translateX(-${position}%)` }}
    >
      <h5 className="liked_article_title">
        <AiFillHeart /> articles
      </h5>
      <button className="fav_close" onClick={() => moveFavAway()}>
        <AiFillCloseCircle />
      </button>

      {favorites.length > 0 ? (
        <div className="article_picked_section">
          {favorites.map((article, idx) => {
            return (
              <Link
                to={`/${article._id}`}
                key={article._id + idx}
                className="article_picked"
              >
                {article.title}
              </Link>
            );
          })}
        </div>
      ) : (
        <h4>{favorites.length} favorite articles</h4>
      )}
    </div>
  );
};

export default Favorites;
