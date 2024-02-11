import axios from "axios";
import { ConfigRoutes } from "config/routes.config";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const StoryForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [errors, setErrors] = useState<{ title?: string; topic?: string }>({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const validationErrors: { title?: string; topic?: string } = {};

    if (title.length < 3 || title.length > 180) {
      validationErrors.title = "Title must be between 3 and 180 characters.";
    }

    if (topic.length < 3) {
      validationErrors.topic = "Topic must be at least 3 characters.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const is_multi_player =
      location.pathname === ConfigRoutes.CREATE_GAME_MULTI;

    // Axios POST request
    const data = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}stories`, {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        topic: topic.charAt(0).toUpperCase() + topic.slice(1),
        is_multi_player,
      })
      .then((response) => {
        // Handle the successful response, if needed
        console.log("Story created successfully:", response.data);
        return response.data;
        // You can also call the onSubmit function passed as a prop to handle the state in your parent component
      })
      .catch((error) => {
        // Handle the error, show alert
        console.error("Error creating story:", error);
        alert("Failed to create story. Please try again."); // Show an alert on error
      });

    // Clear the form
    setTitle("");
    setTopic("");
    setErrors({});

    data &&
      navigate(
        is_multi_player
          ? ConfigRoutes.CREATE_PLAYERS_MULTI.replace(":storyId", data._id)
          : ConfigRoutes.CREATE_PLAYERS.replace(":storyId", data._id)
      );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen-md mx-auto mt-8 dark:text-cyan-600"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full mt-1 p-2 border focus:outline-none focus:ring focus:border-blue-300 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700 dark:text-white"
        >
          Topic
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={`w-full mt-1 p-2 border focus:outline-none focus:ring focus:border-blue-300 ${
            errors.topic ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.topic && (
          <p className="text-red-500 text-xs mt-1">{errors.topic}</p>
        )}
      </div>

      <div className="w-3/4 mx-auto">
        <button
          type="submit"
          className="text-white bg-green-400 py-2 px-4 my-3 w-full rounded focus:outline-none hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default StoryForm;
