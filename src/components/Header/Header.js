import React from 'react';
import img from '../../images/logo.png'
const Header = () => {
  return (
    <div className='bg-white w-full py-3 mb-6'>
      <div className='container px-4 mx-auto flex items-center sm:justify-between justify-center flex-col sm:flex-row'>
        <div className='flex items-center'>
          <img className='w-16' src={img} alt="logo" />
          <h1 className='font-bold text-xl text-transparent font-san'>SpaceX Dashboard</h1>
        </div>
        <ul className='flex items-center gap-4'>
          <li><a className='text-md font-medium text-transparent' href="#">Rockets</a></li>
          <li><a className='text-md font-medium text-transparent' href="#">Missions</a></li>
          <li><a className='text-md font-medium text-transparent' href="#">Profile</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;