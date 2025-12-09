import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../typings/redux';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
