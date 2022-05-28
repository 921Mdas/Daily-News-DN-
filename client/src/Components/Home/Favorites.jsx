import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const Favorites = ({
  moveFavAway,
  state: { favorites },
  position,
  setPosition,
}) => {
  return (
    <div
      className="fav_articles"
      style={{ transform: `translateX(${position ? 0 : -150}%)` }}
    >
      <h5 className="liked_article_title">
        <AiFillHeart /> articles
      </h5>
      <button className="fav_close" onClick={() => setPosition(false)}>
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

export default React.memo(Favorites);
