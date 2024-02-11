const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 180,
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  end_game: {
    type: Boolean,
    default: false,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  is_multi_player: {
    type: Boolean,
    required: true,
  },
  topic: {
    type: String,
    minLength: 3,
  },
});

// Pre-hook to remove associated content and players when a story is deleted
storySchema.pre("findOneAndDelete", async function (options) {
  try {
    // Execute the query and store the deleted document
    const deletedStory = await this.model.findOne(options.criteria);

    // Check if the story exists
    if (!deletedStory) {
      return;
    }

    // Remove associated contents
    await mongoose.model("Content").deleteMany({ story: deletedStory._id });

    // Remove only associated players
    const result = await mongoose
      .model("Player")
      .deleteMany({ story: deletedStory._id });
    console.log("Deleted players result:", result);
  } catch (error) {
    console.error("Error in pre-hook:", error);
    throw error; // Re-throw the error to prevent the deletion if an error occurs
  }
});

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
