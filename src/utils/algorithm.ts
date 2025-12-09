import dayjs from 'dayjs';
import { Task } from '../typings/data';

const PRIORITY_SCORES = {
	3: 300, // High
	2: 200, // Medium
	1: 100, // Low
};

const STATUS_SCORES = {
	2: 150, // In Progress
	1: 50, // To Do
	3: 0, // Completed
};

export const calculateTaskScore = (task: Task): number => {
	let score = 0;

	// 1. Priority Score
	score += PRIORITY_SCORES[task.priority] || 0;

	// 2. Status Score
	score += STATUS_SCORES[task.status] || 0;

	// 3. Due Date Score
	if (task.dueDate) {
		const today = dayjs().startOf('day');
		const dueDate = dayjs(task.dueDate).startOf('day');
		const diffDays = dueDate.diff(today, 'day');

		if (diffDays < 0) {
			score += 500; // Overdue
		} else if (diffDays === 0) {
			score += 400; // Due Today
		} else if (diffDays === 1) {
			score += 300; // Due Tomorrow
		} else if (diffDays <= 3) {
			score += 200; // Due within 3 days
		} else if (diffDays <= 7) {
			score += 100; // Due within 7 days
		}
	}

	return score;
};

export const getWeightedTasks = (tasks: Task[]): Task[] => {
	// Filter out completed tasks
	const activeTasks = tasks.filter((task) => task.status !== 3);

	return activeTasks.sort((a, b) => {
		const scoreA = calculateTaskScore(a);
		const scoreB = calculateTaskScore(b);

		if (scoreA !== scoreB) {
			return scoreB - scoreA; // Descending score
		}

		// Tie-breaker: Created At (Older is higher priority)
		return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
	});
};
