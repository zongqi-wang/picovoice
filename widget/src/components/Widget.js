import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import "./widget.css";

const Widget = ({ id, user, rating, onCLick }) => {
  const [isHover, setIsHover] = useState(false);

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
    if (disabled == "false") {
      ev.target.parentElement.dataset.disabled = true;
      fetch("http://localhost:10000/rate", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductID: id,
          userID: user,
          rating: ev.target.dataset.value,
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
