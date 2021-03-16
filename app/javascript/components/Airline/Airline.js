import React from "react";
import { useParams } from "react-router-dom";

const Airline = () => {
  let { slug } = useParams();
  return <div>This is the let {slug} Page</div>;
};

export default Airline;
