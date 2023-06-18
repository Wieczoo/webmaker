import { useState } from "react";
import {useNavigate,useLocation } from "react-router-dom";

const HomePage = () =>{
    const location = useLocation();
    const [pageName,setPageName] = useState(location.pathname);
    
    return(
        <>
            <header>{pageName?pageName:''}</header>
            <section></section>
        </>
    );
}

export default HomePage;