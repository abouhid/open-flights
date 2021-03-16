import React, { useState, useEffect } from "react";
import axios from "axios";

const Airlines = () => {
  const [airlines, setAirlines] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/airlines.json")
      .then((resp) => {
        console.log(resp);
        setAirlines(resp.data.data);
      })
      .catch((resp) => console.log(resp));
  }, [airlines.length]);

  const list = airlines.map((item) => {
    return <li key={item.attributes.name}>{item.attributes.name}</li>;
  });

  return (
    <>
      <div>This is the list:</div>
      <ul>{list}</ul>
    </>
  );
};

export default Airlines;
