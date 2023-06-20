import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/editorBeta.css';

import icon_rectangular from '../assets/rectangular.png';
import icon_text from '../assets/text.png';
import icon_trash from '../assets/trash.png';
import icon_preview from '../assets/preview.png';
import icon_close from '../assets/close.png';
import icon_addPage from '../assets/addPage.png';
import icon_image from '../assets/image.png';
import icon_button from '../assets/button.png';
import exportToHTML from '../components/ExportToHTML'
import { Navigate } from 'react-router-dom';

const PageEditor = () => {

const navigate = useNavigate();

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

  const defaultStylesText = {
    color: 'black',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Arial, sans-serif',
    width: 'auto',
    height: 'auto',
    background :'transparent',
    marginTop:'',
    marginBottom:'',
    marginLeft:'',
    marginRight:'',
    paddingTop:'',
    paddingBottom:'',
    paddingLeft:'',
    paddingRight:''
  }

  const defaultStylesImage = {
    url : 'https://cdn.pixabay.com/photo/2023/06/05/08/39/flower-8041698_1280.jpg',
    width: '100px',
    height: '100px',
    background :'',
    marginTop:'',
    marginBottom:'',
    marginLeft:'',
    marginRight:'',
    paddingTop:'',
    paddingBottom:'',
    paddingLeft:'',
    paddingRight:''
  }

  const defaultStylesButton = {
    link : '',
    width: '100px',
    height: '100px',
    cursor:'pointer',
    color :'black',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Arial, sans-serif',
    background :'transparent',
    borderWidth:'0px',
    borderStyle:'solid',
    borderColor:'black',
    marginTop:'',
    marginBottom:'',
    marginLeft:'',
    marginRight:'',
    paddingTop:'',
    paddingBottom:'',
    paddingLeft:'',
    paddingRight:''
  }


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
      styles: defaultStylesText
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
    let tempPages = pages;
    let source  = pages.findIndex((e)=>e.title===selectedPage.title);
    tempPages[source] = selectedPage;
    setPages(tempPages);
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
    //debugger;
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
          >
            {element.text}
          </div>
        );
      }
      else if (element.type === 'image') {
        return (
          <img
            alt='image'
            className={`previewText ${element.id === selectedTextId ? 'selectedText' : ''}`}
            key={element.id}
            style={element.styles}
            onClick={(e)=>{
                e.preventDefault();
                setSelectedElementIdHandler(true,element.id);
                setSelectedTextId(element.id);

            }}
            src={element.styles.url}
          ></img>
        );
      }
      else if (element.type === 'button') {
        return (
          <button
            alt='button'
            className={`previewText ${element.id === selectedTextId ? 'selectedText' : ''}`}
            key={element.id}
            style={element.styles}
            onClick={(e)=>{
                e.preventDefault();
                setSelectedElementIdHandler(true,element.id);
                setSelectedTextId(element.id);

            }}
            src={element.styles.url}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleTextChange(e, element.id)}
          >
              {element.text}
          </button>
        );
      }


      return null;
    });
  };
