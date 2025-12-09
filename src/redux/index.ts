import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import main from './slices/main';
import reduxStorage from './storage';

const rootReducer = combineReducers({
	main,
});

const persistedReducer = persistReducer(
	{
		key: 'distill',
		storage: reduxStorage,
	},
	rootReducer
);

const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
