import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../redux/spaceXDataSlice';

const SpaceX = () => {
  const spaceXData = useSelector(state => state.spaceXData.list)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getData())
  },
    [dispatch])
  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-4 mb-4 gap-8'>
        <input className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full' type="text" placeholder='Search By Rocket Name...' />
        <select className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full'>
          <option>Filter By Launch Date</option>
          <option value="Last Week">Last Week</option>
          <option value="Last Month">Last Month</option>
          <option value="Last Week">Last Year</option>
        </select>
        <select className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full'>
          <option>Filter By Launch Status</option>
          <option value="Last Week">Success</option>
          <option value="Last Month">Failure</option>
        </select>
        <select className='py-1.5 px-2 outline-none rounded-sm font-semibold w-full'>
          <option>Upcoming Or Retrospective</option>
          <option value="Last Week">Upcoming</option>
          <option value="Last Month">Retrospective</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {
          spaceXData.slice(0, 15).map(singleData => <div key={singleData?.rocket?.rocket_id + (Math.random() * 10000)}
            className='bg-gradient-to-r from-transparent_violet to-transparent_purple rounded-md'
          >
            <img className={singleData?.links?.flickr_images.length ? "w-full h-60 object-cover rounded-t-md" : 'w-full h-60 object-contain py-3 bg-white rounded-t-md'} src={singleData?.links?.flickr_images[0] || singleData?.links.mission_patch} alt="" />
            <div className='p-4 relative'>
              <p className={singleData?.launch_success ? "bg-green absolute -top-3 right-0 px-3 text-md font-medium text-white rounded-sm w-fit" : "bg-red absolute -top-3 right-0 px-3 text-md font-medium text-white rounded-sm w-fit"}>{singleData?.launch_success ? "Success" : 'Failure'}</p>
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
    </div >
  );
};

export default SpaceX;