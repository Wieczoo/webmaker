import React,{useState} from 'react';
import * as ReactDOM from 'react-dom';
import { useDrag } from 'react-dnd';
import '../../styles/apperance.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import icon_desktop from '../../assets/pictures/icons/monitor.png';
import icon_mobile from '../../assets/pictures/icons/smartphone.png';
import Example from '../../components/Example';
import Creator from '../../components/Creator';
import WebsiteCreator from  '../../components/WebsiteCreator';

export default function Apperance() {
  const [elem, setElem] = useState([]);

  const elements = [{
      'id': 1,
      'name': 'text',
      'html': <p  className='editableText'>test</p>
  },{
    'id': 2,
    'name': 'h1',
    'html': <h1  className='editableText'>asd</h1>
},
  {
    'id': 3,
    'name': 'image',
    'html': <img   className='editableImage' src="https://cdn.discordapp.com/attachments/1008571195345608704/1106224781122080829/Nathy_Lahat_cinnamon_flavored_Whisky_vintage_label_938b19f4-52cd-4a7e-9ec4-40300b563078.png"></img>
}];





  return (
      
      <>
      <h2>Apperance</h2>
      <div id='ap'>
        <div class='bar side'>
          <div id='tree'>
            <span>Elementy</span>
            {/* <DndProvider backend={HTML5Backend}>
              <Example></Example>
            </DndProvider> */}
           {/* <DndProvider backend={HTML5Backend}>
      <Creator />
    </DndProvider> */}
          <WebsiteCreator></WebsiteCreator>
          </div>
        </div>
        {/* <div class='side'>
          <div class= 'header bar'>
            <button><img alt='a' src={icon_mobile} ></img></button>
            <button><img alt='a' src={icon_desktop} ></img></button>
          </div>
          
        </div> */}
        {/* <div class='bar side'> */}
          {/* <div id='selected-element'>Body</div> */}
          {/* <div class='option-section'>
            <header>Selector &#8595;</header>
            <div class='options'>
            <label for='id'>Id:</label> */}
            {/* <input type='text' name='id' onChange={(e) =>  {setValueText(e.target.value)}}></input>
            <button>Zmien</button> */}
              {/* <span>
                <label for='id'>Id:</label>
                <input type='text' name='id'></input>
              </span>

              <span>
                <label for='class'>Class:</label>
                <input type='text' name='class'></input>
              </span> */}
            {/* </div>
          </div> */}

          {/* <div class='option-section'>
            <header>Layout &#8595;</header>
            <div class='options'></div>
          </div> */}

          {/* <div class='option-section'>
            <header>Size &#8595;</header>
            <div class='options'></div>
          </div> */}
        {/* </div> */}
      </div>
      </>
  );
}