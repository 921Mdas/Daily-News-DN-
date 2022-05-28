import React, { useEffect } from "react";
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
import { AiFillDelete } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import { FcDownload } from "react-icons/fc";
import { DELETE_ARTICLE, LIKE_ARTICLE } from "../../context/apiUtil";
import "./utilcomp.scss";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const ArticleCard = ({
  article,
  idx,
  content,
  currentUser: { id: userID, email },
}) => {
  const handleDelete = async id => {
    DELETE_ARTICLE(id);
  };

  const handleLiked = async id => {
    // article id and user id
    console.log("clicked");
    LIKE_ARTICLE(id, userID);
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
            className="card_likeicon action_card_icon_like"
            onClick={() => handleLiked(article._id)}
          >
            {article.score > 3 ? (
              <Badge badgeContent={article.score} color="primary">
                <FavoriteIcon color="action" />
              </Badge>
            ) : (
              <FavoriteIcon color="action" />
            )}
          </button>
          {article.status === "public" ? (
            <RouterLink
              size="small"
              color="primary"
              component={RouterLink}
              to={`/article/${article._id}`}
              className="card_viewicon action_card_icon"
            >
              <BsFillEyeFill />
            </RouterLink>
          ) : (
            <RouterLink
              size="small"
              color="primary"
              component={RouterLink}
              to={`/dashboard/articles`}
              className="card_viewicon action_card_icon"
            >
              <RiDraftLine />
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
            <AiFillDelete className="card_delete_icon action_card_icon_delete" />
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
