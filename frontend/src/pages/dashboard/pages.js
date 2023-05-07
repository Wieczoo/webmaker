import React from 'react';

import '../../styles/pages.css';
import icon_deplayed from '../../assets/pictures/icons/checkbox.png';
import icon_redirect from '../../assets/pictures/icons/export.png';
export default function Pages() {
  return (
      <>
      <h2>Pages</h2>
      <button class='btn'>Add new Page</button>
      <table>
        <tr>
          <td><input type='checkbox'></input></td>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
          <th><img alt='deplayed' id='deploy-status' src={icon_deplayed}></img></th>
          <th></th>
        </tr>
        <tr>
            <td><input type='checkbox'></input></td>
            <td>Strona Główna</td>
            <td>Piotr Wieczorek</td>
            <td>26.04.2023</td>
            <td><div class='deployed'></div></td>
            <td><img alt='redirect' class='redirect'src={icon_redirect}></img></td>
        </tr>
        <tr>
            <td><input type='checkbox'></input></td>
            <td>Kontakt</td>
            <td>Piotr Wieczorek</td>
            <td>26.04.2023</td>
            <td><div class='no-deployed'></div></td>
            <td><img alt='redirect' class='redirect'src={icon_redirect}></img></td>
        </tr>
      </table>
      </>
  );
}