import React, { useState } from 'react';
import '../styles/editorBeta.css';

import icon_rectangular from '../assets/rectangular.png';
import icon_text from '../assets/text.png';
import icon_trash from '../assets/trash.png';
import icon_preview from '../assets/preview.png';
import icon_close from '../assets/close.png';
import icon_addPage from '../assets/addPage.png';
import exportToHTML from '../components/ExportToHTML'

const PageEditor = () => {
  const [editorSelectorView, setEditorSelectedView] = useState(false);
  const [pages, setPages] = useState([]);
  const [newPageTitle, setNewPageTitle] = useState();
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [selectedPage, setSelectedPage] = useState({});
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [newPageBlock, setNewPageBlock] = useState(false);
  const [isSelectedText, setIsSelectedText] = useState(false);


  const defaultStylesBlock = {
    background: '#fff',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    marginTop:'',
    marginBottom:'',
    marginLeft:'',
    marginRight:'',
    paddingTop:'',
    paddingBottom:'',
    paddingLeft:'',
    paddingRight:'',
    boxSizing:'border-box'
  };

  const addPage = () => {
    const newPage = {
      title: newPageTitle,
      type: 'body',
      id: '',
      class: '',
      styles: { background: '#fff' },
      elements: []
    };

    setPages([...pages, newPage]);
    setSelectedPage(newPage);
    setSelectedElementId(null);
    setSelectedTextId(null);
    setNewPageBlock(false);
  };

  const handleStyleChange = (event, styleName) => {
    const { value } = event.target;
    let elementsTmp;

    setSelectedPage((prevPage) => {
      const updatedElements = prevPage.elements.map((element) => {
        if (element.id === selectedElementId) {
          return {
            ...element,
            styles: {
              ...element.styles,
              [styleName]: value
            }
          };
        } else if (element.elements.length > 0 && ((element.elements.find((x) => x.id ===selectedElementId))!=undefined )) {
          const updatedNestedElements = element.elements.map((nestedElement) => {
            if (nestedElement.id === selectedElementId) {
              return {
                ...nestedElement,
                styles: {
                  ...nestedElement.styles,
                  [styleName]: value
                }
              };
            }
            return nestedElement;
          });
    
          return {
            ...element,
            elements: updatedNestedElements
          };
        }
        return element;
      });
    
      return {
        ...prevPage,
        elements: updatedElements
      };
    });
  };

  const openPage = (item) => {
    setSelectedPage(item);
    setSelectedElementId(null);
    setSelectedTextId(null);
  };

  const putDiv = () => {
    const temp = {
      type: 'div',
      id: Math.random().toString(),
      class: '',
      styles: defaultStylesBlock,
      elements: []
    };

    setSelectedPage((prevPage) => ({
      ...prevPage,
      elements: [...prevPage.elements, temp]
    }));
    setSelectedElementId(temp.id);
    setSelectedTextId(null);
    let tempPages = pages;
    let source  = pages.findIndex((e)=>e.title===selectedPage.title);
    tempPages[source] = selectedPage;
    setPages(tempPages);
  };
// dodawanie tekstu
  const putText = () => {
    const temp = {
      type: 'text',
      id: Math.random().toString(),
      class: '',
      text: 'Sample Text',
      styles: {
        color: 'black',
        fontSize: '16px',
        fontWeight: 'normal',
        fontFamily: 'Arial, sans-serif'
      }
    };

    setSelectedPage((prevPage) => {
      const updatedElements = prevPage.elements.map((element) => {
        if (element.id === selectedElementId) {
          return {
            ...element,
            elements: [...element.elements, temp]
          };
        }
        return element;
      });

      return {
        ...prevPage,
        elements: updatedElements
      };
    });

    setSelectedTextId(temp.id); 
    setPages(pages);
  };

  const handleTextChange = (event) => {
    const  value  = event.target.textContent;
    debugger;
    setSelectedPage((prevPage) => {
      const updatedElements = prevPage.elements.map((element) => {   
         if (element.elements.length > 0 && element.elements[0].id === selectedElementId) {
          const updatedNestedElements = element.elements.map((nestedElement) => {
            if (nestedElement.id === selectedElementId) {
              if (nestedElement.type === 'text') {
                return {
                  ...nestedElement,
                  text: value
                };
              }
            }
            return nestedElement;
          });
    
          return {
            ...element,
            elements: updatedNestedElements
          };
        }
        return element;
      });
    
      return {
        ...prevPage,
        elements: updatedElements
      };
    });
  };

  let skipOne;
  const setSelectedElementIdHandler = (isText,id)=> {
    if(skipOne){

    } else {
      skipOne =false;
      if(isText){
      console.log('tylko text');
      console.log('tylko text id:'+ id );
      skipOne = true;
      setSelectedElementId(id)
     // setIsSelectedText(true)
    } else {
      console.log('tylko div');
      setSelectedElementId(id)
      //setIsSelectedText(false)
    }
    }
    
    //setIsSelectedText(false)
  }


  const renderPreviewElements = (elements) => {
    return elements.map((element) => {
      if (element.type === 'div') {
        return (
          <div
            key={element.id}
            className={`previewElement ${element.id === selectedElementId ? 'selectedElement' : ''}`}
            style={element.styles}
            onClick={(e) => {
              
                 e.preventDefault();
                //console.log('div id:'+ element.id);
              //setSelectedElementId(element.id);

              setSelectedElementIdHandler(false,element.id)
              //setSelectedElementIdHandler()
              //setIsSelectedText(false)
              //console.log(element);
              //setSelectedTextId(null);
            }}
          >
            {element.elements && element.elements.length > 0 && renderPreviewElements(element.elements)}
          </div>
        );
      } else if (element.type === 'text') {
        return (
          <div
            key={element.id}
            className={`previewText ${element.id === selectedTextId ? 'selectedText' : ''}`}
            style={element.styles}
            onClick={(e) => {
                e.preventDefault();
              setSelectedTextId(element.id);
              //console.log(element);
             // console.log('text id:'+ element.id);
             setSelectedElementIdHandler(true,element.id)
             // setIsSelectedText(true);
              //setSelectedElementId(null);
            }}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleTextChange(e, element.id)}
            onInput={e => handleTextChange(e, element.id)}
          >
            {element.text}
          </div>
        );
      }
      return null;
    });
  };