const deleteObject = (element,index,upperindex =null) =>{
    console.log(element);
    console.log(index);
    console.log(upperindex);
    console.log(selectedPage.elements);
    if(upperindex != null){
        const updatedSections = [...selectedPage.elements];
        updatedSections[upperindex].elements.splice(index, 1);
        setSelectedPage({
            title: newPageTitle,
            type: 'body',
            id: '',
            class: '',
            styles: { background: '#fff' },
            elements: updatedSections
          });
    } else {

    }
    // let tempArr = pages;

    // let source  = pages.findIndex((e)=>e.title===selectedPage.title);


    // switch (idx.type)
    // {
    //     case 'div':
    //         let sourceDiv  = tempArr[source].elements.findIndex((e)=>e.id===idx.id);

    //         const x = tempArr.splice(sourceDiv,1);
    //         setPages(tempArr);

    //         break;
    //         default:
    //             break;
    // }
}
const renderEditorElements = (elements,upperindex = null) => {
  return (
    <div id="pagePreviewBody">
      <div className="editorElementContainer">
        {elements.map((element,index) => {
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
                <div className="elementTag"><a>Div</a><button onClick={()=>{deleteObject(element,index)}}><img alt='delete' src={icon_trash}></img></button></div>
                {element.elements && element.elements.length > 0 && renderEditorElements(element.elements,index)}
              </div>
            );
          } else if (element.type === 'text') {
            return (
              <div
                key={element.id}
                className={`editorText`}
              >
                <div className={`editorTextContent ${element.id === selectedTextId ? 'selectedElement' : ''}`} onClick={() => setSelectedTextId(element.id)}>
                  <div className="elementTag"><a>--text</a><button onClick={()=>{deleteObject(element,index,upperindex)}}><img alt='delete' src={icon_trash}></img></button></div>
                </div>
              </div>
            );
          }
          else if (element.type === 'image') {
            return (
              <div
                key={element.id}
                className={`editorText`}
              >
                <div className={`editorTextContent ${element.id === selectedTextId ? 'selectedElement' : ''}`} onClick={() => setSelectedTextId(element.id)}>
                  <div className="elementTag"><a>--image</a><button onClick={()=>{deleteObject(element,index,upperindex)}}><img alt='delete' src={icon_trash}></img></button></div>
                </div>
              </div>
            );
          }
          else if (element.type === 'button') {
            return (
              <div
                key={element.id}
                className={`editorText`}
              >
                <div className={`editorTextContent ${element.id === selectedTextId ? 'selectedElement' : ''}`} onClick={() => setSelectedTextId(element.id)}>
                  <div className="elementTag"><a>--button</a><button onClick={()=>{deleteObject(element,index,upperindex)}}><img alt='delete' src={icon_trash}></img></button></div>
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
  

  
  
const putImage = () =>{
    const temp = {
        type: 'image',
        id: Math.random().toString(),
        styles: defaultStylesImage
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
  
      setPages(pages);
      let tempPages = pages;
    let source  = pages.findIndex((e)=>e.title===selectedPage.title);
    tempPages[source] = selectedPage;
    setPages(tempPages);
}
  const putButton = () =>{
    const temp = {
        type: 'button',
        text:'Button',
        id: Math.random().toString(),
        styles: defaultStylesButton
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
  
      setPages(pages);
      let tempPages = pages;
    let source  = pages.findIndex((e)=>e.title===selectedPage.title);
    tempPages[source] = selectedPage;
    setPages(tempPages);
}
const redirectToPreview = () =>{
    // navigate('../../../preview',{ state: { target: "_blank" } });

    const url = new URL("http://localhost:3000/preview");
    const param =JSON.stringify(selectedPage);
    url.searchParams.set("param", param); 
    window.open(url.toString(), "_blank");


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
                <button className='pageOption' onClick={redirectToPreview}>
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
       
      <button onClick={handleExportToHTML}>Eksport do HTML</button>
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
        <div id='addButtonsSection'>
          <button className='addButton' onClick={putDiv}><img alt='' src={icon_rectangular}/><a>Div</a></button>
          <button className='addButton' onClick={putText}><img alt='' src={icon_text}/><a>Text</a></button>
          <button className='addButton' onClick={putImage}><img alt='' src={icon_image}/><a>Image</a></button>
          <button className='addButton' onClick={putButton}><img alt='' src={icon_button}/><a>Button</a></button>
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
                //   debugger;
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
                        <label>
                          flexDirection:
                          <input
                            type='text'
                            name='flexDirection'
                            value={element.styles.flexDirection || ''}
                            onChange={(e) => handleStyleChange(e, 'flexDirection')}
                          />
                        </label>
                        <label className="labelVariation">
                          Margin
                          <div>
                              <label>
                                  top
                                    <input
                                    type='text'
                                    name='marginTop'
                                    value={element.styles.marginTop || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginTop')}
                                    />
                              </label>
                              <label>
                                  right
                                    <input
                                    type='text'
                                    name='marginRight'
                                    value={element.styles.marginRight || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginRight')}
                                    />
                              </label>
                              <label>
                                  bottom
                                    <input
                                    type='text'
                                    name='marginRight'
                                    value={element.styles.marginBottom || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginBottom')}
                                    />
                              </label>
                              <label>
                                  left
                                    <input
                                    type='text'
                                    name='marginLeft'
                                    value={element.styles.marginLeft || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginLeft')}
                                    />
                              </label>
                          </div>
                        </label>
                        <label className="labelVariation">
                          Padding
                          <div>
                              <label>
                                  top
                                    <input
                                    type='text'
                                    name='paddingTop'
                                    value={element.styles.paddingTop || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingTop')}
                                    />
                              </label>
                              <label>
                                  paddingRight
                                    <input
                                    type='text'
                                    name='paddingRight'
                                    value={element.styles.paddingRight || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingRight')}
                                    />
                              </label>
                              <label>
                                  bottom
                                    <input
                                    type='text'
                                    name='paddingBottom'
                                    value={element.styles.paddingBottom || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingBottom')}
                                    />
                              </label>
                              <label>
                                  left
                                    <input
                                    type='text'
                                    name='paddingLeft'
                                    value={element.styles.paddingLeft || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingLeft')}
                                    />
                              </label>
                          </div>
                        </label>
                      </div>
                    );
                  } else if ( (element.elements.find((x) => x.id ===selectedElementId))!=undefined ){
                    let elemTmp = element.elements.find((x) => x.id ===selectedElementId);
                    if(elemTmp.type!=='image' && elemTmp.type!=='button')
                    {
                    return (
                    <div key={element.id}>
                        <label>
                          Color:
                          <input
                            type='text'
                            name='color'
                            value={elemTmp.styles.color || ''}
                            onChange={(e) => handleStyleChange(e, 'color')}
                          />
                        </label>
                        <label>
                          Background Color:
                          <input
                            type='text'
                            name='background'
                            value={elemTmp.styles.background || ''}
                            onChange={(e) => handleStyleChange(e, 'background')}
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
                        <label className="labelVariation">
                          Margin
                          <div>
                              <label>
                                  top
                                    <input
                                    type='text'
                                    name='marginTop'
                                    value={elemTmp.styles.marginTop || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginTop')}
                                    />
                              </label>
                              <label>
                                  right
                                    <input
                                    type='text'
                                    name='marginRight'
                                    value={elemTmp.styles.marginRight || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginRight')}
                                    />
                              </label>
                              <label>
                                  bottom
                                    <input
                                    type='text'
                                    name='marginRight'
                                    value={elemTmp.styles.marginBottom || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginBottom')}
                                    />
                              </label>
                              <label>
                                  left
                                    <input
                                    type='text'
                                    name='marginLeft'
                                    value={elemTmp.styles.marginLeft || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginLeft')}
                                    />
                              </label>
                          </div>
                        </label>
                        <label className="labelVariation">
                          Padding
                          <div>
                              <label>
                                  top
                                    <input
                                    type='text'
                                    name='paddingTop'
                                    value={elemTmp.styles.paddingTop || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingTop')}
                                    />
                              </label>
                              <label>
                                  paddingRight
                                    <input
                                    type='text'
                                    name='paddingRight'
                                    value={elemTmp.styles.paddingRight || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingRight')}
                                    />
                              </label>
                              <label>
                                  bottom
                                    <input
                                    type='text'
                                    name='paddingBottom'
                                    value={elemTmp.styles.paddingBottom || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingBottom')}
                                    />
                              </label>
                              <label>
                                  left
                                    <input
                                    type='text'
                                    name='paddingLeft'
                                    value={elemTmp.styles.paddingLeft || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingLeft')}
                                    />
                              </label>
                          </div>
                         
                        </label>

                       
                      </div>
                    )
                    }
                    else if(elemTmp.type==='image' && elemTmp.type!=='button')
                    {
                        return(
                            <div key={element.id}>
                        <label>
                            Image url:
                            <input
                            type='text'
                            name='url'
                            value={elemTmp.styles.url|| ''}
                            onChange={(e) => handleStyleChange(e, 'url')}
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
                        <label className="labelVariation">
                          Margin
                          <div>
                              <label>
                                  top
                                    <input
                                    type='text'
                                    name='marginTop'
                                    value={elemTmp.styles.marginTop || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginTop')}
                                    />
                              </label>
                              <label>
                                  right
                                    <input
                                    type='text'
                                    name='marginRight'
                                    value={elemTmp.styles.marginRight || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginRight')}
                                    />
                              </label>
                              <label>
                                  bottom
                                    <input
                                    type='text'
                                    name='marginRight'
                                    value={elemTmp.styles.marginBottom || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginBottom')}
                                    />
                              </label>
                              <label>
                                  left
                                    <input
                                    type='text'
                                    name='marginLeft'
                                    value={elemTmp.styles.marginLeft || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginLeft')}
                                    />
                              </label>
                          </div>
                        </label>
                        <label className="labelVariation">
                          Padding
                          <div>
                              <label>
                                  top
                                    <input
                                    type='text'
                                    name='paddingTop'
                                    value={elemTmp.styles.paddingTop || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingTop')}
                                    />
                              </label>
                              <label>
                                  paddingRight
                                    <input
                                    type='text'
                                    name='paddingRight'
                                    value={elemTmp.styles.paddingRight || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingRight')}
                                    />
                              </label>
                              <label>
                                  bottom
                                    <input
                                    type='text'
                                    name='paddingBottom'
                                    value={elemTmp.styles.paddingBottom || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingBottom')}
                                    />
                              </label>
                              <label>
                                  left
                                    <input
                                    type='text'
                                    name='paddingLeft'
                                    value={elemTmp.styles.paddingLeft || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingLeft')}
                                    />
                              </label>
                          </div>
                         
                        </label>

                       
                      </div>
                        )
                    }
                    else if(elemTmp.type!=='image' && elemTmp.type==='button')
                    {
                        return(
                            <div key={element.id}>
                        <label>
                            Link url:
                            <input
                            type='text'
                            name='link'
                            value={elemTmp.styles.link|| ''}
                            onChange={(e) => handleStyleChange(e, 'link')}
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
                        <label>
                          Text Color:
                          <input
                            type='text'
                            name='color'
                            value={elemTmp.styles.color || ''}
                            onChange={(e) => handleStyleChange(e, 'color')}
                          />
                        </label>
                        <label>
                        Text font:
                          <input
                            type='text'
                            name='fontFamily'
                            value={elemTmp.styles.fontFamily || ''}
                            onChange={(e) => handleStyleChange(e, 'fontFamily')}
                          />
                        </label>
                        <label>
                        Text size:
                          <input
                            type='text'
                            name='fontSize'
                            value={elemTmp.styles.fontSize || ''}
                            onChange={(e) => handleStyleChange(e, 'fontSize')}
                          />
                        </label>
                        <label>
                        Text weight:
                          <input
                            type='text'
                            name='fontWeight'
                            value={elemTmp.styles.fontWeight || ''}
                            onChange={(e) => handleStyleChange(e, 'fontWeight')}
                          />
                        </label>
                        <label>
                          Background Color:
                          <input
                            type='text'
                            name='background'
                            value={elemTmp.styles.background || ''}
                            onChange={(e) => handleStyleChange(e, 'background')}
                          />
                        </label>
                        <label>
                          Border radius:
                          <input
                            type='text'
                            name='borderRadius'
                            value={elemTmp.styles.borderRadius || ''}
                            onChange={(e) => handleStyleChange(e, 'borderRadius')}
                          />
                        </label>
                        <label className="labelVariation">
                          Border
                          <div>
                              <label>
                                  width
                                    <input
                                    type='text'
                                    name='borderWidth'
                                    value={elemTmp.styles.borderWidth || ''}
                                    onChange={(e) => handleStyleChange(e, 'borderWidth')}
                                    />
                              </label>
                              <label>
                                  style
                                    <input
                                    type='text'
                                    name='borderStyle'
                                    value={elemTmp.styles.borderStyle || ''}
                                    onChange={(e) => handleStyleChange(e, 'borderStyle')}
                                    />
                              </label>
                              <label>
                                  color
                                    <input
                                    type='text'
                                    name='borderColor'
                                    value={elemTmp.styles.borderColor || ''}
                                    onChange={(e) => handleStyleChange(e, 'borderColor')}
                                    />
                              </label>
                              
                          </div>
                        </label>

                        <label className="labelVariation">
                          Margin
                          <div>
                              <label>
                                  top
                                    <input
                                    type='text'
                                    name='marginTop'
                                    value={elemTmp.styles.marginTop || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginTop')}
                                    />
                              </label>
                              <label>
                                  right
                                    <input
                                    type='text'
                                    name='marginRight'
                                    value={elemTmp.styles.marginRight || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginRight')}
                                    />
                              </label>
                              <label>
                                  bottom
                                    <input
                                    type='text'
                                    name='marginRight'
                                    value={elemTmp.styles.marginBottom || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginBottom')}
                                    />
                              </label>
                              <label>
                                  left
                                    <input
                                    type='text'
                                    name='marginLeft'
                                    value={elemTmp.styles.marginLeft || ''}
                                    onChange={(e) => handleStyleChange(e, 'marginLeft')}
                                    />
                              </label>
                          </div>
                        </label>
                        <label className="labelVariation">
                          Padding
                          <div>
                              <label>
                                  top
                                    <input
                                    type='text'
                                    name='paddingTop'
                                    value={elemTmp.styles.paddingTop || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingTop')}
                                    />
                              </label>
                              <label>
                                  paddingRight
                                    <input
                                    type='text'
                                    name='paddingRight'
                                    value={elemTmp.styles.paddingRight || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingRight')}
                                    />
                              </label>
                              <label>
                                  bottom
                                    <input
                                    type='text'
                                    name='paddingBottom'
                                    value={elemTmp.styles.paddingBottom || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingBottom')}
                                    />
                              </label>
                              <label>
                                  left
                                    <input
                                    type='text'
                                    name='paddingLeft'
                                    value={elemTmp.styles.paddingLeft || ''}
                                    onChange={(e) => handleStyleChange(e, 'paddingLeft')}
                                    />
                              </label>
                          </div>
                         
                        </label>

                       
                      </div>
                        )
                    }
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