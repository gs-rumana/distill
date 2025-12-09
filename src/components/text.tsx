import React, { FC } from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { TextProps } from '../typings/components';
import { useTheme } from '../hooks/useTheme';
import { Spacing } from '../constants/theme';

const Text: FC<TextProps> = ({
	align,
	color = 'body',
	colorVariant = 'emphasis',
	variant = 'body',
	style,
	fontWeight,
	...props
}) => {
	const { textColors } = useTheme();

	const textVariant = styles[variant];

	const fontFamily =
		fontWeight === 'bold'
			? 'Rubik-Bold'
			: fontWeight === 'semibold'
				? 'Rubik-SemiBold'
				: fontWeight === 'regular'
					? 'Rubik-Regular'
					: 'Rubik-Medium';
	return (
		<RNText
			{...props}
			style={[
				textVariant,
				{ color: textColors[color][colorVariant], textAlign: align },
				fontWeight && { fontFamily },
				style,
			]}
		/>
	);
};

export default Text;

const styles = StyleSheet.create({
	h1: {
		fontSize: 40,
		fontFamily: 'Rubik-SemiBold',
	},
	h2: {
		fontSize: 32,
		fontFamily: 'Rubik-SemiBold',
	},
	h3: {
		fontSize: 28,
		fontFamily: 'Rubik-Bold',
	},
	h4: {
		fontSize: 22,
		fontFamily: 'Rubik-Medium',
	},
	h5: {
		fontSize: 18,
		fontFamily: 'Rubik-Medium',
	},
	sm: {
		fontSize: 12,
		fontFamily: 'Rubik-Regular',
	},
	body: {
		fontFamily: 'Rubik-Regular',
	},
	'body-lg': {
		fontSize: 15,
		fontFamily: 'Rubik-Regular',
	},
	label: {
		fontFamily: 'Rubik-Medium',
		marginBottom: Spacing.xs,
		marginLeft: Spacing.xs,
	},
	button: {
		fontSize: 14,
	},
});
