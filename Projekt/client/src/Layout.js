import { Outlet, UNSAFE_DataRouterStateContext, useNavigate } from "react-router-dom";
import React,{ useState,useEffect } from "react";

import './styles/main.css';

// import assets
import icon_logo from './assets/logo.png';
import icon_home from './assets/home.png';
import icon_shop from './assets/shop.png';
import icon_page from './assets/page.png';
import icon_user from './assets/user.png';
import icon_editor from './assets/apperance.png';
import icon_fold from './assets/fold.png';
import icon_unfold from './assets/unfold.png';

const Layout = () =>{
    const navigate = useNavigate();

    const [fullsideView,setFullsideView] = useState(false);
    const [activePage,setActivePage] = useState('home');
    const [isAdmin,setIsAdmin] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem('role')=='Admin'){
            setIsAdmin(true)
        }
    },[])

    const logout = () =>{
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/')
    }

    return(
        <>
            <div id="sidebar" style={{width:fullsideView?'200px':'40px',minWidth:fullsideView?'200px':'40px'}}>
                <span className="menuElement logo"><img alt='icon' src={icon_logo}></img></span>
                <span onClick={()=>{navigate('home')}} className="menuElement"><img alt='icon' src={icon_home}></img><a style={{display:fullsideView?'block':'none'}}>Home</a></span>
                <span onClick={()=>{navigate('shop')}} className="menuElement"><img alt='icon' src={icon_shop}></img><a style={{display:fullsideView?'block':'none'}}>Shop</a></span>
                <span onClick={()=>{navigate('pages')}} className="menuElement"><img alt='icon' src={icon_page}></img><a style={{display:fullsideView?'block':'none'}}>Pages</a></span>
                <span onClick={()=>{navigate('editor')}} className="menuElement"><img alt='icon' src={icon_editor}></img><a style={{display:fullsideView?'block':'none'}}>Editor</a></span>
                {
                    isAdmin? <span onClick={()=>{navigate('admin')}} className="menuElement"><img alt='icon' src={icon_user}></img><a style={{display:fullsideView?'block':'none'}}>Admin</a></span> : null
                }
                <div id="bottomMenu">
                    <span onClick={()=>{navigate('profile')}} className="menuElement"><img alt='icon' src={icon_user}></img><a style={{display:fullsideView?'block':'none'}}>Profile</a></span>
                    <span onClick={()=>logout()} className="menuElement"><img alt='icon' src={icon_user}></img><a style={{display:fullsideView?'block':'none'}}>Wyloguj</a></span>
                </div>
                <span id='roll' onClick={()=>{setFullsideView(!fullsideView)}} className="menuElement" style={{left:fullsideView?'200px':'40px'}}><img alt='icon' style={{transform:'rotate(90deg)'}}src={fullsideView?icon_fold:icon_unfold}></img></span>
            </div>
            <div id="mainContainer"><Outlet/></div>
        </>
    );


}

export default Layout;