import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'

//fetching api data
export const getData = createAsyncThunk(
  'spaceXData/getData',
  async () => {
    return fetch('https://api.spacexdata.com/v3/launches').then(res => res.json())
  }
)

const todayDate = new Date()
//geting last week start anb end date
const startDayOfPrevWeek = moment(todayDate).subtract(1, 'week').startOf('week').format('LLLL')
const lastDayOfPrevWeek = moment(todayDate).subtract(1, 'week').endOf('week').format('LLLL')
//getting last month start and end date
const startDayOfPrevMonth = moment(todayDate).subtract(1, 'month').startOf('month').format('LLLL')
const lastDayOfPrevMonth = moment(todayDate).subtract(1, 'month').endOf('month').format('LLLL')
//getting last year start and end date
const startDayOfPrevYear = moment(todayDate).subtract(1, 'year').startOf('year').format('LLLL')
const lastDayOfPrevYear = moment(todayDate).subtract(1, 'year').endOf('year').format('LLLL')

export const spaceDataSlice = createSlice({
  name: 'spaceXData',
  initialState: {
    searchText: '',
    list: [],
    searchList: [],
    statusFilterList: [],
    upcomingFilterList: [],
    dateFilterList: [],
    status: null,
  },
  reducers: {
    handleSearch: (state, { payload }) => {
      state.searchText = payload
      state.searchList = state?.list.filter(item => item?.rocket?.rocket_name.toLowerCase().includes(payload.toLowerCase()))
    },
    handleStatusFilter: (state, { payload }) => {
      state.searchText = payload
      state.statusFilterList = payload === 'Success' ? state?.list.filter(item => item.launch_success === true).slice(0) : payload === 'Failure' ? state.list.filter(item => item.launch_success === false).slice(0) : state.list
    },
    handleUpcomingFilter: (state, { payload }) => {
      state.searchText = payload
      state.upcomingFilterList = payload === 'Upcoming' ? state?.list.filter(item => item.upcoming === true).slice(0) : payload === 'Retrospective' ? state.list.filter(item => item.upcoming === false).slice(0) : state.list
    },
    handleDateFilter: (state, { payload }) => {
      state.searchText = payload
      let newData;
      if (payload === 'Last Week') {
        newData = state?.list?.filter(item => moment(item?.launch_date_utc).isBetween(startDayOfPrevWeek, lastDayOfPrevWeek))
      } else if (payload === 'Last Month') {
        newData = state?.list?.filter(item => moment(item?.launch_date_utc).isBetween(startDayOfPrevMonth, lastDayOfPrevMonth))
      } else if (payload === 'Last Year') {
        newData = state?.list?.filter(item => moment(item?.launch_date_utc).isBetween(startDayOfPrevYear, lastDayOfPrevYear))
      } else {
        newData = state.list
      }
      state.dateFilterList = newData
    },
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

export const { handleSearch, handleStatusFilter, handleUpcomingFilter, handleDateFilter } = spaceDataSlice.actions
export default spaceDataSlice.reducer