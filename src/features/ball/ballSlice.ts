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
    const volume = action.payload.volume || 0;
    const count = action.payload.count || 0;

    state[action.payload.color] = {
      color: action.payload.color,
      volume: parseFloat(parseFloat(volume.toString()).toFixed(2)),
      count: parseInt(count.toString())
    };
  },
  updateBallVolume: (
    state: Balls,
    action: {
      type: string;
      payload: Ball;
    }
  ) => {
    const volume = action.payload.volume || 0;
    state[action.payload.color]["volume"] = parseFloat(parseFloat(volume.toString()).toFixed(2));
  },
  updateBallCount: (
    state: Balls,
    action: {
      type: string;
      payload: Ball;
    }
  ) => {
    const count = action.payload.count || 0;
    state[action.payload.color]["count"] = parseInt(count.toString());
  }
};

const ballSlice = createSlice({ name, initialState, reducers });

const ballReducer = ballSlice.reducer;
const ballActions = ballSlice.actions;

export { ballReducer, ballActions };
