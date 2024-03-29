import React from "react";
import { ParticlesBackground } from "components/ParticlesBackground";
import PlayerForm from "components/forms/PlayerForm";
import { CatGameOverEffect } from "components/options/CatGameOverEffect";

const CreatePlayers: React.FC = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center text-black dark:text-sky-400">
      <ParticlesBackground options={CatGameOverEffect("20%")} />
      <PlayerForm />
    </div>
  );
};

export default CreatePlayers;
