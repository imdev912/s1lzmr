import { createSlice } from "@reduxjs/toolkit";

export type AppState = {
  numberOfBuckets?: number;
  numberOfColors?: number;
};

const name = "app";
const initialState = {
  numberOfBuckets: 5,
  numberOfColors: 5
};

const reducers = {
  updateBucketCount: (state: AppState, action: {
    payload: {
      count: number
    }
  }) => {
    state.numberOfBuckets = action.payload.count;
  },
  updateColorCount: (state: AppState, action: {
    payload: {
      count: number
    }
  }) => {
    state.numberOfColors = action.payload.count;
  }
};

const appSlice = createSlice({ name, initialState, reducers });

const appReducer = appSlice.reducer;
const appActions = appSlice.actions;

export { appReducer, appActions };
