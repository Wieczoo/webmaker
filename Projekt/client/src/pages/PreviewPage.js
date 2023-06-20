
import React, { useEffect, useState } from 'react';

import '../styles/editorBeta.css';

const PagePreview = () =>{
    const [display,setDisplay] = useState(false);
    const [selectedPage,setSelectedPage] = useState({});
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramValue = urlParams.get('param');
        
        if (paramValue) {
        setDisplay(true);
          const paramObject = JSON.parse(paramValue);
          setSelectedPage(paramObject);
          console.log('Odebrany parametr:', paramObject);
        }
      }, []);

      const renderPreviewElements = (elements) => {
        //debugger;
        return elements.map((element) => {
          if (element.type === 'div') {
            return (
              <div
                key={element.id}
                className={`previewElement`}
                style={element.styles}

              >
                {element.elements && element.elements.length > 0 && renderPreviewElements(element.elements)}
              </div>
            );
          } else if (element.type === 'text') {
            return (
              <a
                key={element.id}
                className={`previewText`}
                style={element.styles}           
              >
                {element.text}
              </a>
            );
          }
          else if (element.type === 'image') {
            return (
              <img
                alt='image'
                className={`previewText`}
                key={element.id}
                style={element.styles}
                src={element.styles.url}
              ></img>
            );
          }
          else if (element.type === 'button') {
            return (
                <a href={element.styles.link}>
              <button
                alt='button'
                className={`previewText`}
                key={element.id}
                style={element.styles}
                src={element.styles.url}
              >
                  {element.text}
              </button></a>
            );
          }

          return null;
        });
      };

      
    return(
        <>
        {!display?<h2>Page preview. Please choose page in Editor to display in preview.</h2>:
       
        <div id='editorPreview' className='previewDisplay'>
                {selectedPage !== null ? (
                <div
                    id='pagePreviewBody'
                    style={selectedPage.styles ? { background: selectedPage.styles.background } : {}}
                >
                    {selectedPage &&
                    selectedPage.elements &&
                    selectedPage.elements.length > 0 &&
                    renderPreviewElements(selectedPage.elements)}
                </div>
                ) : null}
            </div>

        }
            
        </>
    );
}

export default PagePreview;