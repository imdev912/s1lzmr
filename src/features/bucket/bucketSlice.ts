import { createSlice } from "@reduxjs/toolkit";

type Ball = {
  [color: string]: number;
};

export type Bucket = {
  name: string;
  volume?: number;
  balls?: Ball;
  space?: number;
};

export type Buckets = {
  [name: string]: Bucket;
};

const name = "bucket";
const initialState: Buckets = {};
const reducers = {
  addBucket: (
    state: Buckets,
    action: {
      type: string;
      payload: Bucket;
    }
  ) => {
    const volume = action.payload.volume || 0;
    const space = action.payload.space || 0;

    state[action.payload.name] = {
      name: action.payload.name,
      volume: parseFloat(parseFloat(volume.toString()).toFixed(2)),
      space: parseFloat(parseFloat(space.toString()).toFixed(2)),
      balls: {}
    };
  },
  putBall: (
    state: Buckets,
    action: {
      type: string;
      payload: {
        name: string;
        color: string;
        space: number;
      };
    }
  ) => {
    const { name, color, space } = action.payload;
    const current_balls = state[name]["balls"];
    const current_color = current_balls && current_balls[color] ? current_balls[color] : 0;

    state[name] = {
      ...state[name],
      space: parseFloat(parseFloat(space.toString()).toFixed(2)),
      balls: {
        ...state[name]["balls"],
        [color]: current_color + 1
      }
    };
  },
  clearBall: (state: Buckets) => {
    Object.keys(state).forEach((item) => {
      state[item] = {
        ...state[item],
        space: state[item]["volume"],
        balls: {}
      };
    });
  }
};

const bucketSlice = createSlice({ name, initialState, reducers });

const bucketReducer = bucketSlice.reducer;
const bucketActions = bucketSlice.actions;

export { bucketReducer, bucketActions };
