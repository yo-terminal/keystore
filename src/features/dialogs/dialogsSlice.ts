import { combineReducers } from 'redux';
import createSlotDialog from './createSlotDialog/createSlotDialogSlice';
import updateSlotDialog from './updateSlotDialog/updateSlotDialogSlice';

const reducer = combineReducers({
  createSlotDialog,
  updateSlotDialog,
});

export default reducer;
