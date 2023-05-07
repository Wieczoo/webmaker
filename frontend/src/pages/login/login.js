import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css'; 
export default function Login() {
const navigate = useNavigate();
  return (
      <>
      <form>
          <h2>Login Panel</h2>
          <input type='text' placeholder='username'></input>
          <input type='password' placeholder='password'></input>
          <button onClick={() => navigate('dashboard')}>Login</button>
          <button onClick={() => navigate('register')}>Register</button>

      </form>
      </>
  );
}