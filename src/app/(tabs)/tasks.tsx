import { FlatList, ScrollView, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import Container from '../../components/container';
import Text from '../../components/text';
import { Spacing, vh } from '../../constants/theme';
import { Button } from '../../components/button';
import Icon from '../../components/icon';
import { useLocalSearchParams, router } from 'expo-router';
import useAppSelector from '../../hooks/useAppSelector';
import View from '../../components/view';
import { useState } from 'react';
import TaskItem from '../../components/task-item';
import SortBottomSheet from '../../components/sort-bottom-sheet';
import { SortConfig } from '../../typings/data';

const Filters = {
	all: 'All',
	overdue: 'Overdue',
	today: 'Today',
	upcoming: 'Upcoming',
	noduedate: 'No Due Date',
};

const Tasks = () => {
	const [sortSheetVisible, setSortSheetVisible] = useState(false);
	const { tasks, sortConfig } = useAppSelector((s) => s.main);

	const defaultSortConfig: SortConfig = { field: 'priority', order: 'desc' };

	const currentSortConfig = sortConfig || defaultSortConfig;

	const searchParams = useLocalSearchParams();

	let filter = searchParams.filter || ('all' as string | undefined);
	let filteredTasks = tasks.filter((t) => {
		if (filter === 'overdue') {
			return t.dueDate && dayjs(t.dueDate).isBefore(dayjs(), 'day');
		} else if (filter === 'today') {
			return t.dueDate && dayjs(t.dueDate).isSame(dayjs(), 'day');
		} else if (filter === 'upcoming') {
			return t.dueDate && dayjs(t.dueDate).isAfter(dayjs(), 'day');
		} else if (filter === 'noduedate') {
			return !t.dueDate;
		}
		return true;
	});

	filteredTasks = filteredTasks.sort((a, b) => {
		let aValue: any;
		let bValue: any;

		switch (currentSortConfig.field) {
			case 'priority':
				aValue = a.priority;
				bValue = b.priority;
				break;
			case 'status':
				aValue = a.status;
				bValue = b.status;
				break;
			case 'dueDate':
				if (!a.dueDate && !b.dueDate) return 0;
				if (!a.dueDate) return 1;
				if (!b.dueDate) return -1;
				aValue = new Date(a.dueDate).getTime();
				bValue = new Date(b.dueDate).getTime();
				break;
			case 'createdAt':
				aValue = new Date(a.createdAt).getTime();
				bValue = new Date(b.createdAt).getTime();
				break;
		}

		const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
		return currentSortConfig.order === 'asc' ? comparison : -comparison;
	});
	return (
		<Container safeTop>
			<View direction="row" alignItems="center" justifyContent="space-between" gap="md">
				<Text variant="h4">Tasks</Text>
				<Button padding="xs" onPress={() => setSortSheetVisible(true)}>
					<Icon name="list" size="2xl" />
				</Button>
			</View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.scrollview}
				contentContainerStyle={{ gap: Spacing.sm }}
			>
				{Object.entries(Filters).map(([v, k]) => (
					<Button
						key={v}
						buttonVariant={filter === v ? 'base' : 'subtle'}
						buttonColor="primary"
						radius="full"
						onPress={() => router.navigate('/tasks?filter=' + v)}
						style={styles.filterButton}
					>
						{k}
					</Button>
				))}
			</ScrollView>
			{/*<Button onPress={() => dispatch(clearAllTasks())}>Clear All</Button>*/}

			<FlatList
				data={filteredTasks}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <TaskItem {...item} />}
				contentContainerStyle={{ gap: Spacing.md }}
				ListEmptyComponent={
					<View style={{ height: vh / 2 }} alignItems="center" justifyContent="center">
						<Text colorVariant="base" variant="h5">
							No Tasks Found
						</Text>
					</View>
				}
			/>

			<Button style={styles.fab} buttonColor="primary" padding="lg" onPress={() => router.navigate('/add-task')}>
				<Icon name="add" size="xl" color="primary" colorVariant="on" />
			</Button>

			<SortBottomSheet visible={sortSheetVisible} onClose={() => setSortSheetVisible(false)} />
		</Container>
	);
};

export default Tasks;

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		bottom: Spacing['3xl'],
		right: Spacing['2xl'],
	},
	scrollview: { marginVertical: Spacing.md, flexGrow: 0 },
	filterButton: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs },
});
