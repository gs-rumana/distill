import React, { FC, ReactNode } from 'react';
import { View, ScrollView, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView, KeyboardProvider } from 'react-native-keyboard-controller';
import { ContainerProps } from '../typings/components';
import { Spacing } from '../constants/theme';

interface FullContainerProps extends ContainerProps {
	children: ReactNode;
	style?: ViewStyle | ViewStyle[];
}

const Container: FC<FullContainerProps> = ({
	children,
	paddingHorizontal = Spacing.lg,
	paddingVertical,
	safeTop = false,
	safeBottom = false,
	variant = 'view',
	style,
}) => {
	const insets = useSafeAreaInsets();

	const containerStyle: ViewStyle = {
		flex: 1,
		paddingHorizontal,
		paddingVertical,
		paddingTop: safeTop ? insets.top : paddingVertical,
		paddingBottom: safeBottom ? insets.bottom : paddingVertical,
	};

	const contentStyle: ViewStyle = {
		paddingHorizontal,
		paddingVertical,
		paddingTop: safeTop ? insets.top : paddingVertical,
		paddingBottom: safeBottom ? insets.bottom : paddingVertical,
	};

	const combinedStyle = [containerStyle, style];
	const combinedContentStyle = [contentStyle, style];

	switch (variant) {
		case 'keyboard':
			return (
				<KeyboardAwareScrollView
					style={{ flex: 1 }}
					contentContainerStyle={combinedContentStyle}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					bottomOffset={40}
				>
					{children}
				</KeyboardAwareScrollView>
			);

		case 'scrollview':
			return (
				<ScrollView
					style={{ flex: 1 }}
					contentContainerStyle={combinedContentStyle}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					{children}
				</ScrollView>
			);

		case 'view':
		default:
			return <View style={combinedStyle}>{children}</View>;
	}
};

export default Container;
