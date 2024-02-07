const Player = require("../models/player");
const Story = require("../models/story");

const storyController = {
  createStory: async (req, res) => {
    try {
      const newStory = await Story.create(req.body);
      res.status(201).json(newStory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getStoryById: async (req, res) => {
    try {
      const storyId = req.params.id;

      // Find the story and populate the 'players' field
      const story = await Story.findById(storyId).populate({
        path: "players",
        select: "name",
      });

      const players = await Player.find({ story: story.id }).select("name");
      story.players = players;

      // Check if the story exists
      if (!story) {
        return res.status(404).json({ error: "Story not found." });
      }

      // Respond with the found story
      res.status(200).json(story);
    } catch (error) {
      console.error("Error fetching story by ID:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  listStories: async (req, res) => {
    try {
      // Fetch all stories from the database
      const stories = await Story.find().populate("players");

      // Respond with the list of stories
      res.status(200).json(stories);
    } catch (error) {
      console.error("Error listing stories:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateStory: async (req, res) => {
    try {
      const updatedStory = await Story.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedStory) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.json(updatedStory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteStory: async (req, res) => {
    try {
      // const deletedStory = await Story.findById(req.params.id).remove();
      const deletedStory = await Story.findOneAndDelete({ _id: req.params.id });
      if (!deletedStory) {
        return res.status(404).json({ message: "Story not found" });
      }
      res.json({ message: "Story deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFilteredStories: async (req, res) => {
    try {
      const { end_game, start_game } = req.query;
      let query = {};

      // Check if end_game query parameter is provided
      if (end_game !== undefined) {
        query.end_game = end_game.toLowerCase() === "true";
      }

      // Check if start_game query parameter is provided
      if (start_game !== undefined) {
        query.start_game = start_game.toLowerCase() === "true";
      }

      let stories;

      // Apply filters
      if (Object.keys(query).length > 0) {
        stories = await Story.find(query);
      } else {
        stories = await Story.find();
      }

      res.json(stories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = storyController;
