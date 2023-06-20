import { useState } from "react";
import {useNavigate,useLocation } from "react-router-dom";
import MyPages from '../components/pages/MyPages'

const PagesPage = () =>{

    return(
        <>
            <header>My Pages</header>
            <MyPages></MyPages>
        </>
    );
}

export default PagesPage;