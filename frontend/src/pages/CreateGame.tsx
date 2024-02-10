import React from "react";
import StoryForm from "components/forms/StoryForm";
import { useContentfulMediaTranslations } from "hooks/useContentfulMediaTranslations";
import { ParticlesBackground } from "components/ParticlesBackground";
import { PolygonShapeEffect } from "components/options/PolygonShapeEffect";

const CreateGame: React.FC = () => {
  const { t } = useContentfulMediaTranslations();

  return (
    <div className="flex min-h-[80vh] items-center justify-center text-black dark:text-sky-400">
      <ParticlesBackground options={PolygonShapeEffect} />
      <div className="lg:mt-24 p-6 lg:min-w-[35%] rounded-md dark:dark-card shadow-xl bg-white dark:bg-transparent">
        <h2 className="text-2xl font-semibold mb-4">
          {t["@T_Create_New_Story"]?.value}
        </h2>
        <StoryForm />
      </div>
    </div>
  );
};

export default CreateGame;
