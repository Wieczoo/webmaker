import React from 'react';

import '../../styles/shop.css';
export default function Shop() {
  return (
      <>
      <h2>Shop</h2>
      <div id='templates'>
        <div class='template-row'>
          <header>Free templates</header>
          <div class='template-content'>
            <div class='template'>
              <div class='preview'></div>
              <div class='price'>0 PLN</div>
              <button>Buy template</button>
            </div>
          </div>
        </div>

        <div class='template-row'>
          <header>Payed templates</header>
          <div class='template-content'>
            <div class='template'>
              <div class='preview'></div>
              <div class='price'>49.99 PLN</div>
              <button>Buy template</button>
            </div>
          </div>
        </div>
      </div>

      </>
  );
}