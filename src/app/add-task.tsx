import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import Container from '../components/container';
import { Input, Select } from '../components/input';
import DatePicker from '../components/input/date-picker';
import Text from '../components/text';
import View from '../components/view';
import { Spacing } from '../constants/theme';
import { useDispatch } from 'react-redux';
import { addTask, deleteTask, editTask } from '../redux/slices/main';
import { Priority, Status, Task } from '../typings/data';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { Alert } from 'react-native';
import Icon from '../components/icon';
import { getPriorityIcon, getStatusIcon, PriorityOptions, StatusOptions } from '../utils/status-helpers';

const formData: { title: string; priority?: Priority; dueDate?: Date; status?: Status } = {
	title: '',
	priority: undefined,
	status: 1,
	dueDate: undefined,
};

const AddTask = () => {
	const dispatch = useDispatch();
	const params = useLocalSearchParams();

	const [form, setForm] = useState(formData);
	const [isEditMode, setIsEditMode] = useState(false);
	const [taskId, setTaskId] = useState<string | undefined>(undefined);

	const title = isEditMode ? 'Edit Task' : 'Add Task';

	useEffect(() => {
		if (params.task) {
			try {
				const taskData = JSON.parse(params.task as string) as Task;
				setIsEditMode(true);
				setTaskId(taskData.id);
				setForm({
					title: taskData.title,
					priority: taskData.priority,
					status: taskData.status,
					dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
				});
			} catch (error) {
				console.error('Error parsing task data:', error);
			}
		}
	}, [params.task]);

	const updateForm = (key: keyof typeof formData, value: any) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = () => {
		// Validate title
		if (!form.title || form.title.trim() === '') {
			Alert.alert('Missing Title', 'Please enter a title for the task');
			return;
		}

		// Validate priority
		if (!form.priority) {
			Alert.alert('Missing Priority', 'Please select a priority for the task');
			return;
		}

		// Validate status
		if (!form.status) {
			Alert.alert('Missing Status', 'Please select a status for the task');
			return;
		}

		if (isEditMode && taskId) {
			dispatch(
				editTask({
					id: taskId,
					...form,
					dueDate: form.dueDate?.toISOString(),
				})
			);
		} else {
			dispatch(
				addTask({
					...form,
					priority: form.priority as Priority,
					status: form.status as Status,
					dueDate: form.dueDate?.toISOString(),
				})
			);
		}

		router.back();
	};

	const handleDelete = () => {
		if (!isEditMode || !taskId) {
			return;
		}
		Alert.alert('Delete Task', 'Do you want to delete this task?', [
			{
				onPress: () => {
					dispatch(deleteTask(taskId));
					router.back();
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
	return (
		<Container variant="keyboard" paddingVertical={Spacing.lg}>
			<Stack.Screen
				options={{
					title: `${title}`,
				}}
			/>
			<View>
				<Input
					placeholder="Enter Title for Task"
					border={false}
					style={{ fontSize: 30, fontFamily: 'Rubik-Bold' }}
					maxLength={50}
					numberOfLines={2}
					onChangeText={(t) => updateForm('title', t)}
					value={form.title}
					autoCapitalize="words"
					returnKeyType="done"
					returnKeyLabel="Done"
					enterKeyHint="done"
				/>
			</View>
			<View direction="row" alignItems="center" justifyContent="space-between" gap="md" marginTop={Spacing.md}>
				<Text variant="label">Priority</Text>
				<Select
					border={false}
					items={PriorityOptions}
					placeholder="Choose Priority for Task"
					onChange={(v) => updateForm('priority', v)}
					value={form.priority}
					renderItem={(item) => {
						const priorityIcon = getPriorityIcon(item.value as Priority);
						return (
							<View direction="row" alignItems="center" gap="sm">
								<Icon name={priorityIcon[0]} color={priorityIcon[1]} colorVariant="base" size="xl" />
								<Text>{item.label}</Text>
							</View>
						);
					}}
					renderSelected={(item) => {
						const priorityIcon = getPriorityIcon(item.value as Priority);
						return (
							<View direction="row" alignItems="center" gap="sm">
								<Text>{item.label}</Text>
								<Icon name={priorityIcon[0]} color={priorityIcon[1]} colorVariant="base" size="xl" />
							</View>
						);
					}}
				/>
			</View>
			<View direction="row" alignItems="center" justifyContent="space-between" gap="md" marginTop={Spacing.md}>
				<Text variant="label">Due Date (Optional)</Text>
				<DatePicker border={false} value={form.dueDate} onChange={(d) => updateForm('dueDate', d)} />
			</View>
			<View
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				gap="md"
				marginTop={Spacing.md}
				marginBottom={Spacing.xl}
			>
				<Text variant="label">Status</Text>
				<Select
					border={false}
					items={StatusOptions}
					placeholder="Choose Status of Task"
					onChange={(v) => updateForm('status', v)}
					value={form.status}
					renderItem={(item) => {
						const statusIcon = getStatusIcon(item.value as Status);
						return (
							<View direction="row" alignItems="center" gap="sm">
								<Icon name={statusIcon[0]} color={statusIcon[1]} colorVariant="base" size="xl" />
								<Text>{item.label}</Text>
							</View>
						);
					}}
					renderSelected={(item) => {
						const statusIcon = getStatusIcon(item.value as Status);
						return (
							<View direction="row" alignItems="center" gap="sm">
								<Text>{item.label}</Text>
								<Icon name={statusIcon[0]} color={statusIcon[1]} colorVariant="base" size="xl" />
							</View>
						);
					}}
				/>
			</View>
			<Button buttonColor="primary" onPress={handleSubmit} style={{ marginBottom: Spacing.md }}>
				{isEditMode ? 'Update Task' : 'Save'}
			</Button>
			{isEditMode && (
				<Button buttonColor="error" buttonVariant="subtle" onPress={handleDelete}>
					Delete Task
				</Button>
			)}
		</Container>
	);
};

export default AddTask;
