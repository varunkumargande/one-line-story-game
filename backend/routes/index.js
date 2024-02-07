const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const playerController = require("../controllers/playerController");
const contentController = require("../controllers/contentController");

// Story routes
router.post("/stories", storyController.createStory);
router.get("/stories", storyController.listStories);
router.get("/stories/:id", storyController.getStoryById);
router.put("/stories/:id", storyController.updateStory);
router.delete("/stories/:id", storyController.deleteStory);
router.get("/filter/stories", storyController.getFilteredStories);

// Player routes
router.post("/players", playerController.createPlayer);
router.get("/players", playerController.listPlayers);
router.get("/players/:id", playerController.getPlayerById);
router.put("/players/:id", playerController.updatePlayer);
router.delete("/players/:id", playerController.deletePlayer);

// Content routes
router.post("/contents", contentController.createContent);
router.get("/contents", contentController.listContents);
router.get("/contents/:id", contentController.getContentById);
router.put("/contents/:id", contentController.updateContent);
router.delete("/contents/:id", contentController.deleteContent);

module.exports = router;
