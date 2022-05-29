import React, { useContext, useState, useRef, useEffect } from "react";
import AdminLayout from "../../Hoc/AdminLayout";
import "./dashboard.scss";
import PIECHARTEXP from "./Charts/SOV";
import TRENDINGCHART from "./Charts/TIMECHART";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TimelineIcon from "@mui/icons-material/Timeline";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { MyContext } from "../../context/context";

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

import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const articleData = [
  {
    title: "Views",
    description: "compared to last week",
    increase: true,
    decrease: false,
    neutral: null,
    number: 72 + "K",
    percentage: 87,
  },
  {
    title: "Bids",
    description: "requests to publish",
    increase: false,
    descrease: true,
    neutral: null,
    number: 12,
    percentage: 23,
  },
  {
    title: "Awards",
    description: "recognitions",
    awards: "BBC award 2021",
    increase: true,
    decrease: false,
    percentage: 14,
    number: 5,
  },
];

const currentUser = {
  stats: articleData,
  favorites: 18,
  published: 5,
  drafts: 6,
  award: 2,
};

const PerformingContent = ["Most Bids", "Most Read", "Most Liked"];

const dashStyle = {
  colored: "rgba(255, 0, 0, 0.205)",
  colorgreen: "rgba(38, 255, 0, 0.205)",
  darkgreen: "rgb(2, 156, 2)",
  darkred: "rgb(163, 13, 2)",
};

const Dashboard = ({ state, dispatch }) => {
  const { articles } = state;
  const top3Articles = articles.slice(0, 3);

  return (
    <AdminLayout section="Dashboard">
      <h3 className="middle_section_title">KEY RESULTS OF THE MONTH</h3>

      <div className="top_section">
        {articleData?.map((data, idx) => {
          return <StatCard key={idx} data={data} />;
        })}
      </div>
      <h3 className="middle_section_title">TOP CONTENT</h3>
      <div className="middle_section">
        {top3Articles?.map((article, idx) => {
          return (
            <DashCard article={article} idx={idx} label={PerformingContent} />
          );
        })}
      </div>
      <h3 className="middle_section_title">CONTENT BREAKDOWN</h3>
      <div className="graphs_section">
        <SOV />
        <TIMELINE />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;

const StatCard = ({ data }) => {
  return (
    <div className="section_exposure section">
      <h3>
        <span>
          {data.title === "Views" ? (
            <RemoveRedEyeIcon className="section_icon" />
          ) : data.title === "Bids" ? (
            <TimelineIcon className="section_icon" />
          ) : (
            <EmojiEventsIcon className="section_icon" />
          )}
        </span>
        {data.title}
      </h3>
      <p>{data.description}</p>
      <div className="content">
        <h1 className="Volume_Num">{data.number}</h1>
        <p
          className="section_perc"
          style={{
            backgroundColor: `${
              data.increase ? dashStyle.colorgreen : dashStyle.colored
            }`,
            color: `${data.increase ? dashStyle.darkgreen : dashStyle.darkred}`,
          }}
        >
          {data.increase ? "↑" : "↓"}
          <span>{data.percentage}%</span>
        </p>
      </div>
    </div>
  );
};

const DashCard = ({ article, idx }) => {
  return (
    <Card className="card_component_dash">
      <CardMedia
        style={{ height: 0, paddingTop: "56.25%" }}
        image="https://picsum.photos/200"
        title="some title"
      />

      <div className="label_desc">{PerformingContent[idx]}</div>

      <CardContent>
        <Typography gutterBottom variant="h6" component="h6">
          <RouterLink
            className="dash_card_title"
            to={`/article/${article._id}`}
          >
            {`${article?.title.substring(0, 32)}...`}
          </RouterLink>
        </Typography>
        <Typography variant="body2" component="p">
          {article.excerpt}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className="card_actions_dash">
        <p>Reach {32 * (idx + 3)} K</p>
      </CardActions>
    </Card>
  );
};

const SOV = () => {
  return (
    <div className="sovchart">
      <PIECHARTEXP />
    </div>
  );
};

const TIMELINE = () => {
  return (
    <div className="timeline">
      <TRENDINGCHART />
    </div>
  );
};
