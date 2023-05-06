import React from 'react';

import { useNavigate } from 'react-router-dom';
import '../../styles/login.css'; 
export default function Register() {
const navigate = useNavigate();
  return (
      <>
      <form>
          <h2>Register Panel</h2>
          <input type='text' placeholder='username'></input>
          <input type='password' placeholder='password'></input>
          <input type='password' placeholder='re-enter password'></input>
          <button onClick={() => navigate('/')}>Register</button>
          <button onClick={() => navigate('/')}>Return to login</button>

      </form>
      </>
  );
}