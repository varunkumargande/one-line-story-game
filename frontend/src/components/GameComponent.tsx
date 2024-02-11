// GameComponent.tsx

import React, { useState, useEffect, useRef } from "react";
import Send from "./svgs/Send";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Edit from "./svgs/Edit";
import { ConfigRoutes } from "config/routes.config";
import { Message } from "utils/types";

interface Player {
  _id: string;
  name: string;
}

interface CircularComponentProps {
  text: string;
  className: string;
}

const playerColors = [
  "text-blue-500",
  "text-green-500",
  "text-red-500",
  "text-yellow-500",
  "text-indigo-500",
  "text-pink-500",
  "text-purple-500",
  "text-teal-500",
  "text-orange-500",
  "text-cyan-500",
];

const playerBgColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
];

export const CircularComponent: React.FC<CircularComponentProps> = ({
  text,
  className,
}) => {
  return (
    <div
      className={`rounded-full w-10 h-10 flex items-center justify-center text-white font-bold ${className} border-2`}
    >
      {text}
    </div>
  );
};

const GameComponent: React.FC = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}players?story=${storyId}`
        );
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching Players:", error);
        alert("Failed to List Players. Please try again.");
      }
    };

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}contents?story=${storyId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching Messages:", error);
        alert("Failed to List Messages. Please try again.");
      }
    };

    fetchPlayers();
    fetchMessages();
  }, [storyId]);

  const getPlayerColorClass = (index: number) => {
    return playerColors[index % players.length];
  };

  const getBgPlayerColorClass = (index: number) => {
    return playerBgColors[index % players.length];
  };

  const handleSendMessage = () => {
    if (inputText.trim().length < 3) {
      alert("Failed to create Message. Minimum 3 Chars Required");
      return;
    }
    if (inputText.trim() !== "") {
      const currentPlayer = players[messages.length % players.length];
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}contents`, {
          story: storyId,
          player: currentPlayer._id,
          content: inputText,
        })
        .then((response) => {
          const message = response.data;
          const newMessage: Message = {
            _id: message._id,
            player: currentPlayer._id,
            content: inputText,
          };

          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setInputText("");
          setEditingMessageId(null);
          // Handle the successful response, if needed
          console.log("Message created successfully:", response.data);
          // You can also call the onSubmit function passed as a prop to handle the state in your parent component
        })
        .catch((error) => {
          // Handle the error, show alert
          console.error("Error creating Message:", error);
          alert("Failed to create Message. Please try again."); // Show an alert on error
        });
    }
  };

  const handleEditMessage = (messageId: number) => {
    const messageToEdit = messages.find((message) => message._id === messageId);
    if (messageToEdit) {
      setInputText(messageToEdit.content);
      setEditingMessageId(messageId);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line
      if (inputText && inputText.trim().length < 3) {
        alert("Failed to edit Message. Minimum 3 Chars Required");
        return;
      }
      if (editingMessageId !== null) {
        const updatedMessage = messages.find(
          (message) => message._id === editingMessageId
        );
        updatedMessage &&
          axios
            .put(
              `${process.env.REACT_APP_BACKEND_URL}contents/${editingMessageId}`,
              {
                story: storyId,
                player: updatedMessage.player,
                content: inputText,
              }
            )
            .then((response) => {
              // Handle the successful response, if needed
              console.log("Message edited successfully:", response.data);
              const updatedMessages = messages.map((message) =>
                message._id === response.data._id
                  ? { ...message, content: response.data.content }
                  : message
              );
              setMessages(updatedMessages);
              setInputText("");
              setEditingMessageId(null);

              // You can also call the onSubmit function passed as a prop to handle the state in your parent component
            })
            .catch((error) => {
              // Handle the error, show alert
              console.error("Error editing Message:", error);
              alert("Failed to Edit Message. Please try again."); // Show an alert on error
            });
        // If editing a message, update the existing message
      } else {
        // If not editing, send a new message
        handleSendMessage();
      }
    }
  };

  const endGame = () => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}stories/${storyId}`, {
        end_game: true,
      })
      .then((res) =>
        navigate(ConfigRoutes.RESULTS.replace(":storyId", storyId!))
      );
  };

  // Scroll to the bottom when a new message is added or edited
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, editingMessageId]);

  return (
    <div
      className="nav dark:bg-[#00000080] bg-[#ffffff90] flex flex-col w-full sm:w-10/12 md:w-8/12 lg:w-8/12 xl:w-6/12 mx-auto"
      style={{ height: "calc(100vh - 144px)" }}
    >
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-2">
        {messages.map((message, index) => (
          <div
            key={message._id}
            className={`p-2 flex ${getPlayerColorClass(index)}`}
          >
            <strong className="pr-2">
              {players[index % players.length]?.name}:
            </strong>{" "}
            {editingMessageId === message._id ? (
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                autoFocus
                className="px-2 rounded dark:bg-transparent dark:border"
              />
            ) : (
              <>
                <span onClick={() => handleEditMessage(message._id)}>
                  {message.content}
                </span>
                <button onClick={() => handleEditMessage(message._id)}>
                  <Edit className="text-black dark:text-blue-500 w-4 h-4 ml-2" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center p-2">
        <CircularComponent
          className={`${getBgPlayerColorClass(
            messages.length % players.length
          )} dark:text-white dark:bg-transparent border-white dark:border-white mr-2`}
          text={players[messages.length % players.length]?.name
            .charAt(0)
            .toUpperCase()}
        />
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-2 mr-2 border border-gray-300 dark:bg-transparent rounded h-8 md:h-full w-full"
          placeholder={`Enter your text ${
            players[messages.length % players.length]?.name
          }`}
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 dark:bg-transparent dark:border dark:border-blue-500 rounded-full"
        >
          <Send className="text-white dark:text-blue-500 w-8 h-8" />
        </button>
      </div>
      <button
        onClick={endGame}
        className="px-4 py-2 m-3 text-white dark:text-red-500 bg-red-500 dark:bg-transparent dark:border dark:border-red-500 rounded-full"
      >
        End Game
      </button>
    </div>
  );
};

export default GameComponent;
