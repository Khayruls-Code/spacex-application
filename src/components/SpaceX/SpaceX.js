import React, { useState } from 'react';
import SearchFilter from '../SearchFilter/SearchFilter';
import { RiYoutubeFill } from 'react-icons/ri'
import { BiNotepad } from 'react-icons/bi'
import { ImWikipedia } from 'react-icons/im'
import { useSelector } from 'react-redux';
import preloder from '../../images/preloader.gif'

const SpaceX = () => {

  const [showSpaceData, setShowSpaceData] = useState([])
  const status = useSelector(state => state.spaceXData.status)

  return (
    <div className='container mx-auto px-4'>
      <SearchFilter setShowSpaceData={setShowSpaceData} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          showSpaceData?.map(singleData => <div key={singleData?.rocket?.rocket_id + (Math.random() * 10000)}
            className='bg-gradient-to-r from-transparent_violet to-transparent_purple rounded-md'
          >
            <img className={singleData?.links?.flickr_images.length ? "w-full h-60 object-cover rounded-t-md" : 'w-full h-60 object-contain py-3 bg-white rounded-t-md'} src={singleData?.links?.flickr_images[0] || singleData?.links.mission_patch} alt="" />
            <div className='p-4 relative'>
              <p className={singleData?.launch_success ? "bg-green absolute -top-3 right-0 px-3 text-md font-medium text-white rounded-sm w-fit shadow-lg" : "bg-red absolute -top-3 right-0 px-3 text-md font-medium text-white rounded-sm w-fit shadow-lg"}>{singleData?.launch_success ? "Success" : 'Failure'}</p>
              <h1 className='text-3xl font-semibold font-mono text-white'>{singleData?.rocket?.rocket_name}</h1>
              <p className='text-white my-2 tracking-wide'>{singleData?.details?.slice(0,
100)}</p>
              <div className='flex items-center gap-4'>
                <h2 className='text-md text-white'><span className='font-bold'>Launch Date:</span> {singleData?.launch_date_local?.split('T')[0]}</h2>
                <h3 className='text-black bg-white px-3 rounded-full font-semibold'>{singleData?.upcoming && "Upcoming"}</h3>
              </div>
              <div className='flex items-center justify-between my-2'>
                <div className='flex flex-col justify-center'>
                  <h4 className='text-light_red text-md font-bold'>Nationality</h4>
                  <p className='text-sm text-white'>{singleData?.rocket?.second_stage?.payloads[0]?.nationality}</p>
                </div>
                <div className='flex flex-col justify-center'>
                  <h4 className='text-light_red text-md font-bold'>Mass</h4>
                  <p className='text-sm text-white'>{singleData?.rocket?.second_stage?.payloads[0]?.payload_mass_kg ? singleData?.rocket?.second_stage?.payloads[0]?.payload_mass_kg + ' kg' : 'empty'}</p>
                </div>
                <div className='flex flex-col justify-center'>
                  <h4 className='text-light_red text-md font-bold'>Orbit</h4>
                  <p className='text-sm text-white'>{singleData?.rocket?.second_stage?.payloads[0]?.orbit}</p>
                </div>
              </div>
              <div className='flex items-center'>
                <a target='_blank' rel="noreferrer" className='bg-white mr-3 mt-4 w-10 h-10 rounded-full text-lg text-black flex items-center justify-center hover:scale-110 transition-transform duration-200' href={singleData?.links?.video_link}><RiYoutubeFill /></a>
                <a target='_blank' rel="noreferrer" className='bg-white mr-3 mt-4 w-10 h-10 rounded-full text-lg text-black flex items-center justify-center hover:scale-110 transition-transform duration-200' href={singleData?.links?.article_link}><BiNotepad /></a>
                <a target='_blank' rel="noreferrer" className='bg-white mr-3 mt-4 w-10 h-10 rounded-full text-lg text-black flex items-center justify-center hover:scale-110 transition-transform duration-200' href={singleData?.links?.wikipedia}><ImWikipedia /></a>
              </div>
            </div>
          </div>)
        }
      </div>
      {
        status === 'pending' && !showSpaceData.length && <div className='w-full flex items-center justify-center'><img className='w-1/3' src={preloder} alt="preloder" /></div>
      }
      {
        !showSpaceData.length && status === 'success' && <h1 className='text-white text-4xl  flex items-center justify-center mt-32'>Data Not Found</h1>
      }
    </div >
  );
};

export default SpaceX;