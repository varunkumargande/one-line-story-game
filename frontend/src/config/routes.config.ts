export enum ConfigRoutes {
  HOME = "/",
  MULTI_PLAYER="/multiplayer/:storyId",
  PLAY_WITH_BOT="/play-with-bot/:storyId",
  STORIES = "/stories/:type",
  CREATE_GAME_MULTI="/multiplayer/create-game",
  CREATE_GAME="/play-with-bot/create-game",
  CREATE_PLAYERS_MULTI="/multiplayer/create-players/:storyId",
  CREATE_PLAYERS="/play-with-bot/create-players/:storyId",
  RESULTS="/results/:storyId",
  NOT_FOUND="*",
}
