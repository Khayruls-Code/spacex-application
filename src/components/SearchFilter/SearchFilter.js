import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, handleDateFilter, handleSearch, handleStatusFilter, handleUpcomingFilter } from '../../redux/features/spaceXDataSlice';

const SearchFilter = ({ setShowSpaceData }) => {
  const spaceXData = useSelector(state => state.spaceXData.list)
  const spaceXSearchData = useSelector(state => state.spaceXData.searchList)
  const spaceXStatusData = useSelector(state => state.spaceXData.statusFilterList)
  const spaceXUpcomingData = useSelector(state => state.spaceXData.upcomingFilterList)
  const spaceXDateFilterData = useSelector(state => state.spaceXData.dateFilterList)
  const searchText = useSelector(state => state.spaceXData.searchText)
  const dispatch = useDispatch()

  //dispatch data
  useEffect(() => {
    dispatch(getData())
  },
    [dispatch])

  //getting data search and filterwise
  useEffect(() => {
    setShowSpaceData(spaceXData)
    if (searchText === '') {
      setShowSpaceData(spaceXData)
    } else if (searchText === 'Success' || searchText === 'Failure') {
      setShowSpaceData(spaceXStatusData)
    } else if (searchText === 'Upcoming' || searchText === 'Retrospective') {
      setShowSpaceData(spaceXUpcomingData)
    } else if (searchText === 'Last Week' || searchText === 'Last Month' || searchText === 'Last Year') {
      setShowSpaceData(spaceXDateFilterData)
    } else {
      setShowSpaceData(spaceXSearchData)
    }
  },
    [spaceXData, searchText])
  return (
    <div data-testid='searchFilterId' className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6 gap-y-4 gap-x-4 md:gap-x-8'>
      <input onChange={(e) => dispatch(handleSearch(e.target.value))} className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full' type="text" placeholder='Search By Rocket Name...' />
      <select onChange={(e) => dispatch(handleDateFilter(e.target.value))} className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full'>
        <option selected disabled="disabled">Filter By Launch Date</option>
        <option value="Last Week">Last Week</option>
        <option value="Last Month">Last Month</option>
        <option value="Last Year">Last Year</option>
      </select>
      <select onChange={(e) => dispatch(handleStatusFilter(e.target.value))} className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full'>
        <option selected disabled="disabled">Filter By Launch Status</option>
        <option value="Success">Success</option>
        <option value="Failure">Failure</option>
      </select>
      <select onChange={(e) => dispatch(handleUpcomingFilter(e.target.value))} className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full'>
        <option selected disabled="disabled">Upcoming Or Retrospective</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Retrospective">Retrospective</option>
      </select>
    </div>
  );
};

export default SearchFilter;