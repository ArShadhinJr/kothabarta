import { createSlice } from '@reduxjs/toolkit';

export const userMsgSlice = createSlice({
    name: 'userMsg',
    initialState: {
        userMsg: localStorage.getItem('userMsg') ? JSON.parse(localStorage.getItem('userMsg')) : null,
    },
    reducers: {
        setUserMsg: (state, action) => {
            state.userMsg = action.payload
        },
    }
} )

export const { setUserMsg } = userMsgSlice.actions;

export default userMsgSlice.reducer
