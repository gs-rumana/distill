import { Circle } from 'react-native-progress';
import { StatusBar } from 'expo-status-bar';
import { Button } from '../components/button';
import Container from '../components/container';
import Icon from '../components/icon';
import Text from '../components/text';
import { Spacing, vw } from '../constants/theme';
import View from '../components/view';
import { useEffect, useMemo, useCallback } from 'react';
import useTimer from '../hooks/useTimer';
import { useTheme } from '../hooks/useTheme';
import { Alert, BackHandler, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getRandomStartMessage, getRandomCompletedMessage } from '../constants/messages';
import { useDispatch } from 'react-redux';
import { editTask, startSession } from '../redux/slices/main';
import { Task } from '../typings/data';
import useAppSelector from '../hooks/useAppSelector';
import notifee, { EventType } from '@notifee/react-native';
import { NotificationService } from '../services/notification-service';

const WorkingSession = () => {
	const { textColors } = useTheme();
	const { timeDuration, autoStartTimer } = useAppSelector((state) => state.main);
	const params = useLocalSearchParams();
	const dispatch = useDispatch();

	const task: Task | null = params.task ? JSON.parse(params.task as string) : null;

	const timerDurationSeconds = timeDuration * 60;

	const { isRunning, pause, reset, seconds, start, hasCompleted, hasStarted, restart } = useTimer(timerDurationSeconds, {
		autoStart: autoStartTimer,
		onFirstStart: () => {
			if (task) {
				dispatch(startSession({ taskId: task.id, duration: timeDuration }));
			}
		},
		title: task?.title || 'Distill Session',
		taskId: task?.id,
	});

	useEffect(() => {
		NotificationService.requestPermissions();
	}, []);

	const timeToShow = `${Math.floor(seconds / 60)
		.toString()
		.padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

	const message = useMemo(() => getRandomStartMessage(), []);
	const completedMessage = useMemo(() => getRandomCompletedMessage(), [hasCompleted]);

	const onExit = () => {
		if (!hasStarted || hasCompleted) {
			router.back();
		} else {
			Alert.alert('Exit Session', 'Are you sure you want to exit the session? Your progress will be lost.', [
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Exit',
					style: 'destructive',
					onPress: () => {
						router.back();
					},
				},
			]);
		}
	};
	const handleReset = () => {
		Alert.alert('Reset Session', 'Are you sure you want to reset the timer?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Reset',
				style: 'destructive',
				onPress: reset,
			},
		]);
	};
	const handleCompleted = useCallback(() => {
		if (task) {
			dispatch(editTask({ id: task.id, status: 3 }));
		}
		router.back();
	}, [task, dispatch]);

	useEffect(() => {
		const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
			onExit();
			return true;
		});

		return () => subscription.remove();
	}, [onExit]);
	useEffect(() => {
		const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
			if (type === EventType.ACTION_PRESS && detail.pressAction?.id) {
				if (detail.pressAction.id === 'complete') {
					handleCompleted();
				} else if (detail.pressAction.id === 'restart') {
					restart();
				}
			}
		});
		return unsubscribe;
	}, [handleCompleted, restart]);

	return (
		<Container safeTop>
			{/* <StatusBar hidden animated hideTransitionAnimation='slide' /> */}
			<View flex={1}>
				<Button
					padding="md"
					style={{ alignSelf: 'flex-start', marginTop: Spacing.md }}
					buttonColor="error"
					onPress={onExit}
				>
					<Icon name="exit-outline" size="xl" color="error" colorVariant="on" />
					<Text variant="body-lg" fontWeight="semibold" color="error" colorVariant="on">
						Exit
					</Text>
				</Button>

				{/* <Text align="center" variant="body-lg" fontWeight="medium">Original Object of Attention</Text> */}
				<Text align="center" variant="h3" style={{ marginTop: Spacing.lg }} numberOfLines={2}>
					{task?.title}
				</Text>

				<View marginTop={Spacing['3xl']} marginBottom={'auto'} style={{ paddingBottom: Spacing['3xl'] }}>
					<View alignItems="center" justifyContent="center" style={{ position: 'relative' }}>
						<Circle
							progress={hasStarted ? 1 - seconds / timerDurationSeconds : 0}
							strokeCap="round"
							size={vw * 0.8}
							thickness={6}
							color={textColors.primary.base}
						/>
						<View style={{ position: 'absolute' }} marginTop={Spacing.md} alignItems="center">
							<Text style={styles.timerText}>{timeToShow}</Text>
							<Text align="center">Minutes</Text>
						</View>
					</View>

					{(!hasStarted || hasCompleted) && (
						<Text
							align="center"
							color={hasCompleted ? 'success' : 'body'}
							variant={hasCompleted ? 'h5' : 'body-lg'}
							style={styles.messageText}
							fontWeight="semibold"
						>
							{!hasStarted
								? message.replace('%time%', timeDuration.toString())
								: hasCompleted
									? completedMessage
									: null}
						</Text>
					)}

					<View alignItems="center" justifyContent="center" gap="md" marginTop={Spacing['3xl']}>
						{!hasCompleted && (
							<Button
								buttonColor={isRunning ? 'secondary' : 'success'}
								onPress={() => (isRunning ? pause() : start())}
								style={styles.button}
							>
								{isRunning ? 'Pause' : hasStarted && !hasCompleted ? 'Resume' : 'Start'}
							</Button>
						)}
						{hasStarted && !hasCompleted && (
							<Button buttonColor="error" onPress={handleReset} style={styles.button}>
								Reset
							</Button>
						)}
					</View>

					{hasCompleted && (
						<View alignItems="center" justifyContent="center" gap="md" marginTop={Spacing['3xl']}>
							<Text variant="h5">Did you complete your task?</Text>
							<View direction="row" alignItems="center" gap="md">
								<Button buttonColor="success" onPress={handleCompleted} style={{ flex: 1 }}>
									Yes
								</Button>
								<Button buttonColor="secondary" onPress={reset} style={{ flex: 1 }}>
									No, Reset The Timer
								</Button>
							</View>
						</View>
					)}
				</View>
			</View>
		</Container>
	);
};

export default WorkingSession;

const styles = StyleSheet.create({
	timerText: { fontSize: 30, textAlign: 'center', fontFamily: 'Rubik-Regular' },
	messageText: { width: '80%', alignSelf: 'center', marginTop: Spacing.lg },
	button: {
		width: '50%',
	},
});
