const Player = require("../models/player");
const Story = require("../models/story");

const playerController = {
  createPlayer: async (req, res) => {
    try {
      const { name, storyId } = req.body;

      // Check if the storyId is provided
      if (!storyId) {
        return res.status(400).json({ error: "Story ID is required." });
      }

      // Create a new player and attach it to the specified story
      const player = new Player({
        name,
        story: storyId,
      });

      // Save the player to the database
      await player.save();

      const story = await Story.findById({ _id: player.story });
      story.players.push(story);
      await story.save();

      // Respond with the created player
      res.status(201).json(player);
    } catch (error) {
      console.error("Error creating player:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  listPlayers: async (req, res) => {
    try {
      // Find all players
      const players = await Player.find();

      // Respond with the list of players
      res.status(200).json(players);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  getPlayerById: async (req, res) => {
    try {
      const player = await Player.findById(req.params.id);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePlayer: async (req, res) => {
    try {
      const updatedPlayer = await Player.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedPlayer) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.json(updatedPlayer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePlayer: async (req, res) => {
    try {
      const deletedPlayer = await Player.findOneAndDelete({
        _id: req.params.id,
      });
      if (!deletedPlayer) {
        return res.status(404).json({ message: "Player not found" });
      }
      res.json({ message: "Player deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = playerController;
