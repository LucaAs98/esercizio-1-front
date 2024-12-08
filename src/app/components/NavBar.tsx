import React from 'react';

const NavBar = () => {
  return (
    <nav className='w-full bg-gray-100 py-4 px-4 flex items-center justify-center relative sticky top-0' style={{ height: 'var(--navbar-height)' }}>
      <div className='text-xl font-bold text-gray-800'>Articles</div>
    </nav>
  );
};

export default NavBar;
