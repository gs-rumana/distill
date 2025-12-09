import { useState } from 'react';
import { Platform } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useTheme } from '../../hooks/useTheme';
import { DatePickerProps } from '../../typings/components';
import Icon from '../icon';
import Text from '../text';
import View from '../view';
import BottomSheet from '../bottom-sheet';
import dayjs from 'dayjs';
import { Spacing } from '../../constants/theme';
import { Button } from '../button';

const DatePicker = ({ border = true, maxDate, minDate, onChange, style, value }: DatePickerProps) => {
	const { borders } = useTheme();
	const [sheetVisible, setSheetVisible] = useState(false);
	const toggleSheet = () => setSheetVisible((prev) => !prev);

	const handlePress = () => {
		if (Platform.OS === 'android') {
			DateTimePickerAndroid.open({
				value: value || new Date(),
				mode: 'date',
				minimumDate: minDate,
				maximumDate: maxDate,
				onChange: (event, selectedDate) => {
					if (event.type === 'set' && selectedDate && onChange) {
						onChange(selectedDate);
					}
				},
			});
			return;
		} else {
			toggleSheet();
		}
	};
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
			onPress={handlePress}
		>
			<Text colorVariant={value ? 'on' : 'base'}>
				{value !== undefined ? dayjs(value).format('DD MMM YYYY') : 'Choose Date'}
			</Text>
			<Icon name="chevron-down" colorVariant={value ? 'on' : 'base'} />

			{Platform.OS === 'ios' && (
				<BottomSheet onClose={toggleSheet} visible={sheetVisible} height="auto">
					<Text variant="h5" style={{ marginBottom: Spacing.md, marginHorizontal: Spacing.md }}>
						Choose Date
					</Text>
					<DateTimePicker
						value={value ?? new Date()}
						display="spinner"
						onChange={(_, d) => onChange && onChange(d)}
						style={{ alignSelf: 'center' }}
					/>
					<Button
						buttonColor="secondary"
						style={{ marginVertical: Spacing.md }}
						onPress={() => {
							if (!value) {
								onChange && onChange(new Date());
							}
							toggleSheet();
						}}
					>
						Done
					</Button>
				</BottomSheet>
			)}
		</View>
	);
};

export default DatePicker;
