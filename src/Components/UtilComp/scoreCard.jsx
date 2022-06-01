import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import PersonIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";
import PreviewIcon from "@mui/icons-material/Preview";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import pub1 from "../../multimedia/pub1.png";
import pub2 from "../../multimedia/pub2.png";
import pub5 from "../../multimedia/pub5.png";
import pub4 from "../../multimedia/pub4.png";

const publications = ["BBC", "Forbes"];

const ScoreCard = ({ current }) => {
  return (
    <List className="scorecard">
      {/* score */}
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <StarIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Views"
          secondary={current.score}
          className="rating"
        />
      </ListItem>
      <Divider variant="inset" component="li" />

      {/* actor */}
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <div>
          {current.actors?.map((item, index) => (
            <Chip
              key={`${index + item}`}
              item={item}
              label={item}
              clickable
              color="primary"
              className="chip co_authors_btns"
            />
          ))}
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
      {/* director */}
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MovieIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Author" secondary={current.director} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CheckCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Published By" />
      </ListItem>
      <div className="pubs">
        {publications.map((txt, idx) => {
          return (
            <p key={idx} alt="" className="pub_avatar">
              {txt}
            </p>
          );
        })}
      </div>
    </List>
  );
};

export default ScoreCard;
