import { ReactElement, ReactNode } from 'react';
import {
	ViewProps as RNViewProps,
	TextProps as RNTextProps,
	ViewStyle,
	TextInputProps,
	TouchableOpacityProps,
} from 'react-native';
import { BackgroundVariants, BorderRadius, SpacingSizes, TextColorVariants, ThemeColors } from './theme';
import { IconName } from './icon';
import { Task } from './data';

export interface ContainerProps {
	paddingHorizontal?: number;
	paddingVertical?: number;
	safeTop?: boolean;
	safeBottom?: boolean;
	variant?: 'keyboard' | 'scrollview' | 'view';
}

export interface BottomSheetProps {
	children?: ReactNode;
	height?: ViewStyle['height'];
	onClose: () => void;
	visible: boolean;
}

export interface ButtonProps extends TouchableOpacityProps {
	buttonColor?: ThemeColors;
	buttonVariant?: BackgroundVariants;
	border?: boolean;
	onPress?: () => void;
	radius?: BorderRadius;
	disabled?: boolean;
	padding?: SpacingSizes;
	loading?: boolean;
}

export interface DatePickerProps {
	border?: boolean;
	minDate?: Date;
	maxDate?: Date;
	onChange?: (date: Date) => void;
	style?: ViewStyle;
	value?: Date;
}

export interface IconProps {
	name: IconName;
	color?: ThemeColors;
	colorVariant?: TextColorVariants;
	size?: SpacingSizes;
}

export interface InputProps extends TextInputProps {
	ref?: React.Ref<any>;
	containerStyle?: ViewStyle;
	rightIcon?: ReactNode;
	border?: boolean;
}

export interface LoaderProps {
	size?: number;
	color?: ThemeColors;
	colorVariant?: TextColorVariants;
}

export interface PhoneInputProps {
	phone?: string;
	onPhoneChange?: (phone: string) => void;
	country?: string;
	onCountryChange?: (country: string) => void;
}

export interface ReceiptProps {
	status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
	color?: ThemeColors;
	colorVariant?: TextColorVariants;
	size?: number;
}

export interface SelectProps {
	border?: boolean;
	items: { value: string | number; label: string }[];
	onChange?: (value: string | number) => void;
	placeholder?: string;
	renderSelected?: (item: { value: string | number; label: string }) => ReactElement;
	renderItem?: (item: { value: string | number; label: string }) => ReactElement;
	style?: ViewStyle;
	value?: string | number;
}

export interface TaskItemProps extends Task {}

export interface TextProps extends RNTextProps {
	align?: 'left' | 'center' | 'right';
	color?: ThemeColors;
	colorVariant?: TextColorVariants;
	fontWeight?: 'medium' | 'semibold' | 'bold' | 'regular';
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'body-lg' | 'button' | 'label' | 'sm';
}

export interface ViewProps extends RNViewProps, TouchableOpacityProps {
	flex?: ViewStyle['flex'];
	direction?: ViewStyle['flexDirection'];
	alignItems?: ViewStyle['alignItems'];
	alignSelf?: ViewStyle['alignSelf'];
	justifyContent?: ViewStyle['justifyContent'];
	gap?: SpacingSizes;
	marginTop?: ViewStyle['marginTop'];
	marginBottom?: ViewStyle['marginBottom'];
	marginLeft?: ViewStyle['marginLeft'];
	marginRight?: ViewStyle['marginRight'];
	padding?: SpacingSizes;
	radius?: BorderRadius;
	background?: ThemeColors;
	bgVariant?: BackgroundVariants;
	touchable?: boolean;
	onPress?: () => void;
}
