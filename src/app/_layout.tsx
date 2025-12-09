import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import store, { persistor } from '../redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '../context/theme-context';
import { useTheme } from '../hooks/useTheme';
import { DarkNavigationTheme, LightNavigationTheme } from '../constants/theme';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StackHeader } from '../components/header';
import { KeyboardProvider } from 'react-native-keyboard-controller';

function RootStack() {
	const theme = useTheme();

	useEffect(() => {
		setTimeout(() => {
			BootSplash.hide({ fade: true });
		}, 1000);
	}, []);

	return (
		<NavigationThemeProvider value={theme.isDark ? DarkNavigationTheme : LightNavigationTheme}>
			<StatusBar
				hidden={false}
				translucent={false}
				animated
				hideTransitionAnimation="slide"
				style={theme.isDark ? 'light' : 'dark'}
				backgroundColor={theme.backgrounds.body.base}
			/>
			<Stack screenOptions={{ header: StackHeader, animation: 'ios_from_right' }}>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="add-task" options={{ title: 'Add Task' }} />
				<Stack.Screen name="working-session" options={{ title: 'Working Session', headerShown: false }} />
				<Stack.Screen name="settings" options={{ title: 'Settings' }} />
			</Stack>
		</NavigationThemeProvider>
	);
}

export default function Layout() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ThemeProvider>
					<KeyboardProvider>
						<RootStack />
					</KeyboardProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
}
