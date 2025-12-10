import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { NotificationService } from '../services/notification-service';

interface UseTimerOptions {
	interval?: number; // ms, default 1000
	autoStart?: boolean;
	onFinish?: () => void;
	onFirstStart?: () => void;
	title?: string;
	taskId?: string;
}

export function useTimer(initialSeconds: number, options: UseTimerOptions = {}) {
	const { interval = 1000, autoStart = false, onFinish, onFirstStart, title = 'Working Session', taskId } = options;

	const [seconds, setSeconds] = useState(initialSeconds);
	const [isRunning, setIsRunning] = useState(autoStart);
	const [hasBeenStarted, setHasBeenStarted] = useState(autoStart);

	const endTimeRef = useRef<number | null>(null);
	const pausedAtRef = useRef<number | null>(null);

	const onFinishRef = useRef(onFinish);
	const onFirstStartRef = useRef(onFirstStart);

	useEffect(() => {
		onFinishRef.current = onFinish;
		onFirstStartRef.current = onFirstStart;
	}, [onFinish, onFirstStart]);

	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const getRemainingSeconds = () => {
		if (endTimeRef.current === null) return 0;
		const now = Date.now();
		const remaining = Math.ceil((endTimeRef.current - now) / 1000);
		return remaining > 0 ? remaining : 0;
	};

	const start = useCallback(() => {
		if (isRunning) return;

		let targetEndTime: number;

		const now = Date.now();
		
		if (!hasBeenStarted) {
			setHasBeenStarted(true);
			targetEndTime = now + (initialSeconds * 1000);
			if (onFirstStartRef.current) {
				onFirstStartRef.current();
			}
		} else {
            targetEndTime = now + (seconds * 1000);
		}

		endTimeRef.current = targetEndTime;
		setIsRunning(true);

		NotificationService.scheduleTimerCompletion(targetEndTime, title, initialSeconds, taskId);

	}, [hasBeenStarted, isRunning, initialSeconds, seconds, title, taskId]);

	const pause = useCallback(() => {
		if (!isRunning) return;

		setIsRunning(false);

		NotificationService.cancelTimerNotification();

		const remaining = getRemainingSeconds();
		setSeconds(remaining);

		endTimeRef.current = null;

	}, [isRunning]);

	const reset = useCallback(() => {
		setIsRunning(autoStart);
		setHasBeenStarted(autoStart);
		setSeconds(initialSeconds);
		endTimeRef.current = null;
		NotificationService.cancelTimerNotification();

		if (autoStart) {
             const now = Date.now();
             const targetEndTime = now + (initialSeconds * 1000);
             endTimeRef.current = targetEndTime;
             NotificationService.scheduleTimerCompletion(targetEndTime, title, initialSeconds, taskId);
		}

	}, [initialSeconds, autoStart, title, taskId]);

    const restart = useCallback(() => {
        const now = Date.now();
        const targetEndTime = now + (initialSeconds * 1000);
        endTimeRef.current = targetEndTime;

        setIsRunning(true);
        setHasBeenStarted(true);
        setSeconds(initialSeconds);
        
        NotificationService.scheduleTimerCompletion(targetEndTime, title, initialSeconds, taskId);
    }, [initialSeconds, title, taskId]);

	useEffect(() => {
		if (autoStart && !hasBeenStarted) {
			start();
		}
	}, []);


	// 2. The Tick Logic
	useEffect(() => {
		if (!isRunning) {
			return;
		}

		intervalRef.current = setInterval(() => {
			const remaining = getRemainingSeconds();
			setSeconds(remaining);
			
			if (remaining <= 0) {
				setIsRunning(false);
				endTimeRef.current = null;
				if (onFinishRef.current) {
					onFinishRef.current();
				}
			}
		}, interval);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isRunning, interval]);

	// 3. AppState Handling (Background/Foreground)
	useEffect(() => {
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			if (nextAppState === 'active' && isRunning) {
				const remaining = getRemainingSeconds();
				setSeconds(remaining);
                
                if (remaining <= 0) {
                    setIsRunning(false);
                    endTimeRef.current = null;
                    if (onFinishRef.current) onFinishRef.current();
                }
			}
		};

		const subscription = AppState.addEventListener('change', handleAppStateChange);

		return () => {
			subscription.remove();
		};
	}, [isRunning]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	const hasStarted = hasBeenStarted;
	const hasCompleted = seconds === 0 && !isRunning && hasStarted;

	return {
		seconds,
		isRunning,
		start,
		pause,
		reset,
		restart,
		hasStarted,
		hasCompleted,
	};
}

export default useTimer;
