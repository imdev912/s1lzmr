import { createSlice } from "@reduxjs/toolkit";

export type Ball = {
  color: string;
  volume?: number;
  count?: number;
};

export type Balls = {
  [color: string]: Ball;
};

const name = "balls";
const initialState: Balls = {};

const reducers = {
  addBall: (
    state: Balls,
    action: {
      type: string;
      payload: Ball;
    }
  ) => {
    state[action.payload.color] = {
      color: action.payload.color,
      volume: action.payload.volume,
      count: action.payload.count
    };
  },
  updateBallVolume: (
    state: Balls,
    action: {
      type: string;
      payload: Ball;
    }
  ) => {
    state[action.payload.color]["volume"] = action.payload.volume;
  },
  updateBallCount: (
    state: Balls,
    action: {
      type: string;
      payload: Ball;
    }
  ) => {
    state[action.payload.color]["count"] = action.payload.count;
  }
};

const ballSlice = createSlice({ name, initialState, reducers });

const ballReducer = ballSlice.reducer;
const ballActions = ballSlice.actions;

export { ballReducer, ballActions };
