import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import Text from './text';
import View from './view';
import { TaskItemProps } from '../typings/components';
import { useState } from 'react';
import BottomSheet from './bottom-sheet';
import { Button } from './button';
import Icon from './icon';
import { Spacing } from '../constants/theme';
import { router } from 'expo-router';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/slices/main';
import { useTheme } from '../hooks/useTheme';
import { getPriorityIcon, getStatusIcon } from '../utils/status-helpers';
import useAppSelector from '../hooks/useAppSelector';

const Status = {
	1: 'To Do',
	2: 'In Progress',
	3: 'Completed',
};

const PriorityName = {
	1: 'Low',
	2: 'Medium',
	3: 'High',
};

const TaskItem = (item: TaskItemProps) => {
	const [sheetVisible, setSheetVisible] = useState(false);

	const dispatch = useDispatch();
	const { borders } = useTheme();
	const { dateFormat } = useAppSelector((s) => s.main);

	const status = Status[item.status];
	const priorityName = PriorityName[item.priority];
	const dueDate = item.dueDate
		? dateFormat === 'relative'
			? dayjs(item.dueDate).fromNow()
			: dayjs(item.dueDate).format('DD MMM, YYYY')
		: 'No Due Date';

	const priorityIcon = getPriorityIcon(item.priority);
	const statusIcon = getStatusIcon(item.status);

	const StatusIcon = <Icon name={statusIcon[0]} color={statusIcon[1]} size="xl" colorVariant="base" />;
	const PriorityIcon = (
		<Icon
			name={priorityIcon[0]}
			size="xl"
			color={item.priority === 3 ? 'error' : item.priority === 2 ? 'warning' : 'success'}
			colorVariant="base"
		/>
	);

	const handleDelete = () => {
		Alert.alert('Delete Task', 'Do you want to delete this task?', [
			{
				onPress: () => {
					dispatch(deleteTask(item.id));
					setSheetVisible(null);
				},
				style: 'destructive',
				text: 'Yes, Delete',
			},
			{
				style: 'cancel',
				text: 'Cancel',
			},
		]);
	};

	const handleStart = () => {
		router.push({ pathname: '/working-session', params: { task: JSON.stringify(item) } });
		setSheetVisible(false);
	};
	return (
		<View
			bgVariant="subtle"
			background="body"
			padding="md"
			radius="lg"
			gap="md"
			style={[styles.itemContainer, { borderColor: borders.body }]}
			touchable
			onPress={item.status === 3 ? () => setSheetVisible(true) : handleStart}
			onLongPress={() => setSheetVisible(true)}
		>
			<View direction="row" alignItems="center" justifyContent="space-between" gap="sm">
				{PriorityIcon}
				<Text
					variant="h5"
					style={[item.status == 3 && styles.completedTask, { flex: 1 }]}
					numberOfLines={2}
					colorVariant={item.status === 3 ? 'base' : 'on'}
				>
					{item.title}
				</Text>
				{StatusIcon}
			</View>
			<Text>Due: {dueDate}</Text>

			<BottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} height="auto">
				<View
					bgVariant="subtle"
					background="body"
					padding="md"
					radius="lg"
					gap="md"
					style={[styles.itemContainer, { borderColor: borders.body }]}
				>
					<Text variant="h5" numberOfLines={2}>
						{item.title}
					</Text>
					<View direction="row" alignItems="center" justifyContent="space-between" gap="md">
						<View direction="row" alignItems="center" justifyContent="center" gap="xs">
							<Text>Priority -</Text>
							{PriorityIcon}
							<Text>{priorityName}</Text>
						</View>
						<View direction="row" alignItems="center" justifyContent="center" gap="xs">
							{StatusIcon}
							<Text>{status}</Text>
						</View>
					</View>

					<View direction="row" alignItems="center" justifyContent="space-between" gap="md">
						<Text>Due: {dueDate}</Text>
						<Text>Added: {item.createdAt ? dayjs(item.createdAt).format('DD MMM, YYYY') : '-'}</Text>
					</View>
				</View>

				{item.status !== 3 && (
					<Button buttonColor="success" buttonVariant="subtle" style={styles.button} onPress={handleStart}>
						<Icon name="flash-outline" color="success" colorVariant="emphasis" size="xl" />
						<Text color="success" colorVariant="emphasis" variant="button">
							Start Working
						</Text>
					</Button>
				)}
				<Button
					buttonColor="secondary"
					buttonVariant="subtle"
					style={styles.button}
					onPress={() => router.push({ pathname: '/add-task', params: { task: JSON.stringify(item) } })}
				>
					<Icon name="pencil" color="secondary" colorVariant="emphasis" size="xl" />
					<Text color="secondary" colorVariant="emphasis" variant="button">
						Edit
					</Text>
				</Button>
				<Button
					buttonColor="error"
					buttonVariant="subtle"
					style={[styles.button, { marginBottom: Spacing.lg }]}
					onPress={handleDelete}
				>
					<Icon name="trash-outline" color="error" colorVariant="emphasis" size="xl" />
					<Text color="error" colorVariant="emphasis" variant="button">
						Delete
					</Text>
				</Button>
			</BottomSheet>
		</View>
	);
};

export default TaskItem;

const styles = StyleSheet.create({
	itemContainer: {
		borderBottomWidth: 1,
	},
	button: { marginTop: Spacing.md, gap: Spacing.sm },
	completedTask: { textDecorationStyle: 'solid', textDecorationLine: 'line-through', opacity: 0.7 },
});
