import React, { createContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Theme } from '../typings/theme';
import { LightTheme, DarkTheme } from '../constants/theme';

interface ThemeContextType {
	backgrounds: Theme['backgrounds'];
	textColors: Theme['textColors'];
	borders: Theme['borders'];
	isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const colorScheme = useColorScheme();

	const isDark = colorScheme === 'dark';

	const theme = isDark ? DarkTheme : LightTheme;

	return <ThemeContext.Provider value={{ ...theme, isDark }}>{children}</ThemeContext.Provider>;
};
