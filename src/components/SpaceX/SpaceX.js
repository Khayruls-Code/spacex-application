import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, handleDateFilter, handleSearch, handleStatusFilter, handleUpcomingFilter } from '../../redux/features/spaceXDataSlice';

const SpaceX = () => {
  const spaceXData = useSelector(state => state.spaceXData.list)
  const spaceXSearchData = useSelector(state => state.spaceXData.searchList)
  const spaceXStatusData = useSelector(state => state.spaceXData.statusFilterList)
  const spaceXUpcomingData = useSelector(state => state.spaceXData.upcomingFilterList)
  const spaceXDateFilterData = useSelector(state => state.spaceXData.dateFilterList)
  const searchText = useSelector(state => state.spaceXData.searchText)
  const [showSpaceData, setShowSpaceData] = useState(spaceXData)
  const dispatch = useDispatch()

  //dispatch data
  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

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
  }, [spaceXData, searchText])

  return (
    <div className='container mx-auto px-4'>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4 gap-y-4 gap-x-4 md:gap-x-8'>
        <input onChange={(e) => dispatch(handleSearch(e.target.value))} className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full' type="text" placeholder='Search By Rocket Name...' />
        <select onChange={(e) => dispatch(handleDateFilter(e.target.value))} className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full'>
          <option selected="true" disabled="disabled">Filter By Launch Date</option>
          <option value="Last Week">Last Week</option>
          <option value="Last Month">Last Month</option>
          <option value="Last Year">Last Year</option>
        </select>
        <select onChange={(e) => dispatch(handleStatusFilter(e.target.value))} className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full'>
          <option selected="true" disabled="disabled">Filter By Launch Status</option>
          <option value="Success">Success</option>
          <option value="Failure">Failure</option>
        </select>
        <select onChange={(e) => dispatch(handleUpcomingFilter(e.target.value))} className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full'>
          <option selected="true" disabled="disabled">Upcoming Or Retrospective</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Retrospective">Retrospective</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          showSpaceData?.map(singleData => <div key={singleData?.rocket?.rocket_id + (Math.random() * 10000)}
            className='bg-gradient-to-r from-transparent_violet to-transparent_purple rounded-md'
          >
            <img className={singleData?.links?.flickr_images.length ? "w-full h-60 object-cover rounded-t-md" : 'w-full h-60 object-contain py-3 bg-white rounded-t-md'} src={singleData?.links?.flickr_images[0] || singleData?.links.mission_patch} alt="" />
            <div className='p-4 relative'>
              <p className={singleData?.launch_success ? "bg-green absolute -top-3 right-0 px-3 text-md font-medium text-white rounded-sm w-fit shadow-lg" : "bg-red absolute -top-3 right-0 px-3 text-md font-medium text-white rounded-sm w-fit shadow-lg"}>{singleData?.launch_success ? "Success" : 'Failure'}</p>
              <h1 className='text-3xl font-semibold font-mono text-white'>{singleData?.rocket?.rocket_name}</h1>
              <p className='text-white font-serif my-2'>{singleData?.details?.slice(0, 100)}</p>
              <div className='flex items-center gap-4'>
                <h2 className='text-md text-white'><span className='font-bold'>Launch Date:</span> {singleData?.launch_date_local?.split('T')[0]}</h2>
                <h3 className='text-black bg-white px-3 rounded-full font-semibold'>{singleData?.upcoming && "Upcoming"}</h3>
              </div>
            </div>
          </div>)
        }
      </div>
      {
        !showSpaceData.length && <h1 className='text-white text-4xl  flex items-center justify-center mt-32'>Data Not Found</h1>
      }
    </div >
  );
};

export default SpaceX;