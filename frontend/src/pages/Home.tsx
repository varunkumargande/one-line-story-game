// src/pages/Home.tsx
import React, { useState } from "react";
import { ParticlesBackground } from "components/ParticlesBackground";
import TypingEffect from "components/TypingEffect";
import { ParallaxEffect } from "components/options/ParallaxEffect";
import { useContentfulMediaTranslations } from "hooks/useContentfulMediaTranslations";
import { ShowGameCard } from "components/ShowGameCard/ShowGameCard";
import Modal from "components/modal/Modal";

const Home: React.FC = () => {
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
      <h1 className="lg:text-6xl text-3xl font-bold text-white dark:text-sky-400 text-center lg:w-1/2 w-full mx-auto my-3 lg:min-h-32 min-h-28">
        {messages[0] && <TypingEffect messages={messages} />}
      </h1>
      <div className="md:flex justify-center">
        {
          <ShowGameCard
            title={t["@T_Multi_Player"]?.value}
            className="skew-y-[-3deg]"
            image="/multiplayer.png"
            showInstructions={() => setIsModalOpen("multiplayer")}
          />
        }
        {
          <ShowGameCard
            title={t["@T_Play_With_Bot"]?.value}
            className="md:skew-y-[3deg] skew-y-[-3deg]"
            image="/play-with-bot.png"
            showInstructions={() => setIsModalOpen("play-with-bot")}
          />
        }
      </div>
      <div className="relative">
        <Modal isOpen={!!isModalOpen} onClose={() => setIsModalOpen(null)}>
          <p>
            Great! "One Line Story" sounds like a fun and creative game. Here's
            how you can play: **Objective:** Build a funny story
            collaboratively, one line at a time. **Instructions:** 1. **Choose a
            Topic:** Decide on a theme or topic for the story. It could be
            anything from a day at the zoo to a space adventure. 2. **Player 1's
          </p>
          <p>
            Line:** The first player starts the story by providing an opening
            line related to the chosen topic. For example: "In a world where
            cats ruled the internet..." 3. **Player 2's Line:** The next player
            builds on the story by adding their line. They should respond to the
            previous line and continue the narrative. For instance: "A
            rebellious dog named Rover decided to challenge their internet
            supremacy..." 4. **Continue the Story:** Each subsequent player
            contributes one line to the story, linking it to the previous lines
            and advancing the plot in a humorous way. 5. **Keep it Short:** Aim
            for concise and funny lines to keep the story engaging. You can set
          </p>
          <p>
            a limit on the number of words or characters per line to encourage
            brevity. 6. **Alternate Turns:** Players take turns contributing
            lines. You can go in a circle or have players jump in randomly,
            adding an element of surprise to the story. 7. **Build to a
            Climax:** Continue building the story until you reach a humorous
            climax or resolution. Try to maintain the theme and tone established
          </p>
          <p>
            at the beginning. 8. **Read Aloud:** Once the story is complete or
            after a set number of rounds, read the entire story aloud. Enjoy the
            laughter and creativity that emerges from the collaborative effort.
            Remember, the goal is to have fun and let your imagination run wild.
            Encourage players to be spontaneous and embrace the unexpected
            twists and turns that arise in the story.
          </p>
        </Modal>
      </div>
    </>
  );
};

export default Home;
