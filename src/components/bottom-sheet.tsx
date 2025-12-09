import { Modal, Platform } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProps } from '../typings/components';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Radius, Spacing, vh } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';
import View from './view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

const SHEET_HEIGHT = vh / 2;
const SHEET_INITIAL_POSITION = vh;
const THRESHOLD = SHEET_HEIGHT / 3;

const SPRING_CONFIG = {
	damping: 20,
	stiffness: 150,
	mass: 1,
	overshootClamping: false,
};

const BottomSheet = ({ onClose, height = '50%', visible, children }: BottomSheetProps) => {
	const { backgrounds, borders } = useTheme();

	const backdropOpacity = useSharedValue(0);
	const sheetTranslateY = useSharedValue(SHEET_INITIAL_POSITION);

	const backdropStyle = useAnimatedStyle(() => ({
		opacity: backdropOpacity.value,
	}));
	const sheetStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: sheetTranslateY.value }],
	}));

	const insets = useSafeAreaInsets();

	const showSheet = () => {
		sheetTranslateY.value = withSpring(0, SPRING_CONFIG);
	};
	const hideSheet = () => {
		sheetTranslateY.value = withTiming(SHEET_INITIAL_POSITION, {
			duration: 200,
			easing: Easing.ease,
		});
	};

	const showBackdrop = () => {
		backdropOpacity.value = withTiming(1, {
			duration: 200,
			easing: Easing.ease,
		});
	};

	const panGesture = Gesture.Pan()
		.onUpdate((e) => {
			const y = e.translationY;
			sheetTranslateY.value = y >= -100 ? y : y - (Math.abs(y) - 100) * 0.8 * Math.sign(y);
		})
		.onEnd((e) => {
			if (e.translationY > THRESHOLD || e.velocityY > 800) {
				sheetTranslateY.value = withTiming(SHEET_INITIAL_POSITION, {
					duration: 200,
					easing: Easing.ease,
				});
				scheduleOnRN(onClose);
			} else {
				sheetTranslateY.value = withSpring(0, SPRING_CONFIG);
			}
		});

	useEffect(() => {
		if (visible) {
			showBackdrop();
			showSheet();
		} else {
			backdropOpacity.value = withTiming(0, {
				duration: 200,
				easing: Easing.ease,
			});
			hideSheet();
		}
	}, [visible]);
	return (
		<Modal visible={visible} transparent onRequestClose={onClose} animationType="fade">
			<GestureHandlerRootView style={{ flex: 1 }}>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					bounces={false}
					showsVerticalScrollIndicator={false}
				>
					<Animated.View style={[styles.backdrop, backdropStyle]}>
						<Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
					</Animated.View>

					<View style={[styles.sheetContainer, { paddingBottom: insets.bottom }]}>
						<GestureDetector gesture={panGesture}>
							<Animated.View
								style={[styles.sheet, { backgroundColor: backgrounds.body.subtle, height }, sheetStyle]}
							>
								<View alignSelf="center" style={[styles.handle, { backgroundColor: borders.body }]} />
								{children}
							</Animated.View>
						</GestureDetector>
					</View>
				</KeyboardAwareScrollView>
			</GestureHandlerRootView>
		</Modal>
	);
};

export default BottomSheet;

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: 'rgba(0 0 0 / 0.5)',
		...StyleSheet.absoluteFillObject,
	},
	sheetContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	sheet: {
		paddingBottom: '45%',
		paddingHorizontal: Spacing.lg,
		paddingTop: Spacing.lg,
		borderRadius: Radius.xl,
		boxSizing: 'content-box',
		top: '23%',
	},
	handle: { height: 5, borderRadius: 30, width: 50, marginBottom: Spacing.lg },
});
