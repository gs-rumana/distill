import { Image, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { PieChart } from 'react-native-gifted-charts';
import useAppSelector from '../../hooks/useAppSelector';
import Container from '../../components/container';
import Text from '../../components/text';
import View from '../../components/view';
import { useSelector } from 'react-redux';
import { todayTopTasks, todayCompletedTasks } from '../../redux/slices/main';
import TaskItem from '../../components/task-item';
import { Radius, Spacing } from '../../constants/theme';
import { Button } from '../../components/button';
import Icon from '../../components/icon';
import { useTheme } from '../../hooks/useTheme';
import { router } from 'expo-router';

const Home = () => {
	const { date, tasks } = useAppSelector((s) => s.main);
	const { textColors, backgrounds } = useTheme();

	const topTasks = useSelector(todayTopTasks);
	const completedTasks = useSelector(todayCompletedTasks);

	// Calculate completion rate
	const totalTasks = tasks.length;
	const completed = tasks.filter((t) => t.status === 3).length;
	const inProgress = tasks.filter((t) => t.status === 2).length;
	const toDo = tasks.filter((t) => t.status === 1).length;

	const pieData = [
		{ value: completed, color: textColors.success.base, text: completed.toString() },
		{ value: inProgress, color: textColors.primary.base, text: inProgress.toString() },
		{ value: toDo, color: textColors.secondary.base, text: toDo.toString() },
	];

	const renderLegend = (text: string, color: string, value: number) => (
		<View direction="row" alignItems="center" justifyContent="space-between" marginBottom={Spacing.sm}>
			<View direction="row" alignItems="center" gap="xs">
				<View style={[styles.legendDot, { backgroundColor: color }]} />
				<Text colorVariant="base">{text}</Text>
			</View>
			<Text variant="h5" color="primary" colorVariant="base">
				{value}
			</Text>
		</View>
	);
	return (
		<Container variant="scrollview" safeTop>
			<View direction="row" alignItems="center" gap="sm" marginBottom={Spacing.lg}>
				<Image source={require('../../../assets/icon.png')} style={styles.logo} />
				<Text variant="h4">Distilll</Text>
				<Button padding="xs" style={{ marginLeft: 'auto' }} onPress={() => router.push('/settings')}>
					<Icon name="cog" size="2xl" />
				</Button>
			</View>
			<View
				direction="row"
				alignItems="center"
				justifyContent="center"
				gap="sm"
				background="body"
				bgVariant="subtle"
				padding="md"
				radius="lg"
				marginBottom={Spacing.lg}
			>
				<Text>Today:</Text>
				<Text variant="h5" fontWeight="bold" color="primary" colorVariant="base">
					{dayjs(date).format('D MMM YYYY')}
				</Text>
			</View>

			<View direction="row" alignItems="center" justifyContent="space-between" gap="md" marginBottom={Spacing.sm}>
				<Text variant="h5">Top Tasks for Today</Text>
			</View>
			<View gap="md" marginBottom={Spacing['2xl']}>
				{topTasks.length > 0 ? (
					topTasks.map((task, index) => <TaskItem {...task} key={index} />)
				) : (
					<View background="body" bgVariant="subtle" padding="lg" radius="lg" alignItems="center">
						<Text colorVariant="base">No pending tasks for today</Text>
					</View>
				)}
			</View>

			<View direction="row" alignItems="center" justifyContent="space-between" gap="md" marginBottom={Spacing.sm}>
				<Text variant="h5">Completed Today</Text>
			</View>
			<View gap="md" marginBottom={Spacing.lg}>
				{completedTasks.length > 0 ? (
					completedTasks.map((task, index) => <TaskItem {...task} key={index} />)
				) : (
					<View background="body" bgVariant="subtle" padding="lg" radius="lg" alignItems="center">
						<Text colorVariant="base">No tasks completed today</Text>
					</View>
				)}
			</View>

			{totalTasks > 0 && (
				<>
					<Text variant="h5" style={{ marginBottom: Spacing.sm }}>
						Progress Overview
					</Text>
					<View bgVariant="subtle" background="body" padding="md" radius="lg" marginBottom={Spacing.lg}>
						<View alignItems="center">
							<PieChart
								data={pieData}
								donut
								radius={80}
								innerRadius={55}
								backgroundColor={backgrounds.body.subtle}
								centerLabelComponent={() => (
									<View alignItems="center">
										<Text variant="h3" color="primary" colorVariant="base">
											{totalTasks}
										</Text>
										<Text colorVariant="base" variant="sm">
											Total
										</Text>
									</View>
								)}
							/>
						</View>
						<View marginTop={Spacing.lg}>
							{renderLegend('Completed', textColors.success.base, completed)}
							{renderLegend('In Progress', textColors.primary.base, inProgress)}
							{renderLegend('To Do', textColors.secondary.base, toDo)}
						</View>
					</View>
				</>
			)}
		</Container>
	);
};

export default Home;

const styles = StyleSheet.create({
	logo: { width: 50, height: 50 },
	chart: {
		marginVertical: 8,
		borderRadius: Radius.lg,
	},
	legendDot: {
		width: 12,
		height: 12,
		borderRadius: Radius.md,
	},
});
