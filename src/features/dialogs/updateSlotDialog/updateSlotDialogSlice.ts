import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OpenParams = {
  slotId: string;
};

type State = {
  open: boolean;
  openParams?: OpenParams;
};

const initialState: State = {
  open: false,
};

const slice = createSlice({
  name: 'dialogs/updateSlotDialog',
  initialState,
  reducers: {
    openUpdateSlotDialog(state, action: PayloadAction<OpenParams>) {
      state.open = true;
      state.openParams = action.payload;
    },
    closeUpdateSlotDialog(state) {
      state.open = false;
      delete state.openParams;
    },
  },
});

export const { openUpdateSlotDialog, closeUpdateSlotDialog } = slice.actions;
export default slice.reducer;
