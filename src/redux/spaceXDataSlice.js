import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getData = createAsyncThunk(
  'spaceXData/getData',
  async () => {
    return fetch('https://api.spacexdata.com/v3/launches').then(res => res.json())
  }
)

export const spaceDataSlice = createSlice({
  name: 'spaceXData',
  initialState: {
    list: [],
    status: null,
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.status = 'pending'
    },
    [getData.fulfilled]: (state, { payload }) => {
      state.list = payload
      state.status = 'success'
    },
    [getData.rejected]: (state) => {
      state.status = 'failed'
    },
  },
})

export default spaceDataSlice.reducer