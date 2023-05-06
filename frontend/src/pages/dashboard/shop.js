import React from 'react';
import Card from './../../assets/card';

import '../../styles/shop.css';

export default function Shop() {
  return (
      <>
      <h2>Shop</h2>
      <>
      <h2>Zakupione zasoby</h2>
      <div className='productContainer'>
      <Card name='Produkt 1'></Card>
      <Card name='Produkt 2'></Card>
      <Card name='Produkt 3'></Card>
      <Card name='Produkt 4'></Card>
      <Card name='Produkt 5'></Card>
      <Card name='Produkt 5'></Card>
      </div>
      </>
      </>
  );
}

  