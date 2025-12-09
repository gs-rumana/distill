import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { MainState } from '../../typings/redux';
import { SortConfig, Task } from '../../typings/data';
import { getWeightedTasks } from '../../utils/algorithm';

const initialState: MainState = {
	date: null,
	sessions: [],
	tasks: [],
	todayFocusTasks: [],
	sortConfig: { field: 'priority', order: 'desc' },
	timeDuration: 25,
	autoStartTimer: false,
	dateFormat: 'normal',
};

const main = createSlice({
	name: 'main',
	initialState,
	reducers: {
		changeSettings: (
			state,
			action: PayloadAction<Partial<Pick<MainState, 'timeDuration' | 'autoStartTimer' | 'dateFormat'>>>
		) => {
			state.timeDuration = action.payload.timeDuration ?? state.timeDuration;
			state.autoStartTimer = action.payload.autoStartTimer ?? state.autoStartTimer;
			state.dateFormat = action.payload.dateFormat ?? state.dateFormat;
		},
		setDate: (state, action: PayloadAction<string>) => {
			if (state.date === action.payload) {
				return;
			}
			state.date = action.payload;
			state.todayFocusTasks = [];
		},
		startSession: (state, action: PayloadAction<{ taskId: string; duration?: number }>) => {
			state.sessions.push({
				duration: action.payload.duration ?? 25,
				id: uuid(),
				startedAt: new Date().toISOString(),
				taskId: action.payload.taskId,
			});
		},
		completeSession: (state, action: PayloadAction<string>) => {
			const session = state.sessions.find((s) => s.id === action.payload);
			if (session === undefined) {
				return;
			}
			state.todayFocusTasks.push(session.taskId);
		},
		deleteSession: (state, action: PayloadAction<string>) => {
			const sessionIdx = state.sessions.findIndex((s) => s.id === action.payload);
			if (sessionIdx === -1) {
				return;
			}
			state.sessions.splice(sessionIdx, 1);
		},
		addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
			state.tasks.push({
				createdAt: new Date().toISOString(),
				id: uuid(),
				...action.payload,
			});
		},
		editTask: (state, action: PayloadAction<Partial<Task>>) => {
			if (!action.payload.id) {
				return;
			}
			const taskIdx = state.tasks.findIndex((t) => t.id === action.payload.id);
			if (taskIdx === -1) {
				return;
			}
			state.tasks[taskIdx] = {
				...state.tasks[taskIdx],
				...action.payload,
			};
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			const taskIdx = state.tasks.findIndex((t) => t.id === action.payload);
			if (taskIdx === -1) {
				return;
			}
			state.tasks.splice(taskIdx, 1);
		},
		clearAllTasks: (state) => {
			state.tasks = [];
			state.sessions = [];
			state.todayFocusTasks = [];
		},
		setSortConfig: (state, action: PayloadAction<SortConfig>) => {
			if (!state.sortConfig) {
				state.sortConfig = { field: 'priority', order: 'desc' };
			}
			state.sortConfig = action.payload;
		},
	},
	selectors: {
		todayTopTasks: (state) => {
			return getWeightedTasks(state.tasks).slice(0, 3);
		},
		todayCompletedTasks: (state) => {
			return [...state.tasks].filter((task) => task.status === 3 && dayjs(task.createdAt).isSame(dayjs(), 'day'));
		},
	},
});

export const {
	addTask,
	clearAllTasks,
	completeSession,
	deleteSession,
	deleteTask,
	editTask,
	setDate,
	setSortConfig,
	changeSettings,
	startSession,
} = main.actions;

export const { todayTopTasks, todayCompletedTasks } = main.selectors;

export default main.reducer;
