import React from "react";
import { CircularProgress } from "@material-ui/core";

const Spinner = () => {
  return (
    <div>
      <CircularProgress
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
        }}
      />
    </div>
  );
};
export default Spinner;
