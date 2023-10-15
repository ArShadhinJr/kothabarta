import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../Slices/counterSlice'
import userSlice from '../Slices/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice, 
    user: userSlice
  },
})