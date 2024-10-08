import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  searchQuery: string;
  maxItem: number;
};

const initialState: State = {
  searchQuery: "",
  maxItem: 30,
};

const slice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.maxItem = 30;
    },
    setMaxItem(state, action: PayloadAction<number>) {
      state.maxItem = action.payload;
    },
  },
});

export const { setSearchQuery, setMaxItem } = slice.actions;
export default slice.reducer;
