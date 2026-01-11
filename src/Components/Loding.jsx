import React from "react";
import "../style/Loding.css";

const Loding = () => {
  return (
    <div className="loading-container">
      <div className="hanger-wrapper">
        <svg
          className="hanger-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hanger Hook */}
          <path className="hanger-hook" d="M50 5 Q50 0, 55 2" />
          <path className="hanger-hook" d="M50 5 L50 15" />

          {/* Hanger Body Triangle */}
          <path className="hanger-body" d="M20 35 L80 35 L50 15 Z" />

          {/* Clothing Item (Dress/Shirt) hanging from the hanger */}
          <g className="clothing-group" transform="translate(0, 3)">
            <path
              className="clothing-item"
              d="M22 35 L30 85 Q50 90, 70 85 L78 35 Q50 40, 22 35 Z"
            />
            {/* Decorative Folds */}
            <path className="clothing-folds" d="M35 38 Q40 50, 35 80" />
            <path className="clothing-folds" d="M65 38 Q60 50, 65 80" />
          </g>
        </svg>
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loding;
