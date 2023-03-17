import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const arr = [];

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue, dispatch }) => {
  try {
    const responseId = await fetch('https://aviasales-test-api.kata.academy/search');

    if (!responseId.ok) {
      throw new Error('responseId error');
    }

    const searchId = await responseId.json();

    // eslint-disable-next-line no-inner-declarations
    async function recurTicked() {
      try {
        const responseTickets = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId.searchId}`
        );

        if (!responseTickets.ok) {
          throw new Error('responseTickets error');
        }

        const ticketsData = await responseTickets.json();

        if (ticketsData.stop !== true) {
          arr.push(...ticketsData.tickets);
          recurTicked();
        }
        if (ticketsData.stop === true) {
          // eslint-disable-next-line no-use-before-define
          return dispatch(updateTickets(arr));
        }

        return ticketsData.tickets;
      } catch (error) {
        recurTicked();
        return rejectWithValue(error.message);
      }
    }

    return await recurTicked();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    ticketsData: [],
    status: null,
    error: null,
  },
  reducers: {
    updateTickets(state, actions) {
      state.tickets = actions.payload;
    },
    updateDataTickets(state, actions) {
      state.ticketsData = actions.payload;
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTickets.fulfilled]: (state, actions) => {
      state.status = 'resolved';
      state.tickets = actions.payload;
    },
    [fetchTickets.rejected]: (state, actions) => {
      state.status = 'rejected';
      state.error = actions.payload;
    },
  },
});

export const { updateTickets, updateDataTickets } = ticketsSlice.actions;
export default ticketsSlice.reducer;
