import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  play: [],
  numOfGames: 0,
  numOfMembers: 0,
  members: [],
};

const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    addGame: (state, action) => {
      state.numOfGames = action.payload.numOfGames;
      state.numOfMembers = action.payload.numOfMembers;
    },
    addMembers: (state, action) => {
      state.members = action.payload;
      return state;
    },
    changeScore: (state, action) => {
      state.play[action.payload.i] = action.payload.scores;
      return state;
    },
    addScore: (state, action) => {
      state.play.push(action.payload);
      return state;
    },
    reset: (state, action) => {
      state = initialState;
      return state;
    },
  },
});
export default game.reducer;
export const { addMembers, changeScore, addScore, addGame, changePlay, reset } =
  game.actions;
export const selectGame = (state) => state.game;
