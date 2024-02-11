// Send.js

import React from "react";
import PropTypes from "prop-types";

const Send = ({ className }) => {
  return (
    <svg
      version="1.1"
      id="Uploaded_to_svgrepo_com"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          className="sharpcorners_een"
          d="M23.35,8.463L11.085,19.881L9,27.85v-9.079L23.35,8.463z M27.857,3.993L1.911,12.642l6.677,5.193 L27.857,3.993z M9.763,28.884l4.404-5.431l-2.479-1.925L9.763,28.884z M11.979,20.416l-0.017,0.066L22.57,28.71l6.636-24.335 L11.979,20.416z"
        ></path>
      </g>
    </svg>
  );
};

Send.propTypes = {
  className: PropTypes.string,
};

export default Send;
