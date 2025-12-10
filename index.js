import 'react-native-get-random-values';
import 'expo-router/entry';
import notifee, { EventType } from '@notifee/react-native';
import store from './src/redux';
import { editTask } from './src/redux/slices/main';
import { NotificationService } from './src/services/notification-service';
import { router } from 'expo-router';

notifee.onBackgroundEvent(async ({ type, detail }) => {
	const { notification, pressAction } = detail;

	if (type === EventType.ACTION_PRESS && pressAction.id === 'complete') {
		const taskId = notification.data?.taskId;
		if (taskId) {
			// Helper to wait for rehydration
			const waitForRehydration = () => {
				return new Promise((resolve) => {
					const check = () => {
						//  @ts-ignore
						if (store.getState()._persist?.rehydrated) {
							resolve();
						} else {
							setTimeout(check, 100);
						}
					};
					check();
				});
			};

			// Wait for store to be ready
			await waitForRehydration();

			store.dispatch(editTask({ id: taskId, status: 3 }));

			router.canGoBack() && router.back();

			// Remove the notification
			await notifee.cancelNotification(notification.id);
		}
	} else if (type === EventType.ACTION_PRESS && pressAction.id === 'restart') {
		const { duration, title, taskId } = notification.data || {};

		// Cancel the current notification first to avoid cancelling the new one which shares the ID
		await notifee.cancelNotification(notification.id);

		if (duration) {
			const now = Date.now();
			const targetEndTime = now + duration * 1000;

			await NotificationService.scheduleTimerCompletion(
				targetEndTime,
				title || 'Working Session',
				duration,
				taskId
			);
		}
	}
});
