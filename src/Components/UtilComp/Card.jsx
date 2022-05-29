import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  Divider,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AiFillDelete } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import { FcDownload } from "react-icons/fc";
import {
  DELETE_ARTICLE,
  LIKE_ARTICLE,
  GETLIKED_ARTICLE,
} from "../../context/apiUtil";
import { GET_FAV_ARTICLES } from "../../context/type";
import "./utilcomp.scss";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const ArticleCard = ({
  article,
  idx,
  content,
  currentUser: { id: userID, email },
  dispatch,
}) => {
  const handleDelete = async id => {
    DELETE_ARTICLE(id);
  };

  const [liking, setLiking] = useState(false);

  const showFavoriteArticles = () => {
    GETLIKED_ARTICLE(userID).then(fav => {
      console.log("you liked", fav);

      dispatch({ type: GET_FAV_ARTICLES, payload: fav });
    });
  };

  const handleLiked = async id => {
    // article id and user id
    LIKE_ARTICLE(id, userID);
    showFavoriteArticles();
    setLiking(!liking);
  };

  if (article) {
    return (
      <Card className="card_component">
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image="https://picsum.photos/200"
          title="some title"
        />

        {article.status === "draft" ? (
          <p className="card_draft_nudge">Draft</p>
        ) : null}

        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            <RouterLink to={`/article/${article._id}`}>
              {`${article?.title.substring(0, 32)}...`}
            </RouterLink>
          </Typography>
          <Typography variant="body2" component="p">
            {article.excerpt}
          </Typography>
        </CardContent>

        <CardActions disableSpacing className="card_actions">
          <button
            className="card_likeicon action_card_icon_like outline_remover"
            onClick={() => handleLiked(article._id)}
          >
            {liking ? (
              <FavoriteIcon
                color="action"
                className="outline_remover heart_outline"
                style={{ color: "red" }}
              />
            ) : (
              <FavoriteBorderIcon
                color="action"
                className="outline_remover heart_filled"
              />
            )}
          </button>
          {article.status === "public" ? (
            <RouterLink
              size="small"
              color="primary"
              component={RouterLink}
              to={`/article/${article._id}`}
              className="card_viewicon action_card_icon outline_remover"
            >
              <BsFillEyeFill className="outline_remover" />
            </RouterLink>
          ) : (
            <RouterLink
              size="small"
              color="primary"
              component={RouterLink}
              to={`/dashboard/articles`}
              className="card_viewicon action_card_icon outline_remover"
            >
              <RiDraftLine className="outline_remover" />
            </RouterLink>
          )}

          <button
            size="small"
            color="primary"
            component={RouterLink}
            to={`/article/${article._id}`}
            className="card_viewicon action_card_icon"
            onClick={() => handleDelete(article._id)}
          >
            <AiFillDelete className="card_delete_icon action_card_icon_delete outline_remover" />
          </button>
          <p>Reach {32 * idx} K</p>
        </CardActions>
      </Card>
    );
  } else {
    return <h1>Article might have been deleted refresh page</h1>;
  }
};

export default React.memo(ArticleCard);

// <Badge badgeContent={article.score} color="primary">
//   <FavoriteBorderIcon color="action" />
// </Badge>;
