// src/pages/Resluts.tsx
import { ISourceOptions } from "@tsparticles/engine";
import { ParticlesBackground } from "components/ParticlesBackground";
import SmokeEffect from "components/SmokeEffect";
import SideConfetti from "components/options/SideConfetti.json";
import React from "react";

const Resluts: React.FC = () => {
  return (
    <>
      <div className="flex justify-center items-center absolute inset-0 text-center">
        <ParticlesBackground options={SideConfetti as ISourceOptions} />
        <div className="dark:dark-card shadow-xl bg-white dark:bg-transparent text-black dark:text-sky-400 p-8 rounded-md w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
          <h2 className="text-2xl font-bold"> resukts</h2>
          <p>The reques exist.</p>
        </div>
      </div>
      <SmokeEffect />
    </>
  );
};

export default Resluts;
