import React from 'react';

import '../../styles/apperance.css';

import icon_desktop from '../../assets/pictures/icons/monitor.png';
import icon_mobile from '../../assets/pictures/icons/smartphone.png';
export default function Apperance() {
  return (
      <>
      <h2>Apperance</h2>
      <div id='ap'>
        <div class='bar side'>
          <div id='tree'>
            <span>Body</span>
          </div>
        </div>
        <div class='side'>
          <div class= 'header bar'>
            <button><img alt='a' src={icon_mobile} ></img></button>
            <button><img alt='a' src={icon_desktop} ></img></button>
          </div>
        </div>
        <div class='bar side'>
          <div id='selected-element'>Body</div>

          <div class='option-section'>
            <header>Selector &#8595;</header>
            <div class='options'>
              <span>
                <label for='id'>Id:</label>
                <input type='text' name='id'></input>
              </span>

              <span>
                <label for='class'>Class:</label>
                <input type='text' name='class'></input>
              </span>
            </div>
          </div>

          <div class='option-section'>
            <header>Layout &#8595;</header>
            <div class='options'></div>
          </div>

          <div class='option-section'>
            <header>Size &#8595;</header>
            <div class='options'></div>
          </div>
        </div>
      </div>
      </>
  );
}