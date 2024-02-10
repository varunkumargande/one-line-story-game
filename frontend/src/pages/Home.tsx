// src/pages/Home.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ParticlesBackground } from "components/ParticlesBackground";
import TypingEffect from "components/TypingEffect";
import { ParallaxEffect } from "components/options/ParallaxEffect";
import { useContentfulMediaTranslations } from "hooks/useContentfulMediaTranslations";
import { ShowGameCard } from "components/ShowGameCard/ShowGameCard";
import Modal from "components/modal/Modal";
import { ConfigRoutes } from "config/routes.config";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useContentfulMediaTranslations();
  const messages = [
    t["@T_Introduction_Msg_1"]?.value || "",
    t["@T_Introduction_Msg_2"]?.value || "",
  ];
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);

  return (
    <>
      <ParticlesBackground options={ParallaxEffect} />
      <span className="sr-only">{"Company"}</span>
      <img
        className="shadow-md mx-auto"
        width={120}
        height={120}
        src={"/logo.png"}
        alt={"Company"}
      />
      <h1 className="lg:text-6xl text-3xl font-bold text-white dark:text-sky-400 text-center lg:w-3/4 w-full mx-auto my-3 lg:min-h-32 min-h-28">
        {messages[0] && <TypingEffect messages={messages} />}
      </h1>
      <div className="md:flex justify-center">
        {
          <ShowGameCard
            title={t["@T_Multi_Player"]?.value}
            className="skew-y-[-3deg]"
            image="/multiplayer.png"
            showInstructions={() => setIsModalOpen("multiplayer")}
            onClick={() =>
              navigate(ConfigRoutes.STORIES.replace(":id", "multiplayer"))
            }
          />
        }
        {
          <ShowGameCard
            title={t["@T_Play_With_Bot"]?.value}
            className="md:skew-y-[3deg] skew-y-[-3deg]"
            image="/play-with-bot.png"
            showInstructions={() => setIsModalOpen("play-with-bot")}
            onClick={() =>
              navigate(ConfigRoutes.STORIES.replace(":id", "play-with-bot"))
            }
          />
        }
      </div>
      <div className="relative">
        <Modal
          title={
            t[
              `@T_${
                isModalOpen === "play-with-bot"
                  ? "Play_With_Bot_Instructions"
                  : "Multi_Player_Instructions"
              }`
            ]?.value
          }
          isOpen={!!isModalOpen}
          onClose={() => setIsModalOpen(null)}
        >
          {documentToReactComponents(
            t[
              `@T_${
                isModalOpen === "play-with-bot"
                  ? "Play_With_Bot_Instructions"
                  : "Multi_Player_Instructions"
              }`
            ]?.description?.json
          )}
        </Modal>
      </div>
    </>
  );
};

export default Home;
