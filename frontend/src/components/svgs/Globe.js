import React from "react";

const Globe = ({ className }) => {
  const darkMode = className.includes("dark");

  // Extract color class based on dark/light context
  const colorClass = darkMode
    ? className.match(/dark:text-(\w+)/)
    : className.match(/text-(\w+)/);

  const color = colorClass ? colorClass[1] : "black"; // Default to black if not found

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20.265"
      height="20.265"
      viewBox="0 0 20.265 20.265"
      fill="currentColor"
      className={className}
    >
      <g transform="translate(0.5 0.466)">
        <path
          d="M9.632-.5A10.132,10.132,0,1,1-.5,9.632,10.144,10.144,0,0,1,9.632-.5Zm0,19.265A9.132,9.132,0,1,0,.5,9.632,9.143,9.143,0,0,0,9.632,18.765Z"
          transform="translate(0 0.034)"
          fill={`#${color}`}
        />
        <path
          d="M5.489,55.878H24.753v1H5.489Z"
          transform="translate(-5.489 -46.312)"
          fill={`#${color}`}
        />
        <path
          d="M23.465,37.092H5.489v-1H23.465Z"
          transform="translate(-4.933 -30.21)"
          fill={`#${color}`}
        />
        <path
          d="M7.42,75.665H24.861v1H7.42Z"
          transform="translate(-6.504 -62.415)"
          fill={`#${color}`}
        />
        <path
          d="M35.082,22.078a15.9,15.9,0,0,1-.388-19.363L35.07,2.2l.805.593-.376.511a14.9,14.9,0,0,0,.364,18.145l.11.137v.175h-.5Z"
          transform="translate(-26.587 -2.466)"
          fill={`#${color}`}
        />
        <path
          d="M58.766,21.892l-.39-.312h-.5V21.4l.10-.137a14.9,14.9,0,0,0,.364-18.145l-.376-.51.805-.593.376.511a15.9,15.9,0,0,1-.388,19.363Z"
          transform="translate(-47.972 -2.315)"
          fill={`#${color}`}
        />
      </g>
    </svg>
  );
};

export default Globe;
