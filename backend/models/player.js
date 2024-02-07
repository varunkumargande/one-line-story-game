const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100, // Adjust the maximum length as needed
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now, // Set a default value to the current date and time
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
});

// Pre-hook to remove associated content when a player is deleted
playerSchema.pre("findOneAndDelete", async function (options) {
  // Execute the query and store the deleted document
  const deletedPlayer = await this.model.findOne(options.criteria);

  // Check if the story exists
  if (!deletedPlayer) {
    return;
  }
  try {
    // Remove associated content
    const result = await mongoose
      .model("Content")
      .deleteMany({ player: deletedPlayer._id });
    console.log("Deleted Content result:", result);
  } catch (error) {
    console.error("Error in pre-hook:", error);
    throw error; // Re-throw the error to prevent the deletion if an error occurs
  }
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
