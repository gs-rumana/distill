import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTimerOptions {
	interval?: number; // ms, default 1000
	autoStart?: boolean;
	onFinish?: () => void;
	onFirstStart?: () => void;
}

export function useTimer(initialSeconds: number, options: UseTimerOptions = {}) {
	const { interval = 1000, autoStart = false, onFinish, onFirstStart } = options;

	const [seconds, setSeconds] = useState(initialSeconds);
	const [isRunning, setIsRunning] = useState(autoStart);
	const [hasBeenStarted, setHasBeenStarted] = useState(autoStart);

	// 1. Keep refs for callbacks so they don't trigger re-renders or resets
	// even if the parent passes a new function on every render.
	const onFinishRef = useRef(onFinish);
	const onFirstStartRef = useRef(onFirstStart);

	// Update refs whenever the passed options change
	useEffect(() => {
		onFinishRef.current = onFinish;
		onFirstStartRef.current = onFirstStart;
	}, [onFinish, onFirstStart]);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const start = useCallback(() => {
		// Check if it's the very first start
		if (!hasBeenStarted) {
			setHasBeenStarted(true);
			if (onFirstStartRef.current) {
				onFirstStartRef.current();
			}
		}
		setIsRunning(true);
	}, [hasBeenStarted]);

	const pause = useCallback(() => {
		setIsRunning(false);
	}, []);

	const reset = useCallback(() => {
		setIsRunning(autoStart);
		setHasBeenStarted(autoStart);
		setSeconds(initialSeconds);
	}, [initialSeconds, autoStart]);

	// 2. The Tick Logic
	// This effect is purely responsible for the interval
	useEffect(() => {
		if (!isRunning) {
			return;
		}

		intervalRef.current = setInterval(() => {
			setSeconds((prev) => {
				// Just return the math here, no side effects!
				// We prevent it from going below 0 here for visual consistency
				return prev > 0 ? prev - 1 : 0;
			});
		}, interval);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isRunning, interval]);

	// 3. The Monitor Logic
	// This effect watches 'seconds' and handles stopping/finishing
	useEffect(() => {
		if (seconds === 0 && isRunning) {
			setIsRunning(false);
			if (onFinishRef.current) {
				onFinishRef.current();
			}
		}
	}, [seconds, isRunning]);

	// Cleanup on unmount
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
		hasStarted,
		hasCompleted,
	};
}

export default useTimer;
