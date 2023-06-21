import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyPages = () => {
    const [data,setData] = useState([]);
    const GetData = () => {
        axios.get(window.$url+"/Export/files?folderPath="+localStorage.getItem('email'))
        .then(response => {
            setData(response.data);
        })
    }

    useEffect(()=>{
        GetData();
    },[])



    const handleDeletePage = (pageName) => {

          axios.delete(window.$url+"/Export/delete",{
            data:  {
            email: localStorage.getItem('email'),
            name: pageName
            }
          })
        .then(response => {
            GetData();
        })
    }

  return (
    <div className='user-pages-container'>
        {
        data.map((page) => 
        <div>
            <span>{page}</span>
            <Link target='_blank' to={window.$remotehost+localStorage.getItem('email')+"/"+page }><span>Zobacz</span></Link>
            <span onClick={() => handleDeletePage(page)}>Usuń</span>
        </div>
        
        )
        }

    </div>
  );
};

export default MyPages;
