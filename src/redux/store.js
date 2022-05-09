import { configureStore } from '@reduxjs/toolkit'
import spaceXDataSlice from './features/spaceXDataSlice'

const store = configureStore({
  reducer: {
    spaceXData: spaceXDataSlice,
  },
})

export default store;