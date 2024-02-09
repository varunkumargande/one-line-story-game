// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MultiPlayer from "./pages/MultiPlayer";
import PlayWithBot from "./pages/PlayWithBot";
import Navigation from "./components/Navigation";
import { ThemeProvider } from "./context/ThemeContext";
import NotFound from "pages/404";

import "./i18n";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative max-w-screen-2xl mx-auto text-black dark:text-sky-400 pt-24 px-8 pb-8">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/multi-player" element={<MultiPlayer />} />
            <Route path="/play-with-bot" element={<PlayWithBot />} />
            {/* Wildcard route for 404 - Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
