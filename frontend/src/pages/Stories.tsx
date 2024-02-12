import React, { useEffect, useState } from "react";
import { ParticlesBackground } from "components/ParticlesBackground";
import { ObjectsRepelEffect } from "components/options/ObjectsRepelEffect";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContentfulMediaTranslations } from "hooks/useContentfulMediaTranslations";
import { Story } from "utils/types";
import { ConfigRoutes } from "config/routes.config";
import Delete from "components/svgs/Delete";

interface Button {
  className: string;
  title: string;
  onClick: string;
}

type ButtonAction = "play" | "continue" | "results";

const Stories: React.FC = () => {
  const { type } = useParams();
  const [stories, setStories] = useState<Story[]>([]);
  const [fetched, setFetched] = useState(false);
  const { t } = useContentfulMediaTranslations();
  const navigate = useNavigate();
  const location = useLocation();

  const buttonData: Button[] = [
    {
      className:
        "bg-sky-400 dark:border-sky-400 dark:text-sky-400 dark:border dark:bg-transparent text-white",
      title: t["@T_Play"]?.value,
      onClick: location.pathname.includes("multiplayer")
        ? ConfigRoutes.CREATE_PLAYERS_MULTI
        : ConfigRoutes.CREATE_PLAYERS,
    },
    {
      className:
        "bg-[#ffc107] dark:border-[#ffc107] dark:text-[#ffc107] dark:border dark:bg-transparent text-white",
      title: t["@T_Continue"]?.value,
      onClick: location.pathname.includes("multiplayer")
        ? ConfigRoutes.MULTI_PLAYER
        : ConfigRoutes.PLAY_WITH_BOT,
    },
    {
      className:
        "bg-green-500 dark:border-green-500 dark:text-green-500 dark:border dark:bg-transparent text-white",
      title: t["@T_Results"]?.value,
      onClick: ConfigRoutes.RESULTS,
    },
  ];

  const getButtonByAction = (action: ButtonAction): Button | null => {
    switch (action) {
      case "play":
        return buttonData[0];
      case "continue":
        return buttonData[1];
      case "results":
        return buttonData[2];
      // Add more cases as needed
      default:
        return null; // Return null for unknown actions
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          `${
            process.env.REACT_APP_BACKEND_URL
          }filter/stories/?is_multi_player=${type === "multiplayer"}`
        );
        setStories(response.data);
        setFetched(true);
      } catch (error) {
        console.error("Error fetching Stories:", error);
        alert("Failed to List Stories. Please try again.");
      }
    };

    fetchStories();
  }, [type]);

  const getType = (data: Story): ButtonAction => {
    switch (true) {
      case data.end_game:
        return "results";
      case data.players.length === 0:
        return "play";
      case data.players.length > 0:
        return "continue";

      // Add more cases as needed
      default:
        return "play"; // Return null for unknown actions
    }
  };

  const CreateNewGame = ({ className }: { className: string }) => (
    <button
      className={`bg-[#f44336] cursor-pointer dark:bg-transparent text-base dark:border text-white px-4 py-2 rounded-md ${className}`}
      onClick={() =>
        navigate(
          type === "multiplayer"
            ? ConfigRoutes.CREATE_GAME_MULTI
            : ConfigRoutes.CREATE_GAME
        )
      }
    >
      + {t["@T_New_Game"]?.value}
    </button>
  );

  const handleRemove = (currentStory: Story) => {
    if (currentStory?._id) {
      axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}stories/${currentStory._id}`
        )
        .then((response) => {
          // Handle the successful response, if needed
          console.log("Story deleted successfully:", response.data);
          setStories((prev: Story[]) => {
            return prev.filter((story) => story._id !== currentStory._id);
          });
        })
        .catch((error) => {
          // Handle the error, show alert
          console.error("Error creating story:", error);
          alert("Failed to delete story. Please try again."); // Show an alert on error
        });
    }
  };

  return (
    <div
      className={`container mx-auto text-white dark:text-sky-400 h-full items-center`}
    >
      <ParticlesBackground options={ObjectsRepelEffect} />

      <div className="flex justify-between mt-4 items-center">
        <h1 className="text-3xl font-bold my-4">{t["@T_Stories"]?.value}</h1>
        {<CreateNewGame className="text-white z-10" />}
      </div>
      {!stories.length ? (
        <div className="flex justify-center items-center absolute inset-0">
          <div className="dark:dark-card shadow-xl bg-white dark:bg-transparent text-black dark:text-sky-400 p-8 rounded-md w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
            <h1 className="text-2xl font-bold text-center items-center leading-10">
              {fetched ? t["@T_Create_New_Story"]?.value : "Loading"}
              <span className="ml-3">
                {
                  <CreateNewGame className="dark:text-sky-400 dark:border-sky-400" />
                }
              </span>
            </h1>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-black dark:text-sky-400">
          {stories.map((story: Story) => (
            <div
              key={story._id}
              onClick={() =>
                navigate(
                  getButtonByAction(getType(story))?.onClick.replace(
                    ":storyId",
                    story._id
                  )!
                )
              }
              className="shadow-xl cursor-pointer max-w-sm mt-3 w-full dark:shadow-xl-dark dark:dark-card rounded-md overflow-hidden p-3 bg-white dark:bg-transparent dark:border-sky-400"
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove(story);
                }}
                className="float-right bg-blue-200 dark:bg-transparent p-1 rounded cursor-pointer"
              >
                <Delete className={"h-6 w-6"} />
              </div>
              <img
                className="w-full h-40 object-contain"
                src={`/${type}.png`}
                alt={story.title}
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{story.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {story.topic}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {t["@T_Players"]?.value} {story.players.length}
                </p>
                <button
                  onClick={() =>
                    navigate(
                      getButtonByAction(getType(story))?.onClick.replace(
                        ":storyId",
                        story._id
                      )!
                    )
                  }
                  className={`${
                    getButtonByAction(getType(story))?.className
                  } w-full px-4 py-2 rounded-md`}
                >
                  {getButtonByAction(getType(story))?.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stories;
