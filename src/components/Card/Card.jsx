import React from "react";
import "./Card.css";

const Card = ({ icon, value, title, buttonLabel, className, onButtonClick }) => {
  return (
    <div className={`card ${className}`}>
      <span className="material-symbols-sharp">{icon}</span>
      <div className="middle">
        <div className="left">
          <div className="info-horizontal">
            <h1>{value}</h1>
            <div className="TitleCard">
              <h3>{title}</h3>
            </div>
          </div>
          <div className={`vermaisCard${className === "reposicao" ? "1" : className === "atencao" ? "2" : "3"}`}>
            <button onClick={onButtonClick}>
              <a href="#">
                <h3>{buttonLabel}</h3>
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
