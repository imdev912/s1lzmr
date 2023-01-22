import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { appReducer } from "../features/app/appSlice";
import { ballReducer } from "../features/ball/ballSlice";
import { bucketReducer } from "../features/bucket/bucketSlice";

const rootReducer = combineReducers({
	app: appReducer,
	ball: ballReducer,
	bucket: bucketReducer
});

const persistConfig = {
	key: "bucketsNballs",
	storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		})
});

export const persistor = persistStore(store);
export default store;
