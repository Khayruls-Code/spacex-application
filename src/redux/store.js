import { configureStore } from '@reduxjs/toolkit'
import spaceXDataSlice from './spaceXDataSlice'

export const store = configureStore({
  reducer: {
    spaceXData: spaceXDataSlice,
  },
})