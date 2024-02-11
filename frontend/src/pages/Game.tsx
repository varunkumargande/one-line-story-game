// src/pages/Games.tsx
import GameComponent from "components/GameComponent";
import { ParticlesBackground } from "components/ParticlesBackground";
import { LightParticleEffect } from "components/options/LightParticleEffect";
import React from "react";

const CREATE_GAME: React.FC = () => {
  return (
    <div className="mt-3">
      <ParticlesBackground options={LightParticleEffect} />
      {/* Add content for the CREATE_GAME page */}
      <GameComponent />
    </div>
  );
};

export default CREATE_GAME;
