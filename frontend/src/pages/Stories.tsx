// src/pages/Games.tsx
import React from "react";
import { ParticlesBackground } from "components/ParticlesBackground";
import { ObjectsRepelEffect } from "components/options/ObjectsRepelEffect";
import { useParams } from "react-router-dom";

const Stories: React.FC = () => {
  const { type } = useParams();
  return (
    <div>
      <ParticlesBackground options={ObjectsRepelEffect} />
      <p>Param received: {type}</p>
    </div>
  );
};

export default Stories;
