import { configureStore } from '@reduxjs/toolkit'
import spaceXDataSlice from './features/spaceXDataSlice'

export const store = configureStore({
  reducer: {
    spaceXData: spaceXDataSlice,
  },
})