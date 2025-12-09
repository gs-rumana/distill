export type Priority = 1 | 2 | 3;

export type Status = 1 | 2 | 3;

export type SortField = 'priority' | 'status' | 'dueDate' | 'createdAt';

export type SortOrder = 'asc' | 'desc';

export type SortConfig = {
	field: SortField;
	order: SortOrder;
};

export type Task = {
	id: string;
	title: string;
	priority: Priority;
	status: Status;
	createdAt: string;
	dueDate?: string;
};

export type Session = {
	id: string;
	taskId: string;
	startedAt: string;
	duration: number;
	completedAt?: string;
};
