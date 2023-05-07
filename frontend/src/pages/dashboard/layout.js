import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import '../../styles/layout.css';




import icon_home from '../../assets/pictures/icons/home.png';
import icon_pages from '../../assets/pictures/icons/file.png';
import icon_settings from '../../assets/pictures/icons/setting.png';
import icon_logout from '../../assets/pictures/icons/logout.png';
import icon_shop from '../../assets/pictures/icons/shopping-cart.png';
import icon_apperance from '../../assets/pictures/icons/dashboard.png';
import icon_profile from '../../assets/pictures/icons/user.png';
export default function Layout() {
  const navigate = useNavigate();
  const [style, setStyle] = useState("rollState");
  const [spanDisplay, setSpanDisplay] = useState("spanDisplay_ON");
  let change =0;
  const roll = () => {
    if(change===0)
    {
      change=1;
      console.log("you just clicked");
      setStyle("rollState2");
      setSpanDisplay('spanDisplay_OFF');
    }
    else
    {
      setStyle("rollState");
      setSpanDisplay('spanDisplay_ON');
      change=0;
    }
    
  };


  return (
      <>
        <aside className={style} id='sidebar'>
          <div onClick={() => roll()} id='logo'>Logo</div>
          <div id='menu'>
            <button onClick={() => navigate('home')}><img class='menu-icon'alt='home' src={icon_home}></img><span className={spanDisplay}>Home</span></button>
            <button onClick={() => navigate('shop')}><img class='menu-icon'alt='home' src={icon_shop}></img><span className={spanDisplay}>Shop</span></button>
            <button onClick={() => navigate('pages')}><img class='menu-icon'alt='home' src={icon_pages}></img><span className={spanDisplay}>Pages</span></button>
            <button onClick={() => navigate('apperance')}><img class='menu-icon'alt='home' src={icon_apperance}></img><span className={spanDisplay}>Apperance</span></button>
            <button onClick={() => navigate('settings')}><img class='menu-icon'alt='home' src={icon_settings}></img><span className={spanDisplay}>Settings</span></button>
          </div>
          <div id='bottom'>
          <button id='logout'onClick={() => navigate('profile')}><img class='menu-icon'alt='home' src={icon_profile}></img><span className={spanDisplay}>Profile</span></button>
          <button id='logout'onClick={() => navigate('../')}><img class='menu-icon'alt='home' src={icon_logout}></img><span className={spanDisplay}>Logout</span></button>
          </div>
         
        </aside>
        <section id='main'>
            <Outlet/>
        </section>
      </>
  );
}