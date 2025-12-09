import { useEffect } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import Animated, {
	cancelAnimation,
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { LoaderProps } from '../typings/components';
import { useTheme } from '../hooks/useTheme';

const Loader = ({ color = 'body', colorVariant = 'on', size = 24 }: LoaderProps) => {
	const { textColors } = useTheme();
	const rotation = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
		};
	});

	useEffect(() => {
		rotation.value = withRepeat(
			withTiming(360, {
				duration: 1000,
				easing: Easing.linear,
			}),
			-1
		);

		return () => {
			cancelAnimation(rotation);
		};
	}, []);
	return (
		<Animated.View style={[animatedStyle, { width: size, height: size }]}>
			<Svg width={size} height={size} fill="none" viewBox="0 0 16 16">
				<G fill={textColors[color][colorVariant]} fillRule="evenodd" clipRule="evenodd">
					<Path
						d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
						opacity={0.2}
					/>
					<Path d="M7.25.75A.75.75 0 0 1 8 0a8 8 0 0 1 8 8 .75.75 0 0 1-1.5 0A6.5 6.5 0 0 0 8 1.5a.75.75 0 0 1-.75-.75z" />
				</G>
			</Svg>
		</Animated.View>
	);
};

export default Loader;
