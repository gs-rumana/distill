import { useState } from 'react';
import { FlatList } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { SelectProps } from '../../typings/components';
import Icon from '../icon';
import Text from '../text';
import View from '../view';
import BottomSheet from '../bottom-sheet';
import { Spacing } from '../../constants/theme';

const Select = ({
	border = true,
	items,
	onChange,
	placeholder = 'Select an option',
	renderItem,
	renderSelected,
	style,
	value,
}: SelectProps) => {
	const { borders } = useTheme();
	const [sheetVisible, setSheetVisible] = useState(false);
	const toggleSheet = () => setSheetVisible((prev) => !prev);

	const selected = items.find((i) => i.value === value);
	const label = selected ? selected.label : placeholder;
	return (
		<View
			radius="lg"
			padding="md"
			style={[border && { borderColor: borders.body, borderWidth: 1.5 }, style]}
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			gap="md"
			touchable
			onPress={toggleSheet}
		>
			{selected && renderSelected ? renderSelected(selected) : null}
			{!selected || !renderSelected ? (
				<>
					<Text colorVariant={selected ? 'on' : 'base'}>{label}</Text>
					<Icon name="chevron-down" colorVariant={selected ? 'on' : 'base'} />
				</>
			) : null}

			<BottomSheet onClose={toggleSheet} visible={sheetVisible} height="30%">
				<Text variant="h5" style={{ marginBottom: Spacing.md, marginHorizontal: Spacing.md }}>
					{placeholder}
				</Text>
				<FlatList
					data={items}
					renderItem={({ item }) => (
						<View
							padding="md"
							radius="lg"
							background={item.value === value ? 'secondary' : undefined}
							bgVariant="subtle"
							touchable
							onPress={() => {
								if (onChange) {
									onChange(item.value);
								}
								toggleSheet();
							}}
						>
							{renderItem ? renderItem(item) : <Text>{item.label}</Text>}
						</View>
					)}
				/>
			</BottomSheet>
		</View>
	);
};

export default Select;
