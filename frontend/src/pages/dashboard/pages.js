import React from 'react';

import { useNavigate } from 'react-router-dom';

export default function Pages() {
  const navigate = useNavigate();
  return (
      <>
      <h2>Twoje strony</h2>
      <button onClick={() => navigate('page1')}>Witryna 1</button>
      </>
  );
}