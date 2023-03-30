import { createSlice } from '@reduxjs/toolkit';

const buttonSortSlice = createSlice({
  name: 'activeButtonFilter',
  initialState: {
    button: 'cheapest',
  },
  reducers: {
    clickButtonFilter(state, action) {
      state.button = action.payload.value;
    },
  },
});

export const { clickButtonFilter } = buttonSortSlice.actions;
export default buttonSortSlice.reducer;
