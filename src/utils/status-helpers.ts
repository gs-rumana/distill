import { Priority, Status } from '../typings/data';
import { IconName } from '../typings/icon';
import { ThemeColors } from '../typings/theme';

export const PriorityOptions = [
	{ label: 'High', value: 3 },
	{ label: 'Medium', value: 2 },
	{ label: 'Low', value: 1 },
];
export const StatusOptions = [
	{ label: 'To Do', value: 1 },
	{ label: 'In Progress', value: 2 },
	{ label: 'Completed', value: 3 },
];

export const getPriorityIcon = (priority: Priority): [IconName, ThemeColors] => {
	switch (priority) {
		case 1:
			return ['caret-down-circle', 'success'];
		case 2:
			return ['remove-circle', 'warning'];
		case 3:
			return ['caret-up-circle', 'error'];
	}
};

export const getStatusIcon = (status: Status): [IconName, ThemeColors] => {
	switch (status) {
		case 1:
			return ['ellipsis-horizontal-circle', 'secondary'];
		case 2:
			return ['hourglass', 'primary'];
		case 3:
			return ['checkmark-done-circle', 'success'];
	}
};
