import { configureStore } from '@reduxjs/toolkit';

import buttonSortReducer from './button-sort-slice';
import checkboxFilterReducer from './checkbox-filter-slice';
import ticketsReducer from './tickets-slice';

export default configureStore({
  reducer: {
    button: buttonSortReducer,
    checkbox: checkboxFilterReducer,
    tickets: ticketsReducer,
  },
});
