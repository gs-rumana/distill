import Ionicons from '@expo/vector-icons/Ionicons';
import { IconProps } from '../typings/components';
import { Spacing } from '../constants/theme';
import { useTheme } from '../hooks/useTheme';

const Icon = ({ name, color = 'body', colorVariant = 'on', size }: IconProps) => {
	const { textColors } = useTheme();
	return <Ionicons size={Spacing[size]} color={textColors[color][colorVariant]} name={name} />;
};

export default Icon;