const renderEditorElements = (elements) => {
  return (
    <div id="pagePreviewBody">
      <div className="editorElementContainer">
        {elements.map((element) => {
          if (element.type === 'div') {
            return (
              <div
                key={element.id}
                className={`editorElement ${element.id === selectedElementId ? 'selectedElement' : ''}`}
                onClick={() => {
                  setSelectedElementId(element.id);
                  setSelectedTextId(null);
                }}
              >
                <div className="elementTag">div</div>
                {element.elements && element.elements.length > 0 && renderEditorElements(element.elements)}
              </div>
            );
          } else if (element.type === 'text') {
            return (
              <div
                key={element.id}
                className={`editorText`}
              >
                <div className={`editorTextContent ${element.id === selectedTextId ? 'selectedElement' : ''}`} onClick={() => setSelectedTextId(element.id)}>
                  <div className="elementTag">--text</div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

const addPageView = () =>{
    return(
        <div id="overlay">
          <div id="modalBox">
            <div id="modalBoxHeader">
              <h3>New Page</h3>
              <button onClick={() => { setNewPageBlock(false) }}><img alt='close' src={icon_close} /></button>
            </div>
            <div id="modalBoxBody">
              <label>Title</label>
              <input type='text' onChange={(e) => { setNewPageTitle(e.target.value) }} />
              <button onClick={addPage}>Add page</button>
            </div>
          </div>
        </div>
      )
}
  

  
  
const handleExportToHTML = () => {
  const htmlCode = exportToHTML(pages);
  console.log(htmlCode);
  // Możesz wykorzystać htmlCode do zapisania jako plik lub przekazania go dalej w aplikacji
};

  return (
    <>
    {newPageBlock? addPageView():null}
    <div id='editorPage'>
      <div id='editor'>
        <div id='editorHeader'>
            {selectedPage &&(<h3>Selected page: {selectedPage.title}</h3>)}
        </div>
        <div id='editorBody'>
          <div id='editorSelector'>
            <div id='editorSelectorHeader'>
              <button className='editorSelectorHeaderButton' onClick={() => setEditorSelectedView(false)}>Pages</button>
              <button className='editorSelectorHeaderButton' onClick={() => setEditorSelectedView(true)}>Layout</button>
            </div>
            <div id="editorSelectorBody">
  {!editorSelectorView ? (
    <div className="section">
      <h3>My pages
        <button onClick={() => {setNewPageBlock(true);console.log(newPageBlock)}}><img alt='add' src={icon_addPage} /></button>
      </h3>
    
      {pages !== null ? (
        pages.map((item, index) => (
            <div key={index} className='pageList'>
                <button  onClick={() => openPage(item)}>
                    {item.title}
                </button>
                <button className='pageOption'>
                    <img alt='preview' src={icon_preview}></img>
                </button>
                <button className='pageOption'>
                    <img alt='delete' src={icon_trash}></img>
                </button>
            </div>
        ))
      ) : (
        null
      )}
    </div>
  ) : (
    <>
      <div className="section">
        <h3>Page layout</h3>
        <div className="editorContainer">
          {selectedPage && renderEditorElements(selectedPage.elements)}
        </div>
      </div>
      <div className="section">
        <h3>Elements</h3>
        <button onClick={handleExportToHTML}>Eksport do HTML</button>
        <div id='addButtonsSection'>
          <button className='addButton' onClick={putDiv}><img alt='' src={icon_rectangular}/><a>Div</a></button>
          <button className='addButton' onClick={putText}><img alt='' src={icon_text}/><a>Text</a></button>
        </div>
      </div>
    </>
  )}
</div>

          </div>
          <div id='editorPreview'>
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
          
        </div>
      </div>
      <div id='options'>
            {selectedElementId && selectedPage.elements && selectedPage.elements.length > 0 ? (
              <>
                <h3>Element Styles</h3>
                {selectedPage.elements.map((element) => {
                  if (element.id === selectedElementId) {
                    return (
                      <div key={element.id}>
                        <label>
                          Background Color:
                          <input
                            type='text'
                            name='background'
                            value={element.styles.background || ''}
                            onChange={(e) => handleStyleChange(e, 'background')}
                          />
                        </label>
                        <label>
                          Width:
                          <input
                            type='text'
                            name='width'
                            value={element.styles.width || ''}
                            onChange={(e) => handleStyleChange(e, 'width')}
                          />
                        </label>
                        <label>
                          Height:
                          <input
                            type='text'
                            name='height'
                            value={element.styles.height || ''}
                            onChange={(e) => handleStyleChange(e, 'height')}
                          />
                        </label>
                        <label>
                          Display:
                          <input
                            type='text'
                            name='display'
                            value={element.styles.display || ''}
                            onChange={(e) => handleStyleChange(e, 'display')}
                          />
                        </label>
                        <label>
                          justifyContent:
                          <input
                            type='text'
                            name='justifyContent'
                            value={element.styles.justifyContent || ''}
                            onChange={(e) => handleStyleChange(e, 'justifyContent')}
                          />
                        </label>
                        <label>
                          alignItems:
                          <input
                            type='text'
                            name='alignItems'
                            value={element.styles.alignItems || ''}
                            onChange={(e) => handleStyleChange(e, 'alignItems')}
                          />
                        </label>
                        {/* <label .option>
                          alignItems:
                          <input
                            type='text'
                            name='alignItems'
                            value={element.styles.alignItems || ''}
                            onChange={(e) => handleStyleChange(e, 'alignItems')}
                          />
                        </label> */}
                      </div>
                    );
                  } else if ( (element.elements.find((x) => x.id ===selectedElementId))!=undefined ){
                    let elemTmp = element.elements.find((x) => x.id ===selectedElementId);
                    return (
                    <div key={element.id}>
                        <label>
                       Rucham was kutasem
                          Color:
                          <input
                            type='text'
                            name='color'
                            value={elemTmp.styles.color || ''}
                            onChange={(e) => handleStyleChange(e, 'color')}
                          />
                        </label>
                        <label>
                        fontFamily:
                          <input
                            type='text'
                            name='fontFamily'
                            value={elemTmp.styles.fontFamily || ''}
                            onChange={(e) => handleStyleChange(e, 'fontFamily')}
                          />
                        </label>
                        <label>
                        fontSize:
                          <input
                            type='text'
                            name='fontSize'
                            value={elemTmp.styles.fontSize || ''}
                            onChange={(e) => handleStyleChange(e, 'fontSize')}
                          />
                        </label>
                        <label>
                        fontWeight:
                          <input
                            type='text'
                            name='fontWeight'
                            value={elemTmp.styles.fontWeight || ''}
                            onChange={(e) => handleStyleChange(e, 'fontWeight')}
                          />
                        </label>
                        <label>
                        width:
                          <input
                            type='text'
                            name='width'
                            value={elemTmp.styles.width || ''}
                            onChange={(e) => handleStyleChange(e, 'width')}
                          />
                        </label>
                        <label>
                        height:
                          <input
                            type='text'
                            name='height'
                            value={elemTmp.styles.height || ''}
                            onChange={(e) => handleStyleChange(e, 'height')}
                          />
                        </label>
                        {/* <label .option>
                          alignItems:
                          <input
                            type='text'
                            name='alignItems'
                            value={element.styles.alignItems || ''}
                            onChange={(e) => handleStyleChange(e, 'alignItems')}
                          />
                        </label> */}
                      </div>
                    )
                  } 
                  else {
                    return null;
                  }
                 
                })}
              </>
            ) : (
              <p>Select an element to view and edit its styles.</p>
            )}
          </div>
    </div></>
  );
};

export default PageEditor;
