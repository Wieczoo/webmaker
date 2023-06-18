import React from 'react';
//import '../styles/Sidebar.css';

const Sidebar = ({ addSection }) => {
  return (
    <div className='Sidebar'>
      <div>
        <button onClick={() => addSection('Section 1', 'column')}>Add Section column</button>
        <button onClick={() => addSection('Section 2', 'row')}>Add Section row</button>
      </div>
    </div>
  );
};

export default Sidebar;
