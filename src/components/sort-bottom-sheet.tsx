import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BottomSheet from './bottom-sheet';
import Text from './text';
import View from './view';
import { Button } from './button';
import { Spacing } from '../constants/theme';
import { setSortConfig } from '../redux/slices/main';
import { SortConfig, SortField, SortOrder } from '../typings/data';
import useAppSelector from '../hooks/useAppSelector';

interface SortBottomSheetProps {
	visible: boolean;
	onClose: () => void;
}

const SortFields: { value: SortField; label: string }[] = [
	{ value: 'priority', label: 'Priority' },
	{ value: 'status', label: 'Status' },
	{ value: 'dueDate', label: 'Due Date' },
	{ value: 'createdAt', label: 'Created Date' },
];

const SortBottomSheet = ({ visible, onClose }: SortBottomSheetProps) => {
	const dispatch = useDispatch();
	const { sortConfig } = useAppSelector((s) => s.main);

	const defaultSortConfig: SortConfig = { field: 'priority', order: 'desc' };

	const currentSortConfig = sortConfig || defaultSortConfig;
	const [sortField, setSortField] = useState<SortField>(currentSortConfig.field);
	const [sortOrder, setSortOrder] = useState<SortOrder>(currentSortConfig.order);

	useEffect(() => {
		if (visible) {
			setSortField(currentSortConfig.field);
			setSortOrder(currentSortConfig.order);
		}
	}, [visible, currentSortConfig]);

	const applySort = () => {
		dispatch(
			setSortConfig({
				field: sortField,
				order: sortOrder,
			})
		);
		onClose();
	};

	return (
		<BottomSheet visible={visible} onClose={onClose} height="auto">
			<Text variant="h5" style={{ marginBottom: Spacing.md }}>
				Sort By
			</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.md }}>
				{SortFields.map(({ value, label }) => (
					<Button
						key={value}
						buttonVariant={sortField === value ? 'base' : 'subtle'}
						buttonColor="primary"
						padding="md"
						radius="lg"
						style={{ marginRight: Spacing.sm }}
						onPress={() => setSortField(value)}
					>
						{label}
					</Button>
				))}
			</ScrollView>
			<View direction="row" alignItems="center" gap="md" marginBottom={Spacing.lg}>
				<Button
					buttonVariant={sortOrder === 'asc' ? 'base' : 'subtle'}
					buttonColor="secondary"
					padding="sm"
					radius="lg"
					style={{ flex: 1 }}
					onPress={() => setSortOrder('asc')}
				>
					Ascending
				</Button>
				<Button
					buttonVariant={sortOrder === 'desc' ? 'base' : 'subtle'}
					buttonColor="secondary"
					padding="sm"
					radius="lg"
					style={{ flex: 1 }}
					onPress={() => setSortOrder('desc')}
				>
					Descending
				</Button>
			</View>

			<Button
				buttonColor="success"
				padding="md"
				radius="lg"
				onPress={applySort}
				style={{ marginBottom: Spacing.lg }}
			>
				Apply Sort
			</Button>
		</BottomSheet>
	);
};

export default SortBottomSheet;
