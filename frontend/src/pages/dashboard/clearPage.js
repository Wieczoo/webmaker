import React from 'react';
import { Interweave } from 'interweave';
import '../../styles/clearPage.css';

export default function ClearPage() {
    const pageContent = localStorage.getItem('pageContent')

  return (
      <>
      <div><Interweave content={pageContent} />
</div>
      </>
  );
}