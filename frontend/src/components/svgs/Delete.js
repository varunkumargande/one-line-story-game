// CustomSVG.js

import { useTheme } from "context/ThemeContext";
import React from "react";

const CustomSVG = ({ className }) => {
  const { theme } = useTheme();
  // Determine theme color based on the presence of 'dark:' in className
  const isDarkTheme = theme === "dark";
  // Define your theme colors here

  const themeColor = isDarkTheme ? "#FF3B30" : "white";
  const lineColor = isDarkTheme ? "#8b000065" : "#d1cccc";

  return (
    <svg
      viewBox="0 0 1024 1024"
      className={className}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      height="24"
      width="24"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M154 260h568v700H154z" fill={themeColor}></path>
        <path
          d="M624.428 261.076v485.956c0 57.379-46.737 103.894-104.391 103.894h-362.56v107.246h566.815V261.076h-99.864z"
          fill={lineColor}
        ></path>
        <path
          d="M320.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883zM543.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883z"
          fill="#152B3C"
        ></path>
        <path d="M721.185 345.717v-84.641H164.437z" fill={lineColor}></path>
        <path
          d="M633.596 235.166l-228.054-71.773 31.55-99.3 228.055 71.773z"
          fill={themeColor}
        ></path>
        <path
          d="M847.401 324.783c-2.223 0-4.475-0.333-6.706-1.034L185.038 117.401c-11.765-3.703-18.298-16.239-14.592-27.996 3.706-11.766 16.241-18.288 27.993-14.595l655.656 206.346c11.766 3.703 18.298 16.239 14.592 27.996-2.995 9.531-11.795 15.631-21.286 15.631z"
          fill={themeColor}
        ></path>
      </g>
    </svg>
  );
};

export default CustomSVG;
