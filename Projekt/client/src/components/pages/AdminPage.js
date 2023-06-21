import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPages = () => {
    const [data,setData] = useState([]);
    const GetData = () => {
        axios.get(window.$url+"/Export/Allfiles")
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
      <div className="user-pages-container">
        {data.map((page) => (
          <div className="dir" key={page.dirname}>
            Katalog: {page.dirname}
            <div>
              {page.files.map((file) => (
                
                <div>
            <span>{file}</span>
            <Link target='_blank' to={window.$remotehost+page.dirname+"/"+file }><span>Zobacz</span></Link>
            <span onClick={() => handleDeletePage(page)}>Usuń</span>
        </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

export default AdminPages;
