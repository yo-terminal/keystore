import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookModel } from "../common/utils";

type State = {
  archive: boolean;
  decrypted: boolean;
  model: BookModel;
};

const initialState: State = {
  archive: false,
  decrypted: false,
  model: {
    slots: [],
    slotMap: {},
    children: {},
    parents: {},
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setArchive(state, action: PayloadAction<boolean>) {
      state.archive = action.payload;
    },
    setDecrypted(state, action: PayloadAction<boolean>) {
      state.decrypted = action.payload;
    },
    setModel(state, action: PayloadAction<BookModel>) {
      state.model = action.payload;
    },
  },
});

export const { setArchive, setDecrypted, setModel } = slice.actions;
export default slice.reducer;
