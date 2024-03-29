// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigRoutes } from "config/routes.config";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Navigation from "./components/Navigation";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n";
import NotFound from "pages/404";
import Stories from "pages/Stories";
import CreateGame from "pages/CreateGame";
import CreatePlayers from "pages/CreatePlayers";
import Resluts from "pages/Results";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative max-w-screen-2xl mx-auto text-black dark:text-sky-400 pt-24 px-8 pb-8">
        <Router>
          <Navigation />
          <Routes>
            <Route path={ConfigRoutes.HOME} element={<Home />} />
            <Route path={ConfigRoutes.MULTI_PLAYER} element={<Game />} />
            <Route path={ConfigRoutes.PLAY_WITH_BOT} element={<Game />} />
            <Route path={ConfigRoutes.STORIES} element={<Stories />} />
            <Route path={ConfigRoutes.CREATE_GAME} element={<CreateGame />} />
            <Route
              path={ConfigRoutes.CREATE_GAME_MULTI}
              element={<CreateGame />}
            />
            <Route
              path={ConfigRoutes.CREATE_PLAYERS}
              element={<CreatePlayers />}
            />
            <Route
              path={ConfigRoutes.CREATE_PLAYERS_MULTI}
              element={<CreatePlayers />}
            />
            <Route path={ConfigRoutes.RESULTS} element={<Resluts />} />
            {/* Wildcard route for 404 - Not Found */}
            <Route path={ConfigRoutes.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
