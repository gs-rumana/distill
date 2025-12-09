import React, { FC } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import View from '../view';
import { Theme } from '../../typings/theme';
import { useTheme } from '../../hooks/useTheme';
import { InputProps } from '../../typings/components';
import { Radius, Spacing } from '../../constants/theme';
import { Button } from '../button';
import Icon from '../icon';

const Input = ({
	containerStyle,
	border = true,
	secureTextEntry,
	keyboardType,
	rightIcon,
	editable,
	readOnly,
	style,
	...props
}: InputProps) => {
	const [passwordVisible, setPasswordVisible] = React.useState(false);
	const theme = useTheme();
	const { backgrounds, borders, textColors } = theme;

	const styles = createStyles(theme);
	return (
		<View direction="row" alignItems="center" style={[border && styles.container, containerStyle]}>
			<TextInput
				editable={editable}
				readOnly={readOnly}
				secureTextEntry={!passwordVisible && secureTextEntry}
				style={[styles.input, (editable || !readOnly) === false && styles.disabled, style]}
				cursorColor={borders.primary}
				selectionColor={backgrounds.primary[Platform.OS === 'ios' ? 'base' : 'subtle']}
				selectionHandleColor={Platform.OS === 'ios' ? backgrounds.primary.base : backgrounds.secondary.base}
				placeholderTextColor={textColors.body.base}
				keyboardType={passwordVisible ? 'visible-password' : keyboardType}
				{...props}
			/>
			{secureTextEntry && !rightIcon && (
				<Button onPress={() => setPasswordVisible((prev) => !prev)}>
					<Icon name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} size="md" colorVariant="base" />
				</Button>
			)}
			{rightIcon && rightIcon}
		</View>
	);
};

export default Input;

const createStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			borderWidth: 1.5,
			borderColor: theme.borders.body,
			borderRadius: Radius.lg,
			// backgroundColor: theme.backgrounds.body.main,
		},
		input: {
			flex: 1,
			paddingLeft: Spacing.md,
			paddingVertical: Spacing.md,
			color: theme.textColors.body.emphasis,
			fontFamily: 'Rubik-Regular',
		},
		disabled: {
			opacity: 0.6,
			backgroundColor: theme.backgrounds.secondary.subtle,
			borderRadius: Radius.lg,
		},
	});
