import React, { PureComponent } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    publications: 4000,
    Bids: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    publications: 3000,
    Bids: 1398,
    amt: 2210,
  },
  {
    name: "March",
    publications: 2000,
    Bids: 9800,
    amt: 2290,
  },
  {
    name: "April",
    publications: 2780,
    Bids: 3908,
    amt: 2000,
  },
  {
    name: "May",
    publications: 1890,
    Bids: 4800,
    amt: 2181,
  },
  {
    name: "June",
    publications: 2390,
    Bids: 3800,
    amt: 2500,
  },
  {
    name: "july",
    publications: 3490,
    Bids: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    publications: 3490,
    Bids: 4300,
    amt: 2100,
  },
  {
    name: "Sep",
    publications: 9090,
    Bids: 8900,
    amt: 2100,
  },
  {
    name: "Oct",
    publications: 6490,
    Bids: 2100,
    amt: 2100,
  },
  {
    name: "Nov",
    publications: 9090,
    Bids: 1200,
    amt: 2100,
  },
  {
    name: "Dec",
    publications: 5090,
    Bids: 4300,
    amt: 2100,
  },
];

const TRENDINGCHART = () => {
  return (
    <div
      className="time_container"
      style={{ width: "100%", minHeight: "100%" }}
    >
      <h3 className="time_title">Daily Bids</h3>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <AreaChart
        width={700}
        height={180}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="publications"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area type="monotone" dataKey="Bids" stroke="#FFE293" fill="#FFE293" />
      </AreaChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
};

export default TRENDINGCHART;
