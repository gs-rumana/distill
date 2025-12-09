import { ScrollView, Switch, Alert } from 'react-native';
import Container from '../components/container';
import Text from '../components/text';
import View from '../components/view';
import { Button } from '../components/button';
import { Spacing } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';
import useAppSelector from '../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { changeSettings } from '../redux/slices/main';
import { useState } from 'react';
import BottomSheet from '../components/bottom-sheet';
import Input from '../components/input/input';

const DURATIONS = [15, 25, 45, 55];

const Settings = () => {
	const { backgrounds } = useTheme();

	const dispatch = useDispatch();

	const { timeDuration, autoStartTimer, dateFormat } = useAppSelector((state) => state.main);

	const [showCustomModal, setShowCustomModal] = useState(false);
	const [customDuration, setCustomDuration] = useState('');

	const changeTimeDuration = (time: number) => dispatch(changeSettings({ timeDuration: time }));
	const changeAutoStart = () => {
		dispatch(changeSettings({ autoStartTimer: !autoStartTimer }));
	};
	const changeDateFormat = (format: 'normal' | 'relative') => {
		dispatch(changeSettings({ dateFormat: format }));
	};

	const handleOpenCustomModal = () => {
		setCustomDuration(timeDuration.toString());
		setShowCustomModal(true);
	};

	const handleSaveCustomDuration = () => {
		const duration = parseInt(customDuration, 10);

		if (isNaN(duration) || customDuration.trim() === '') {
			Alert.alert('Invalid Input', 'Please enter a valid number');
			return;
		}

		if (duration < 1) {
			Alert.alert('Invalid Duration', 'Duration must be at least 1 minute');
			return;
		}

		if (duration > 120) {
			Alert.alert('Invalid Duration', 'Duration cannot exceed 120 minutes');
			return;
		}

		changeTimeDuration(duration);
		setShowCustomModal(false);
		setCustomDuration('');
	};

	const handleCancelCustomDuration = () => {
		setShowCustomModal(false);
		setCustomDuration('');
	};
	return (
		<Container>
			<View>
				<Text variant="body-lg" fontWeight="medium">
					Timer Settings
				</Text>
				<View background="body" bgVariant="subtle" radius="lg" padding="lg" gap="2xl">
					<View gap="sm">
						<Text>Default Pomodoro Duration</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{
								gap: Spacing.lg,
								paddingHorizontal: Spacing.md,
								marginTop: Spacing.sm,
							}}
							fadingEdgeLength={10}
						>
							{DURATIONS.map((duration) => (
								<Button
									style={{ paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs }}
									key={duration}
									buttonColor="secondary"
									buttonVariant={timeDuration === duration ? 'base' : 'subtle'}
									onPress={() => changeTimeDuration(duration)}
								>
									{duration}
								</Button>
							))}
							<Button
								style={{ paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs }}
								buttonColor="secondary"
								buttonVariant={!DURATIONS.includes(timeDuration) ? 'base' : 'subtle'}
								onPress={handleOpenCustomModal}
							>
								{!DURATIONS.includes(timeDuration) ? timeDuration : '+ Custom'}
							</Button>
						</ScrollView>
					</View>
					<View direction="row" alignItems="center" justifyContent="space-between" gap="sm">
						<Text>Auto Start Timer</Text>
						<Switch
							value={autoStartTimer}
							onChange={() => changeAutoStart()}
							thumbColor={backgrounds.body.base}
							trackColor={{ false: backgrounds.secondary.base, true: backgrounds.primary.base }}
						/>
					</View>
					<View gap="sm">
						<Text>Date Format</Text>
						<View direction="row" alignItems="center" gap="md">
							<Button
								style={{ flex: 1, paddingVertical: Spacing.xs }}
								buttonColor="secondary"
								buttonVariant={dateFormat === 'normal' ? 'base' : 'subtle'}
								onPress={() => changeDateFormat('normal')}
							>
								Normal
							</Button>
							<Button
								style={{ flex: 1, paddingVertical: Spacing.xs }}
								buttonColor="secondary"
								buttonVariant={dateFormat === 'relative' ? 'base' : 'subtle'}
								onPress={() => changeDateFormat('relative')}
							>
								Relative
							</Button>
						</View>
					</View>
				</View>
			</View>
			{/*<View marginTop={Spacing.lg}>
				<Text variant="body-lg" fontWeight="medium">App Settings</Text>
				<View background="body" bgVariant="subtle" radius="lg" padding="lg" gap="2xl">
					<View gap="sm">
						<Text>Default App Page</Text>
						<View direction="row" alignItems="center" justifyContent="space-around" gap="md">
							{Object.entries(PAGES).map(([key, page]) => (
								<Button style={{paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, flex: 1}} key={key} buttonColor="secondary" buttonVariant={defaultAppPage === key ? 'base' : 'subtle'} onPress={() => changeDefaultPage(key)}>{page}</Button>
							))}
						</View>
					</View>
				</View>
			</View>*/}
			<BottomSheet visible={showCustomModal} onClose={handleCancelCustomDuration} height="auto">
				<View gap="md" flex={1}>
					<Text variant="h5" fontWeight="semibold">
						Custom Duration
					</Text>
					<View gap="sm">
						<Text>Enter duration in minutes (1-120)</Text>
						<Input
							value={customDuration}
							onChangeText={setCustomDuration}
							keyboardType="numeric"
							maxLength={3}
							placeholder="Enter minutes"
							autoFocus
						/>
					</View>
					<View gap="md" marginTop={Spacing.lg} marginBottom={Spacing.xl}>
						<Button buttonColor="primary" onPress={handleSaveCustomDuration}>
							Save
						</Button>
						<Button buttonColor="secondary" onPress={handleCancelCustomDuration}>
							Cancel
						</Button>
					</View>
				</View>
			</BottomSheet>
		</Container>
	);
};

export default Settings;
