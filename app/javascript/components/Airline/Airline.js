import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const Column = styled.div`
  background: #fff;
  max-width: 50%;
  width: 50%;
  float: left;
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    background: black;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

const Main = styled.div`
  padding-left: 60px;
`;

const Airline = (props) => {
  const [airline, setAirline] = useState({});
  const [review, setReview] = useState({ title: "", description: "" });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const { slug } = props.match.params;
    const url = `/api/v1/airlines/${slug}`;
    axios
      .get(url)
      .then((resp) => {
        setAirline(resp.data);
        setLoaded(true);
      })
      .catch((resp) => console.log(resp));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    if (review.score == null) {
      setReview({ ...review, score: 0 });
    }
    const airline_id = airline.data.id;
    axios
      .post("/api/v1/reviews", { review, airline_id })
      .then((resp) => {
        const included = [...airline.included, resp.data.data];
        setAirline({ ...airline, included });
        setReview({ title: "", description: "", score: 0 });
        window.location.reload();
      })
      .catch((resp) => console.error(resp));
  };

  const setRating = (score, e) => {
    e.preventDefault();
    setReview({ ...review, score });
  };

  let reviews;
  if (loaded && airline.included) {
    reviews = airline.included.map((item, index) => {
      return <Review key={index} attributes={item.attributes} />;
    });
  }
  return (
    <Wrapper>
      <Column>
        <Main>
          {loaded && (
            <Header
              attributes={airline.data.attributes}
              reviews={airline.included}
            />
          )}
          {reviews}
        </Main>
      </Column>
      <Column>
        {loaded && (
          <ReviewForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setRating={setRating}
            attributes={airline.data.attributes}
            review={review}
          />
        )}
      </Column>
    </Wrapper>
  );
};

export default Airline;
