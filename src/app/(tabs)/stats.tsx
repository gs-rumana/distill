import { Dimensions, StyleSheet } from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-gifted-charts';
import Container from '../../components/container';
import Text from '../../components/text';
import View from '../../components/view';
import useAppSelector from '../../hooks/useAppSelector';
import { useTheme } from '../../hooks/useTheme';
import { Radius, Spacing, vw } from '../../constants/theme';
import dayjs from 'dayjs';

const Stats = () => {
	const { tasks } = useAppSelector((s) => s.main);
	const { textColors, backgrounds } = useTheme();

	// Task status breakdown
	const toDo = tasks.filter((t) => t.status === 1).length;
	const inProgress = tasks.filter((t) => t.status === 2).length;
	const completed = tasks.filter((t) => t.status === 3).length;

	// Priority breakdown
	const highPriority = tasks.filter((t) => t.priority === 3).length;
	const mediumPriority = tasks.filter((t) => t.priority === 2).length;
	const lowPriority = tasks.filter((t) => t.priority === 1).length;

	// Tasks completed over last 7 days
	const last7Days = Array.from({ length: 7 }, (_, i) => {
		const date = dayjs().subtract(6 - i, 'day');
		return {
			label: date.format('ddd'),
			value: tasks.filter((t) => t.status === 3 && dayjs(t.createdAt).isSame(date, 'day')).length,
		};
	});

	const pieData = [
		{ value: toDo, color: textColors.secondary.base, text: toDo.toString() },
		{ value: inProgress, color: textColors.primary.base, text: inProgress.toString() },
		{ value: completed, color: textColors.success.base, text: completed.toString() },
	];

	const barData = [
		{ value: highPriority, label: 'High', frontColor: backgrounds.error.base },
		{ value: mediumPriority, label: 'Med', frontColor: backgrounds.warning.base },
		{ value: lowPriority, label: 'Low', frontColor: backgrounds.success.base },
	];

	const lineData = last7Days;

	const renderLegend = (text: string, color: string) => (
		<View direction="row" alignItems="center" gap="xs" marginBottom={Spacing.sm}>
			<View style={[styles.legendDot, { backgroundColor: color }]} />
			<Text colorVariant="base">{text}</Text>
		</View>
	);

	return (
		<Container variant="scrollview" safeTop>
			<Text variant="h4" style={{ marginBottom: Spacing.lg }}>
				Overview
			</Text>

			<Text variant="h5">Task Status</Text>
			<View
				bgVariant="subtle"
				background="body"
				padding="md"
				radius="lg"
				marginTop={Spacing.sm}
				marginBottom={Spacing.lg}
			>
				{tasks.length > 0 ? (
					<View alignItems="center">
						<PieChart
							data={pieData}
							donut
							radius={90}
							innerRadius={60}
							backgroundColor={backgrounds.body.subtle}
							centerLabelComponent={() => (
								<Text variant="h3" color="primary" colorVariant="base">
									{tasks.length}
								</Text>
							)}
						/>
						<View marginTop={Spacing.lg} style={{ width: '100%' }}>
							{renderLegend('To Do', textColors.secondary.base)}
							{renderLegend('In Progress', textColors.primary.base)}
							{renderLegend('Completed', textColors.success.base)}
						</View>
					</View>
				) : (
					<Text colorVariant="base" align="center">
						No tasks yet
					</Text>
				)}
			</View>

			<Text variant="h5">Priority Distribution</Text>
			<View
				bgVariant="subtle"
				background="body"
				padding="md"
				radius="lg"
				marginTop={Spacing.sm}
				marginBottom={Spacing.lg}
			>
				{tasks.length > 0 ? (
					<View alignItems="center">
						<BarChart
							data={barData}
							barWidth={vw / 7}
							height={220}
							yAxisThickness={0}
							xAxisThickness={0}
							noOfSections={4}
							barBorderRadius={4}
							hideRules
							yAxisTextStyle={{ color: textColors.body.base }}
							xAxisLabelTextStyle={{ color: textColors.body.base, fontSize: 12 }}
						/>
					</View>
				) : (
					<Text colorVariant="base" align="center">
						No tasks yet
					</Text>
				)}
			</View>

			<Text variant="h5">Last 7 Days (Completed)</Text>
			<View
				bgVariant="subtle"
				background="body"
				padding="md"
				radius="lg"
				marginTop={Spacing.sm}
				marginBottom={Spacing.lg}
			>
				<View alignItems="center">
					<LineChart
						data={lineData}
						// height={220}
						// width={screenWidth - 80}
						// curved
						thickness={3}
						color={textColors.primary.base}
						hideDataPoints={false}
						dataPointsColor={textColors.primary.emphasis}
						dataPointsRadius={4}
						yAxisThickness={0}
						xAxisThickness={0}
						hideRules
						yAxisTextStyle={{ color: textColors.body.base }}
						xAxisLabelTextStyle={{ color: textColors.body.base, fontSize: 10 }}
					/>
				</View>
			</View>

			<View direction="row" gap="md" style={{ marginBottom: Spacing.lg }}>
				<View flex={1} bgVariant="subtle" background="body" padding="md" radius="lg" alignItems="center">
					<Text variant="h3" color="primary" colorVariant="base">
						{tasks.length}
					</Text>
					<Text colorVariant="base">Total Tasks</Text>
				</View>
				<View flex={1} bgVariant="subtle" background="body" padding="md" radius="lg" alignItems="center">
					<Text variant="h3" color="success" colorVariant="base">
						{completed}
					</Text>
					<Text colorVariant="base">Completed</Text>
				</View>
			</View>

			<View direction="row" gap="md" style={{ marginBottom: Spacing.lg }}>
				<View flex={1} bgVariant="subtle" background="body" padding="md" radius="lg" alignItems="center">
					<Text variant="h3" color="warning" colorVariant="base">
						{inProgress}
					</Text>
					<Text colorVariant="base">In Progress</Text>
				</View>
				<View flex={1} bgVariant="subtle" background="body" padding="md" radius="lg" alignItems="center">
					<Text variant="h3" color="error" colorVariant="base">
						{highPriority}
					</Text>
					<Text colorVariant="base">High Priority</Text>
				</View>
			</View>
		</Container>
	);
};

export default Stats;

const styles = StyleSheet.create({
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
