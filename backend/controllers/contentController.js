const Content = require("../models/content");
const Player = require("../models/player");
const Story = require("../models/story");

const contentController = {
  createContent: async (req, res) => {
    const { story, player } = req.body;

    try {
      // Check if the story exists
      const storyExists = await Story.findById(story);
      if (!storyExists) {
        return res.status(404).json({ error: "Story not found" });
      }

      // Check if the player exists
      const playerExists = await Player.findById(player);
      if (!playerExists) {
        return res.status(404).json({ error: "Player not found" });
      }

      // Create content if both story and player exist
      const newContent = await Content.create(req.body);
      await newContent.save();

      return res.status(201).json(newContent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  listContents: async (req, res) => {
    try {
      const { story } = req.query;
      let query = {};
      // List all contents
      if (story !== undefined) {
        query.story = story;
      }
      const contents = await Content.find(query);
      // Respond with the list of contents
      res.status(200).json(contents);
    } catch (error) {
      console.error("Error fetching contents:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  getContentById: async (req, res) => {
    try {
      const content = await Content.findById(req.params.id).populate("player");
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateContent: async (req, res) => {
    try {
      const updatedContent = await Content.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedContent) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(updatedContent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteContent: async (req, res) => {
    try {
      const deletedContent = await Content.findByIdAndDelete(req.params.id);
      if (!deletedContent) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json({ message: "Content deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = contentController;
