import { Theme as NavigationTheme } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import {
	Backgrounds,
	BorderColors,
	BorderRadius,
	SpacingSizes,
	TextColors,
	Theme,
	ThemeColors,
} from '../typings/theme';

export const { height: vh, width: vw } = Dimensions.get('window');

const BaseColors: Record<ThemeColors, string> = {
	primary: '#553FE9',
	secondary: '#727C87',
	error: '#DC3545',
	warning: '#FFC107',
	success: '#2E8B57',
	info: '#17A2B8',
	body: '#FFFFFF',
};

const LightBackgroundColors: Backgrounds = {
	body: {
		subtle: '#FFFFFF',
		base: '#F8F8F8',
	},
	primary: {
		subtle: '#EEECFD',
		base: BaseColors.primary,
	},
	secondary: {
		subtle: '#e3e5e7',
		base: BaseColors.secondary,
	},
	error: {
		subtle: '#f8d7da',
		base: BaseColors.error,
	},
	warning: {
		subtle: '#fff3cd',
		base: BaseColors.warning,
	},
	success: {
		subtle: '#d5e8dd',
		base: BaseColors.success,
	},
	info: {
		subtle: '#d1ecf1',
		base: BaseColors.info,
	},
};

const DarkBackgroundColors: Backgrounds = {
	body: {
		subtle: '#282727',
		base: '#111111',
	},
	primary: {
		subtle: '#110d2f',
		base: BaseColors.primary,
	},
	secondary: {
		subtle: '#222528',
		base: BaseColors.secondary,
	},
	error: {
		subtle: '#2C0B0E',
		base: BaseColors.error,
	},
	warning: {
		subtle: '#332701',
		base: BaseColors.warning,
	},
	success: {
		subtle: '#091c11',
		base: BaseColors.success,
	},
	info: {
		subtle: '#052025',
		base: BaseColors.info,
	},
};

const LightTextColors: TextColors = {
	body: {
		emphasis: 'hsl(0, 0%, 5%)',
		base: 'hsl(0, 0%, 35%)',
		on: 'hsl(0, 0%, 5%)',
	},
	primary: {
		emphasis: '#261C69',
		base: BaseColors.primary,
		on: 'hsl(0, 0%, 95%)',
	},
	secondary: {
		emphasis: '#2e3236',
		base: BaseColors.secondary,
		on: 'hsl(0, 0%, 95%)',
	},
	error: {
		emphasis: '#58151C',
		base: BaseColors.error,
		on: 'hsl(0, 0%, 95%)',
	},
	warning: {
		emphasis: '#664D03',
		base: BaseColors.warning,
		on: 'hsl(0, 0%, 5%)',
	},
	success: {
		emphasis: '#0A3622',
		base: BaseColors.success,
		on: 'hsl(0, 0%, 95%)',
	},
	info: {
		emphasis: '#055160',
		base: BaseColors.info,
		on: 'hsl(0, 0%, 95%)',
	},
};

const DarkTextColors: TextColors = {
	body: {
		emphasis: 'hsl(0, 0%, 95%)',
		base: 'hsl(0, 0%, 65%)',
		on: 'hsl(0, 0%, 95%)',
	},
	primary: {
		emphasis: '#bbb2f6',
		base: BaseColors.primary,
		on: 'hsl(0, 0%, 95%)',
	},
	secondary: {
		emphasis: '#b9bec3',
		base: BaseColors.secondary,
		on: 'hsl(0, 0%, 95%)',
	},
	error: {
		emphasis: '#EA868F',
		base: BaseColors.error,
		on: 'hsl(0, 0%, 95%)',
	},
	warning: {
		emphasis: '#e6ae06',
		base: BaseColors.warning,
		on: 'hsl(0, 0%, 5%)',
	},
	success: {
		emphasis: '#75B798',
		base: BaseColors.success,
		on: 'hsl(0, 0%, 95%)',
	},
	info: {
		emphasis: '#45b5c6',
		base: BaseColors.info,
		on: 'hsl(0, 0%, 5%)',
	},
};

const LightBorderColors: BorderColors = {
	body: '#DEE2E6',
	primary: '#D9D4FF',
	secondary: '#CED4DA',
	error: '#F1AEB5',
	warning: '#FFE69C',
	success: '#A3CFBB',
	info: '#9EEAF9',
};

const DarkBorderColors: BorderColors = {
	body: '#4E4F51',
	primary: '#221384',
	secondary: '#343A40',
	error: '#842029',
	warning: '#997404',
	success: '#0F5132',
	info: '#087990',
};

const LightTheme: Theme = {
	backgrounds: LightBackgroundColors,
	borders: LightBorderColors,
	isDark: false,
	textColors: LightTextColors,
};

const DarkTheme: Theme = {
	backgrounds: DarkBackgroundColors,
	borders: DarkBorderColors,
	isDark: true,
	textColors: DarkTextColors,
};

const Fonts: NavigationTheme['fonts'] = {
	bold: {
		fontFamily: 'Rubik-SemiBold',
		fontWeight: '700',
	},
	heavy: {
		fontFamily: 'Rubik-Bold',
		fontWeight: '800',
	},
	medium: {
		fontFamily: 'Rubik-Medium',
		fontWeight: '500',
	},
	regular: {
		fontFamily: 'Rubik-Regular',
		fontWeight: '400',
	},
};

const LightNavigationTheme: NavigationTheme = {
	colors: {
		background: LightBackgroundColors.body.base,
		border: LightBorderColors.body,
		card: LightBackgroundColors.body.subtle,
		notification: BaseColors.info,
		primary: BaseColors.primary,
		text: LightTextColors.body.emphasis,
	},
	dark: false,
	fonts: Fonts,
};

const DarkNavigationTheme: NavigationTheme = {
	colors: {
		background: DarkBackgroundColors.body.base,
		border: DarkBorderColors.body,
		card: DarkBackgroundColors.body.subtle,
		notification: BaseColors.info,
		primary: BaseColors.primary,
		text: DarkTextColors.body.emphasis,
	},
	dark: true,
	fonts: Fonts,
};

export const Radius: Record<BorderRadius, number> = {
	sm: 4,
	md: 8,
	lg: 16,
	xl: 24,
	full: 9999,
};

export const Spacing: Record<SpacingSizes, number> = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 24,
	'2xl': 32,
	'3xl': 40,
};

export { LightNavigationTheme, DarkNavigationTheme, LightTheme, DarkTheme };
