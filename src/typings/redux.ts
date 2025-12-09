import { Session, SortConfig, Task } from './data';

export type MainState = {
	tasks: Task[];
	sessions: Session[];
	todayFocusTasks: string[];
	date: string | null;
	sortConfig: SortConfig;
	timeDuration: number;
	autoStartTimer: boolean;
	dateFormat: 'normal' | 'relative';
};

export type RootState = {
	main: MainState;
};
