import notifee, { AndroidImportance, TriggerType, TimeUnit } from '@notifee/react-native';

export class NotificationService {
  static async requestPermissions() {
    await notifee.requestPermission();
  }

  static async scheduleTimerCompletion(endTimeMillis: number, title: string, duration: number, taskId?: string) {
    const channelId = await notifee.createChannel({
      id: 'timer_channel',
      name: 'Timer Notifications',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });

    try {
      await notifee.createTriggerNotification(
        {
          id: 'timer_complete',
          title: 'Timer Completed',
          body: `Did you complete '${title}'?`,
          data: { taskId: taskId || '', duration, title },
          android: {
            channelId,
            pressAction: {
              id: 'default',
            },
            actions: [
              {
                title: 'Yes',
                pressAction: { id: 'complete' },
              },
              {
                title: 'No, Restart',
                pressAction: { id: 'restart' },
              },
            ],
          },
          ios: {
            sound: 'default',
            categoryId: 'timer-actions',
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp: endTimeMillis,
        }
      );

			await notifee.setNotificationCategories([
        {
          id: 'timer-actions',
          actions: [
            {
              id: 'complete',
              title: 'Yes',
              foreground: true,
            },
            {
              id: 'restart',
              title: 'No, Restart',
              foreground: true,
            },
          ],
        },
      ]);
    } catch (e) {
      console.error('Failed to schedule notification:', e);
    }
  }

  static async cancelTimerNotification() {
    await notifee.cancelNotification('timer_complete');
  }
}
