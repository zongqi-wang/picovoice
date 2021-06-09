import React from "react";
import "./widget.css";

const Widget = ({ id, user, rating, onCLick }) => {
  //change stars color
  function hoverHandler(ev) {
    const stars = ev.target.parentElement.getElementsByClassName("star");
    const hoverValue = ev.target.dataset.value;
    const disabled = ev.target.parentElement.dataset.disabled;
    //if not disabled

    if (disabled == "false") {
      Array.from(stars).forEach((star) => {
        star.style.color = hoverValue >= star.dataset.value ? "yellow" : "gray";
      });
    }
  }

  function resetHandler(ev) {
    const stars = ev.target.parentElement.getElementsByClassName("star");
    const disabled = ev.target.parentElement.dataset.disabled;

    if (disabled == "false") {
      Array.from(stars).forEach((star) => {
        star.style.color = "gray";
      });
    }
  }

  function starClickHandler(ev) {
    let disabled = ev.target.parentElement.dataset.disabled;
    const hoverValue = parseInt(ev.target.dataset.value);

    if (disabled == "false") {
      ev.target.parentElement.dataset.disabled = true;
      fetch("http://localhost:10000/rate", {
        method: "POST",

        body: JSON.stringify({
          ProductID: id,
          userID: user,
          rating: hoverValue,
        }),
      });
    }
  }

  return (
    <div className="stars" data-disabled={false}>
      {[...Array(5).keys()].map((n) => {
        return (
          <span
            className="star"
            key={n + 1}
            data-value={n + 1}
            data-disabled={false}
            onMouseOver={hoverHandler}
            onMouseLeave={resetHandler}
            onClick={starClickHandler}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Widget;
