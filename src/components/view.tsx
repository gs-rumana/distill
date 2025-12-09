import React, { forwardRef } from 'react';
import { View as RNView, TouchableOpacity } from 'react-native';
import { ViewProps } from '../typings/components';
import { useTheme } from '../hooks/useTheme';
import { Radius, Spacing } from '../constants/theme';

const View = forwardRef<RNView, ViewProps>(
	(
		{
			alignItems,
			background,
			bgVariant = 'base',
			direction,
			flex,
			gap,
			justifyContent,
			alignSelf,
			style,
			marginBottom,
			marginLeft,
			marginRight,
			marginTop,
			padding,
			radius,
			touchable,
			activeOpacity = 0.7,
			...props
		},
		ref
	) => {
		const theme = useTheme();
		let backgroundColor = '';

		if (background) {
			switch (background) {
				case 'body':
					backgroundColor = theme.backgrounds.body[bgVariant];
					break;
				case 'primary':
					backgroundColor = theme.backgrounds.primary[bgVariant];
					break;
				case 'secondary':
					backgroundColor = theme.backgrounds.secondary[bgVariant];
					break;
				case 'success':
					backgroundColor = theme.backgrounds.success[bgVariant];
					break;
				case 'warning':
					backgroundColor = theme.backgrounds.warning[bgVariant];
					break;
				case 'error':
					backgroundColor = theme.backgrounds.error[bgVariant];
					break;
				case 'info':
					backgroundColor = theme.backgrounds.info[bgVariant];
					break;
			}
		}

		const Component = touchable ? TouchableOpacity : RNView;

		return (
			<Component
				ref={ref}
				style={[
					{
						alignItems,
						alignSelf,
						flex,
						gap: Spacing[gap],
						justifyContent,
						flexDirection: direction,
						backgroundColor,
						marginBottom,
						marginLeft,
						marginRight,
						marginTop,
						padding: Spacing[padding],
						borderRadius: Radius[radius],
					},
					style,
				]}
				activeOpacity={activeOpacity}
				{...props}
			/>
		);
	}
);

export default View;
