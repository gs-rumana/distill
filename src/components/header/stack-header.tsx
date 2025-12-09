import View from '../view';
import { Button } from '../button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '../../constants/theme';
import Text from '../text';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useTheme } from '../../hooks/useTheme';
import Icon from '../icon';

const StackHeader = ({ navigation, options, route }: NativeStackHeaderProps) => {
	const insets = useSafeAreaInsets();
	const { textColors } = useTheme();

	const title = options.title ?? route.name;
	return (
		<View
			direction="row"
			alignItems="center"
			gap="md"
			style={{ paddingTop: insets.top + Spacing.sm, paddingBottom: Spacing.sm, paddingHorizontal: Spacing.md }}
		>
			<Button buttonColor="secondary" buttonVariant="subtle" padding="sm" onPress={() => navigation.goBack()}>
				<Icon name="chevron-back" color="secondary" colorVariant="emphasis" size="xl" />
			</Button>
			<Text variant="h5">{title}</Text>
		</View>
	);
};

export default StackHeader;
