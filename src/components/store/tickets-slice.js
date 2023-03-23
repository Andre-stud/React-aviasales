import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue, dispatch }) => {
  try {
    const responseId = await fetch('https://aviasales-test-api.kata.academy/search');

    if (!responseId.ok) {
      throw new Error('responseId error');
    }

    const searchId = await responseId.json();

    const arr = [];

    // eslint-disable-next-line no-inner-declarations
    async function recurTicked() {
      try {
        const responseTickets = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId.searchId}`
        );

        if (!responseTickets.ok) {
          throw Error('responseTickets error');
        }

        const ticketsData = await responseTickets.json();
        arr.push(...ticketsData.tickets);

        if (ticketsData.stop !== true) {
          // eslint-disable-next-line no-use-before-define
          dispatch(updateTickets(arr));
          recurTicked();
        }

        if (ticketsData.stop === true) {
          // eslint-disable-next-line no-use-before-define
          dispatch(loadCompleted());
        }

        return ticketsData.tickets;
      } catch (error) {
        if (error.message === 'responseTickets error') {
          recurTicked();
        }
        if (error.message === 'Failed to fetch') {
          // eslint-disable-next-line no-use-before-define
          dispatch(networkError());
        }

        return rejectWithValue(error.message);
      }
    }

    return await recurTicked();
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    ticketsData: [],
    status: null,
    error: null,
    statusLoad: null,
    statusNetworkError: null,
  },
  reducers: {
    updateTickets(state, actions) {
      const array = [];
      array.push(...actions.payload);
      state.tickets = array;
    },

    updateDataTickets(state, actions) {
      state.ticketsData = actions.payload;
    },

    loadCompleted(state) {
      state.statusLoad = true;
    },

    networkError(state) {
      state.statusNetworkError = true;
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

export const { updateTickets, updateDataTickets, loadCompleted, networkError } = ticketsSlice.actions;
export default ticketsSlice.reducer;
