import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTickets = createAsyncThunk(
    'tickets/fetchTickets',
    async (_, {rejectWithValue} ) => {
        try{

            const responseId =  await fetch('https://aviasales-test-api.kata.academy/search');

            if(!responseId.ok){
                throw new Error('responseId error');
            }

            const searchId = await responseId.json();
    
            const responseTickets = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId.searchId}`);
    
            if(!responseTickets.ok){
                throw new Error('responseTickets error');
            }

            const ticketsData = await responseTickets.json();
    
            return ticketsData;

        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        tickets: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [fetchTickets.pending]: (state) =>{
            state.status = 'loading';
            state.error = null;
        },
        [fetchTickets.fulfilled]: (state, actions) =>{
            state.status = 'resolved';
            state.tickets = actions.payload;
        },
        [fetchTickets.rejected]: (state, actions) =>{
            state.status = 'rejected';
            state.error = actions.payload;
        },
    }
});

export const {clickButtonFilter} = ticketsSlice.actions;
export default ticketsSlice.reducer;