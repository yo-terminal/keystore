import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OpenParams = {
  parentId?: string;
};

type State = {
  open: boolean;
  openParams?: OpenParams;
};

const initialState: State = {
  open: false,
};

const slice = createSlice({
  name: 'dialogs/createSlotDialog',
  initialState,
  reducers: {
    openCreateSlotDialog(state, action: PayloadAction<OpenParams>) {
      state.open = true;
      state.openParams = action.payload;
    },
    closeCreateSlotDialog(state) {
      state.open = false;
      delete state.openParams;
    },
  },
});

export const { openCreateSlotDialog, closeCreateSlotDialog } = slice.actions;
export default slice.reducer;
