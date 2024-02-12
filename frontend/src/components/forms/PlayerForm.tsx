import axios from "axios";
import Delete from "components/svgs/Delete";
import { ConfigRoutes } from "config/routes.config";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Player {
  id: number;
  name: string;
  modified: boolean;
  _id?: number;
}

const PlayerForm: React.FC = () => {
  const { storyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "", modified: false },
    { id: 2, name: "", modified: false },
  ]);

  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({
    1: "",
    2: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}players/?story=${storyId}`)
      .then((response) => {
        const datam = response.data.map((player: Player, index: number) => ({
          ...player,
          modified: false,
          id: index + 1,
        }));
        if (datam.length) {
          if (datam.length === 1) {
            datam[1] = { id: 2, name: "", modified: false };
          }
          setPlayers(datam);
          const values = {} as { [key: number]: string };
          datam.map((data: Player, index: number) => {
            values[index + 1] = data.name;
            if (datam.length === 1) {
              values[2] = "";
            }
            return data;
          });
          setInputValues(values);
        }
      })
      .catch((error) => {
        // Handle the error, show alert
        console.error("Error listing Players:", error);
        alert("Failed to List Players. Please try again."); // Show an alert on error
      });
  }, [storyId]);

  const addPlayer = () => {
    const newPlayer: Player = {
      id: players.length + 1,
      name: "",
      modified: false,
    };
    setPlayers([...players, newPlayer]);
    setInputValues({ ...inputValues, [newPlayer.id]: "" });
  };

  const handleSave = (currentPlayer: Player) => {
    const id = currentPlayer.id;
    if (inputValues[id].length >= 3) {
      const requestPromise = currentPlayer?._id
        ? axios.put(
            `${process.env.REACT_APP_BACKEND_URL}players/${currentPlayer?._id}`,
            {
              story: storyId,
              name:
                inputValues[id].charAt(0).toUpperCase() +
                inputValues[id].slice(1),
            }
          )
        : axios.post(`${process.env.REACT_APP_BACKEND_URL}players`, {
            storyId,
            name:
              inputValues[id].charAt(0).toUpperCase() +
              inputValues[id].slice(1),
          });

      requestPromise
        .then((response) => {
          const updatedPlayers = players.map((player) =>
            player.id === id
              ? {
                  ...player,
                  name: inputValues[id],
                  modified: false,
                  _id: response.data._id,
                }
              : player
          );
          // Handle the successful response, if needed
          console.log("Player created successfully:", response.data);
          setPlayers(updatedPlayers);
          // You can also call the onSubmit function passed as a prop to handle the state in your parent component
        })
        .catch((error) => {
          // Handle the error, show alert
          console.error("Error creating Player:", error);
          alert("Failed to create Player. Please try again."); // Show an alert on error
        });
    } else {
      alert("Failed to create Player. Minimum 3 Chars Required");
    }
  };

  const handleInputChange = (id: number, value: string) => {
    setInputValues({ ...inputValues, [id]: value });
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, modified: true } : player
    );
    setPlayers(updatedPlayers);
  };

  const handleRemove = (currentPlayer: Player) => {
    if (currentPlayer?._id) {
      axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}players/${currentPlayer._id}`
        )
        .then((response) => {
          // Handle the successful response, if needed
          console.log("Player deleted successfully:", response.data);
        })
        .catch((error) => {
          // Handle the error, show alert
          console.error("Error creating Player:", error);
          alert("Failed to delete Player. Please try again."); // Show an alert on error
        });
    }
    const updatedPlayers = players.filter(
      (player) => player.id !== currentPlayer.id
    );
    setPlayers(updatedPlayers);
    const { [currentPlayer.id]: removedValue, ...newInputValues } = inputValues;
    setInputValues(newInputValues);
  };

  const areMinimumPlayersSaved =
    players.filter((player) => player.name === "").length === 0 &&
    players.length >= 2;
  const areAnyModified = players.some((player) => player.modified);

  return (
    <div className="nav container mx-auto mt-8 dark:bg-transparent dark:border dark:border-cyan-400 p-4">
      <h1 className="text-2xl font-semibold text-white mb-4 px-5">
        Player Form
      </h1>
      <div
        className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-${
          players.length > 2 ? "3" : "2"
        } gap-4`}
      >
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex flex-wrap md:flex-nowrap sm:flex-row items-center space-y-2 sm:space-y-0 md:space-x-4 px-5`}
          >
            <input
              type="text"
              value={inputValues[player.id]}
              onChange={(e) => handleInputChange(player.id, e.target.value)}
              defaultValue={player.name}
              placeholder={`Player ${player.id}`}
              className={`mb-3 md:mb-0 p-2 w-full nav dark:border focus:outline-none  dark:bg-[#00000080] dark:text-cyan-400 ${
                player.modified
                  ? "border-red-300 dark:text-red-300"
                  : "border-cyan-400"
              }`}
            />
            <button
              className={`${
                !player.modified && "hidden"
              } bg-blue-500 dark:text-blue-500 dark:border-blue-500 hover:bg-blue-600 text-white  dark:bg-transparent dark:border nav py-2 px-4 rounded focus:outline-none mt-2 sm:mt-0 mr-3`}
              onClick={() => handleSave(player)}
              disabled={!player.modified}
            >
              Save
            </button>

            <button
              className="flex bg-red-500 text-white dark:text-red-500 dark:border-red-500 dark:bg-transparent dark:border nav py-2 px-4 rounded focus:outline-none hover:bg-red-600 mt-2 sm:mt-0"
              onClick={() => handleRemove(player)}
            >
              <Delete className={"h-6 w-6"} />
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-12 flex px-5">
        <div className="mx-auto space-x-3">
          <button
            className="bg-green-500 text-white dark:text-green-500 dark:border-green-500 dark:bg-transparent dark:border nav py-2 px-4 rounded focus:outline-none hover:bg-green-600 mb-3"
            onClick={addPlayer}
          >
            Add More Players
          </button>
          <div className="relative inline-block">
            <div className="has-tooltip">
              {(!areMinimumPlayersSaved || areAnyModified) && (
                <span
                  className="tooltip mt-[-2.4rem] w-max
              px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm  dark:bg-gray-700"
                >
                  Minimum two players are required and all players should be
                  saved
                </span>
              )}
              <button
                title="Save All Players and than click"
                className={`text-white dark:bg-transparent dark:border ${
                  areMinimumPlayersSaved && !areAnyModified
                    ? "bg-yellow-500  dark:text-yellow-500 dark:border-yellow-500 "
                    : "bg-gray-500  dark:text-gray dark:border-gray"
                } text-white py-2 px-4 rounded focus:outline-none ${
                  areMinimumPlayersSaved && !areAnyModified
                    ? "hover:bg-yellow-600"
                    : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (areMinimumPlayersSaved && !areAnyModified) {
                    // Navigate to the next step or perform any desired action
                    navigate(
                      location.pathname.includes(ConfigRoutes.MULTI_PLAYER)
                        ? ConfigRoutes.MULTI_PLAYER.replace(
                            ":storyId",
                            storyId!
                          )
                        : ConfigRoutes.PLAY_WITH_BOT.replace(
                            ":storyId",
                            storyId!
                          )
                    );
                  }
                }}
                disabled={!areMinimumPlayersSaved || areAnyModified}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;
