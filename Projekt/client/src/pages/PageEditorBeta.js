import React, { useState } from 'react';
import '../styles/editorBeta.css';

const PageEditor = () => {
  const [editorSelectorView, setEditorSelectedView] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [selectedPage, setSelectedPage] = useState({});
  const [selectedTextId, setSelectedTextId] = useState(null);

  const defaultStylesBlock = {
    background: '#fff',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const addPage = () => {
    const newPage = {
      title: 'test',
      type: 'body',
      id: '',
      class: '',
      styles: { background: '#fff' },
      elements: []
    };

    setPages([...pages, newPage]);
  };

  const handleStyleChange = (event, styleName) => {
    const { value } = event.target;

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
    setSelectedTextId(null); // Reset the selectedTextId
  };

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

    setSelectedTextId(temp.id); // Set the newly added text element as selected
  };

  const handleTextChange = (event) => {
    const { value } = event.target;
  
    setSelectedPage((prevPage) => {
      const updatedElements = prevPage.elements.map((element) => {
        if (element.type === 'text' && element.id === selectedTextId) {
          return {
            ...element,
            text: value
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
  

  const renderElements = (elements) => {
    return elements.map((element, index) => {
      if (element.type === 'div') {
        return (
          <div key={index}>
            <div>{element.type}</div>
            {element.elements && element.elements.length > 0 && (
              <div>{renderElements(element.elements)}</div>
            )}
          </div>
        );
      } else if (element.type === 'text') {
        return (
          <div key={index}>
            <div>{element.type}</div>
            <div>{element.text}</div>
          </div>
        );
      }
      return null;
    });
  };

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
              setSelectedElementId(element.id);
              console.log(element);
              setSelectedTextId(null);
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
              console.log(element);
              setSelectedElementId(null);
            }}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleTextChange(e, element.id)}
          >
            {element.text}
          </div>
        );
      }
      return null;
    });
  };

  const renderEditorElements = (elements) => {
    return elements.map((element) => {
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
    });
  };

  
  
  

  return (
    <div id='editorPage'>
      <div id='editor'>
        <div id='editorHeader'></div>
        <div id='editorBody'>
          <div id='editorSelector'>
            <div id='editorSelectorHeader'>
              <button onClick={() => setEditorSelectedView(false)}>Pages</button>
              <button onClick={() => setEditorSelectedView(true)}>Layout</button>
            </div>
            <div id="editorSelectorBody">
  {!editorSelectorView ? (
    <div className="section">
      <h3>My pages</h3>
      <button onClick={addPage}>Add</button>
      {pages !== null ? (
        pages.map((item, index) => (
          <button key={index} onClick={() => openPage(item)}>
            {item.title}
          </button>
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
        <div>
          <button onClick={putDiv}>Div</button>
          <button onClick={putText}>Text</button>
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
                            value={element.styles.display || ''}
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
                      </div>
                    );
                  }
                  return null;
                })}
              </>
            ) : (
              <p>Select an element to view and edit its styles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
