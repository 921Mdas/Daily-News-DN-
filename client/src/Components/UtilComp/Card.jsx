import React from "react";
import { Link as RouterLink } from "react-router-dom";
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

const ArticleCard = ({ article }) => {
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
            {article?.title}
          </Typography>
          <Typography variant="body2" component="p">
            {`${
              article.content.length > 300
                ? article?.content.substring(0, 200)
                : article?.content.substring(0, 100)
            }  `}
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

export default ArticleCard;
