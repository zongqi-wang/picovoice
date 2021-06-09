import React from "react";
import "./card.css";
// import cat from "../cat.jpg";
import dog from "../dog.jpg";
import Widget from "./Widget";

const Card = ({ id, title, desc, rating, onClick }) => {
  return (
    <div className="card">
      <img src={dog} alt="placeholder of my dog" />
      <h3 className="card-title">{title}</h3>
      <p>{desc}</p>
      <Widget id={id} user={123456} rating={rating} onClick={onClick}></Widget>
    </div>
  );
};

export default Card;
