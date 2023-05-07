import React, {useState,useEffect} from 'react';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import '../../styles/login.css'; 
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const API_URL = "https://localhost:7298/api/Authentication/login";
  function login (){
    console.log('test');
    return axios
      .post(API_URL, {
        "email": email,
        "password":password
      })
      .then(response => {
        console.log(response);
        if (response.data.token) {
         
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.data);
        }

        return response.data;
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('user');
    if(token){
      const decoded = jwt_decode(token);
      console.log()
      if( decoded.Role == 'User') {
        navigate('user');
      } else if (decoded.Role == 'Admin'){
        navigate('dashboard');
      }
    

    }
  }, []);

  return (
      <>
      <form>
          <h2>Login Panel</h2>
          <input type='text' placeholder='username' onChange={e => setEmail(e.target.value)} ></input>
          <input type='password' placeholder='password' onChange={e => setPassword(e.target.value)}></input>
          
          <button onClick={() => navigate('register')}>Register</button>

      </form>
      <button onClick={() => login()}>Login</button>
      </>
  );
}