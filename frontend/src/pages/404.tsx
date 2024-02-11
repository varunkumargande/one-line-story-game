// src/pages/NotFound.tsx
import { ParticlesBackground } from "components/ParticlesBackground";
import { AmongUsEffect } from "components/options/AmongUsEffect";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex justify-center items-center absolute inset-0 text-center">
      <ParticlesBackground options={AmongUsEffect} />
      <div className="dark:dark-card shadow-xl bg-white dark:bg-transparent text-black dark:text-sky-400 p-8 rounded-md w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
        <p>The requested page does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
