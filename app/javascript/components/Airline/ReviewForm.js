import React from "react";

const ReviewForm = (props) => {
  return (
    <div className="wrapper">
      <form>
        <div>Have an experience with [name]. Leave here your comments!</div>
        <div className="field">
          <input type="text" name="title" placeholder="Review Title" />
        </div>
        <div className="field">
          <input
            type="text"
            name="description"
            placeholder="Review Description"
          />
        </div>
        <div className="field">
          <div className="rating-container">
            <div className="rating-title-text">Rate this Airline [Stars]</div>
            [Stars]
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
