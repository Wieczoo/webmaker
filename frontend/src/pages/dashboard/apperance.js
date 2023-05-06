
import React, {useState}from 'react';


import '../../styles/apperance.css';
export default function Apperance() {
  const [data,setData] = useState();



  return (
      <>
      <h2>Apperance</h2>
      <div id='ap'>
        <div className='content'>
          <p onClick={() =>setData("Właściwości elementu 1")}> Element 1</p>
          <p onClick={() =>setData("Właściwości elementu 2")}> Element 2</p>
        </div>
        <div className="RigthPanel">{data}</div>
      </div>
      </>
  );
}