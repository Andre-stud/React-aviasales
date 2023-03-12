import { createSlice } from '@reduxjs/toolkit';

const checkboxSlice = createSlice({
    name: 'activeCheckbox',
    initialState: {
        checkbox:[
            {name: 'clickAllCheckbox', isActive: false},
            {name: 'clickNonStopCheckbox', isActive: false},
            {name: 'click1TransfersCheckbox', isActive: false},
            {name: 'click2TransfersCheckbox', isActive: false},
            {name: 'click3TransfersCheckbox', isActive: false},
        ]
    } ,
    reducers: {
        clickCheckboxFilter(state, action){
            const checkboxName = state.checkbox.find(checkbox => checkbox.name === action.payload);
            checkboxName.isActive = !checkboxName.isActive;
        },
        checkedAllCheckbox(state){
             state.checkbox.map((checkbox)=> checkbox.isActive = true);
        },
        notCheckedAllCheckbox(state){
            state.checkbox.map((checkbox)=> checkbox.isActive = false);
       }
    }
});

export const {clickCheckboxFilter, checkedAllCheckbox, notCheckedAllCheckbox } = checkboxSlice.actions;
export default checkboxSlice.reducer;