import { StyleSheet } from 'react-native';
import { Radius, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/useTheme';
import { ButtonProps } from '../../typings/components';
import Text from '../text';
import View from '../view';
import Loader from '../loader';

const Button = ({
	children,
	buttonColor,
	buttonVariant = 'base',
	border,
	onPress,
	radius = 'lg',
	disabled,
	padding = 'md',
	loading,
	style,
	...props
}: ButtonProps) => {
	const { borders } = useTheme();
	return (
		<View
			touchable
			direction="row"
			justifyContent="center"
			alignItems="center"
			gap="md"
			onPress={onPress}
			disabled={disabled || loading}
			style={[
				{ padding: Spacing[padding], borderRadius: Radius[radius] },
				border && { borderWidth: 1, borderColor: borders[buttonColor] },
				disabled && styles.disabled,
				style,
			]}
			background={buttonColor}
			bgVariant={buttonVariant}
			{...props}
		>
			{loading && <Loader color="primary" size={20} />}
			{typeof children === 'string' || typeof children === 'number' ? (
				<Text
					align="center"
					color={buttonColor}
					colorVariant={buttonVariant === 'base' ? 'on' : 'emphasis'}
					fontWeight="semibold"
					variant="body-lg"
				>
					{children}
				</Text>
			) : (
				children
			)}
		</View>
	);
};

export default Button;

const styles = StyleSheet.create({
	disabled: { opacity: 0.5 },
});
