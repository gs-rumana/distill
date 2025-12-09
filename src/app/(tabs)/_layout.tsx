import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import useAppSelector from '../../hooks/useAppSelector';
import { useEffect } from 'react';
import { setDate } from '../../redux/slices/main';
import { useDispatch } from 'react-redux';

export default function TabLayout() {
	const { date } = useAppSelector((s) => s.main);
	const dispatch = useDispatch();

	useEffect(() => {
		const today = new Date().toISOString().split('T')[0];
		if (!date || date === null || date !== today) {
			dispatch(setDate(today));
		}
	}, [date]);
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				animation: 'fade',
				tabBarLabelStyle: { fontSize: 13, fontFamily: 'Rubik-SemiBold' },
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons size={24} name={focused ? 'home' : 'home-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="tasks"
				options={{
					title: 'Tasks',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons size={24} name={focused ? 'checkbox' : 'checkbox-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="stats"
				options={{
					title: 'Stats',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons size={24} name={focused ? 'pie-chart' : 'pie-chart-outline'} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
