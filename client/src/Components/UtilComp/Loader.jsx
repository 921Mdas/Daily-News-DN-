import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./utilcomp.scss";

export default function Loader() {
  return (
    <div className="Loader">
      <CircularProgress />
    </div>
  );
}
