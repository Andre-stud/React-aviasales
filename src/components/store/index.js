import { configureStore } from '@reduxjs/toolkit';

import buttonReducer from './button-slice';
import checkboxReducer from './checkbox-slice';
import ticketsReducer from './tickets-slice';

export default configureStore({
  reducer: {
    button: buttonReducer,
    checkbox: checkboxReducer,
    tickets: ticketsReducer,
  },
});
