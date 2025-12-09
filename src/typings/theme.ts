export type ThemeColors = 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info' | 'body';
export type TextColorVariants = 'base' | 'on' | 'emphasis';
export type BackgroundVariants = 'subtle' | 'base';

export type Backgrounds = Record<ThemeColors, Record<BackgroundVariants, string>>;
export type TextColors = Record<ThemeColors, Record<TextColorVariants, string>>;
export type BorderColors = Record<ThemeColors, string>;

export type BorderRadius = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type SpacingSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface Theme {
	isDark: boolean;
	backgrounds: Backgrounds;
	borders: BorderColors;
	textColors: TextColors;
}
