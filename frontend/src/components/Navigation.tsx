// src/components/Navigation.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="absolute top-0">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
      </ul>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <p>Current Theme: {theme}</p>
    </nav>
  );
};

export default Navigation;
