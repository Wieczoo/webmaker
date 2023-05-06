import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Page1() {
    const navigate = useNavigate();
  return (
      <>
      <h2>Twoje podstrony</h2>
      <button onClick={() => navigate('page2')}>Strona 1</button>
      <button onClick={() => navigate('page2')}>Strona 2</button>
      <button onClick={() => navigate('page2')}>Strona 3</button>
      </>
  );
}