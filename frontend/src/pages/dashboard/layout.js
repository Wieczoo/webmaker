import { Outlet } from "react-router-dom";

import { useNavigate } from 'react-router-dom';

import React from 'react';
import '../../styles/layout.css';
export default function Layout() {
  const navigate = useNavigate();
  return (
      <>
        <aside id='sidebar'>
          <div id='logo'>Logo</div>
          <div id='menu'>
            <button onClick={() => navigate('home')}>Home</button>
            <button onClick={() => navigate('shop')}>Shop</button>
            <button onClick={() => navigate('pages')}>Pages</button>
            <button onClick={() => navigate('apperance')}>Apperance</button>
            <button onClick={() => navigate('settings')}>Settings</button>
          </div>
          <button id='logout'onClick={() => navigate('../')}>Logout</button>
        </aside>
        <section id='main'>
            <Outlet/>
        </section>
      </>
  );
}