import React, { useState } from "react";

// add ? to type for default rating
export default function StarRating({
  maxStar = 10,
  size = 24,
  color = "#fcc419",
  className = "",
  setUserRating,
}: {
  maxStar?: number;
  size?: number;
  color?: string;
  className?: string;
  setUserRating: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [noOfStar, setNoOfStar] = useState<number>(-1);

  const [finalStar, setFinalStar] = useState<number>(-1);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: `${size / 4}px`,
    fontSize: `${size / 1.5}px`,
  };

  const starContainerStyle = {
    display: "flex",
  };

  // const lightedStyle = {
  //   color: "red",
  // };
  // const dimmedStyle = {
  //   color: "white",
  // };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
  };

  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  function Star() {
    return (
      <span role="button" style={starStyle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </span>
    );
  }

  function EmptyStar() {
    return (
      <span role="button" style={starStyle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </span>
    );
  }

  const handleMouseOverStar = function (currentNo: number) {
    setNoOfStar(currentNo);
  };

  const handleMouseClickStar = function () {
    setFinalStar(noOfStar);
    setUserRating(noOfStar);
    if (finalStar === 0) {
      setFinalStar(-1);
    }
  };

  const handleMouseLeaveContainer = function () {
    if (finalStar < 0) {
      setNoOfStar(-1);
    }
  };
  return (
    <>
      <div
        style={containerStyle}
        onMouseLeave={handleMouseLeaveContainer}
        className={className}
      >
        {Array.from({ length: maxStar }, (_, i) => (
          <span
            key={i}
            style={
              starContainerStyle
              //   ...(noOfStar >= i ? lightedStyle : dimmedStyle),
              // }
            }
            onMouseOver={() => handleMouseOverStar(i)}
            onClick={handleMouseClickStar}
          >
            {noOfStar >= i ? <Star /> : <EmptyStar />}
          </span>
        ))}
        <span style={textStyle}>{noOfStar + 1}</span>
      </div>
    </>
  );
}
