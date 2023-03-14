import { createSlice } from '@reduxjs/toolkit';

const buttonSlice = createSlice({
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

export const { clickButtonFilter } = buttonSlice.actions;
export default buttonSlice.reducer;
