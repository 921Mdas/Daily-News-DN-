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
import { FcDownload } from "react-icons/fc";
import { DELETE_ARTICLE } from "../../context/ApiUtil";
import "./utilcomp.scss";

const ArticleCard = ({ article, idx, content }) => {
  const handleDelete = async id => {
    DELETE_ARTICLE(id);
    // put use effect where the action is happening or no trigger
    // create a new get articles dispatch
  };

  useEffect(() => {
    console.log("delete just happened", content.length);
  }, [handleDelete]);

  if (article) {
    return (
      <Card className="card_component">
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image="https://picsum.photos/200"
          title="some title"
        />
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
          <button className="card_likeicon action_card_icon">
            <FavoriteIcon />
          </button>
          <RouterLink
            size="small"
            color="primary"
            component={RouterLink}
            to={`/article/${article._id}`}
            className="card_viewicon action_card_icon"
          >
            <BsFillEyeFill />
          </RouterLink>
          <button
            size="small"
            color="primary"
            component={RouterLink}
            to={`/article/${article._id}`}
            className="card_viewicon action_card_icon"
            onClick={() => handleDelete(article._id)}
          >
            <AiFillDelete className="card_delete_icon action_card_icon" />
          </button>
          <p>Reach {32 * idx} K</p>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardMedia
          style={{ height: 0, paddingTop: "56.25%" }}
          image="https://picsum.photos/200"
          title="some title"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Some title
          </Typography>
          <Typography variant="body2" component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="card_actions">
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <Button
            size="small"
            color="primary"
            component={RouterLink}
            to={`/article/id`}
          >
            View article
          </Button>
        </CardActions>
      </Card>
    );
  }
};

export default React.memo(ArticleCard);
