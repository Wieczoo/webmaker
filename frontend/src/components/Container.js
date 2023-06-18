import { memo, useState } from 'react'
import { Colors } from './Colors.js'
import { SourceBox } from './SourceBox.js'
import { StatefulTargetBox as TargetBox } from './TargetBox.js';
import ReactDomServer from 'react-dom/server';

export const Container = memo(function Container() {
  const editableTextHandle = () => {

   // debugger;
  }
  
  const createPageHandle = () => {
   const pageJSX = <div>
    <div class='ClearPageHeader'>{document.querySelector('.headerDrop').childNodes[0].childNodes[0].childNodes[0].innerHTML}</div>
    <div class='ClearPageContent'>
      <div>
      {        document.querySelector('.contentDrop ').childNodes[0].childNodes[0].childNodes[0].innerHTML}
      </div>
      <div>
      {        document.querySelector('.contentDrop ').childNodes[1].childNodes[0].childNodes[0].innerHTML}
      </div>
    </div>
    <div class='ClearPageFooter'>
      {document.querySelector('.footerDrop').childNodes[0].childNodes[0].childNodes[0].innerHTML}
    </div>
   </div>;
   let pageContent = ReactDomServer.renderToString(pageJSX);
   localStorage.setItem('pageContent',pageContent);
    //debugger;
  }



  const elements = [{
    'id': 0,
    'name': 'Tekst',
},{
  'id': 1,
  'name': 'Nagłówek',
},
{
  'id': 2,
  'name': 'Zdjęcie',
}];



 
const [elementsList, setElementsList] = useState([{
  'component': <></>
},{
  'component': <></>
},{
  'component': <></>
},{
  'component': <></>
}]);

const handleChange = (element, index) => {
  debugger;
  let newArr = [...elementsList];
  newArr[index] = element; 
  setElementsList(newArr);
  console.log('aktu', index);
};

const getElement = (index) => {
  return elementsList[index];
};
  return (
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
      <div style={{ float: 'left' }}>
        <SourceBox color={Colors.BLUE} >
              {
                  elements.map((element)=>{
                        return (
                          <SourceBox color={Colors.YELLOW} id={element.id}>{element.name} </SourceBox>
                        )
                  })
              }

        </SourceBox>
        <button onClick={createPageHandle}>Stwórz stronę</button>
      </div>

      <div className='dropPlace' style={{ float: 'left', marginLeft: '5rem', marginTop: '.5rem' }}>
        <div className='headerDrop'>
          <TargetBox />
        </div>
        <div className='contentDrop'>
          <TargetBox  />
          <TargetBox  />
        </div>
        <div className='footerDrop'>
          <TargetBox />
        </div>
      </div>
    </div>
  )
})
