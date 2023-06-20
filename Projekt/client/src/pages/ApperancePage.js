import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/editor.css';

import icon_desktop from '../assets/desktop.png';
import icon_mobile from '../assets/mobile.png';

import icon_close from '../assets/close.png';
import icon_addPage from '../assets/addPage.png';

import icon_page from '../assets/page.png';

import Sidebar from '../components/Sidebar';
import Section from '../components/Section';
import EditableComponent from '../components/EditableComponent';
import OptionsBar from '../components/OptionsBar';
import exportToHTML from "../components/ExportToHTML";


const ApperancePage = () => {
  const [editorSelector, setEditorSelector] = useState(true);
  const [newPageBlock, setNewPageBlock] = useState(true);
  const [newPageTitle, setNewPageTitle] = useState();
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState([]);
  const [selectedObject, setSelectedObject] = useState();
  const [display, setDisplay] = useState(false);
  const [editedBackground, setEditedBackground] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedComponentType, setSelectedComponentType] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const [editedStyles, setEditedStyles] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pageIndex,setPageIndex] = useState(0);

  const editorSelectorView = () => {
    setEditorSelector(!editorSelector);
  };



  const addPage = () => {
    pages.push({
        title: newPageTitle,
        body: []
      });
    setPages(pages);
    setNewPageBlock(false);
  };

  const openPage = async (title) => {
    const source = pages.findIndex(e => e.title === title);
    setPageIndex(source);
    setSelectedPage(pages[source]);
    console.log(pages[source]);
    console.log(selectedPage);
    setSections(pages[source].body);
    setSelectedObject(pages[source].body);
    setDisplay(true);
  };

  const handleBackgroundChange = (e) => {
    setEditedBackground(e.target.value);
    //selectedObject.style.background = e.target.value;
  };



  const addSection = (sectionName, layout) => {
    const newSection = {
      name: sectionName,
      layout: layout,
      components: [],
    };
    setSections([...sections, newSection]);
    let tempPages = pages;
    debugger;
    tempPages[pageIndex].body.push(newSection)
    setPages(tempPages);
  };

  const addComponent = (sectionIndex, component) => {
    const updatedSections = [...sections];
    const defaultStyles = {
      color: 'inherit',
      backgroundColor: 'transparent',
      fontSize: '18px',
      marginLeft: '0',
      marginRight: '0',
      marginTop: '0',
      marginBottom: '0',
      paddingLeft: '0',
      paddingRight: '0',
      paddingTop: '0',
      paddingBottom: '0',
    };
    
    let newComponent;
    
    if (component === 'Header' || component === 'Paragraph') {
      newComponent = {
        type: component,
        value: `Text`,
        style: { ...defaultStyles },
      };
    } else if (component === 'Image') {
      newComponent = {
        type: component,
        imageUrl: "image-url.jpg",
        value: '<img alt="Image">',
        style: { ...defaultStyles },
      };
    }
    
    updatedSections[sectionIndex].components.push(newComponent);
    setSections(updatedSections);
    console.log(JSON.stringify(sections))
  };

  const removeComponent = (sectionIndex, componentIndex) => {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].components.splice(componentIndex, 1);
      setSections(updatedSections);
    };

  const removeSection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections.splice(sectionIndex, 1);
    setSections(updatedSections);
  };

  const handleComponentClick = (sectionIndex, componentIndex) => {
    setSelectedComponent({ sectionIndex, componentIndex });
    setSelectedComponentType(sections[sectionIndex].components[componentIndex].type)
    setEditedValue(sections[sectionIndex].components[componentIndex].value);
    setEditedStyles(sections[sectionIndex].components[componentIndex].style);
  };

  const handleEditInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleStylesInputChange = (e) => {
    setEditedStyles({ ...editedStyles, [e.target.name]: e.target.value });
  };
   
  const handleUrlInputChange = (e) => {
    setImageUrl(e.target.value)
  }

  const handleEditSave = () => {
    if (selectedComponent) {
      console.log(JSON.stringify(sections))
      const { sectionIndex, componentIndex } = selectedComponent;
      const updatedSections = [...sections];
      if(selectedComponentType=== "Image"){
        updatedSections[sectionIndex].components[componentIndex].imageUrl = imageUrl;
      }
      updatedSections[sectionIndex].components[componentIndex].value = editedValue;
      updatedSections[sectionIndex].components[componentIndex].style = { ...editedStyles };
      setSections(updatedSections);
      setSelectedComponent(null);
      setSelectedComponentType(null)
      setImageUrl('')
      setEditedValue('');
      setEditedStyles('');
    }
  };

  const handleExportToHTML = () => {
    const htmlCode = exportToHTML(sections);
    console.log(htmlCode);
    // Możesz wykorzystać htmlCode do zapisania jako plik lub przekazania go dalej w aplikacji
  };

  return (
    <>
      {!newPageBlock ? null :
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
      }
      <header>Apperance editor</header>
      <section id="editorSection">
        <div className="editorColumn">
          <div id="editorHeader">
            <span>
              <a>Page:{!display ? '' : selectedPage.title}</a>
            </span>
            <span>
              <button onClick={editorSelectorView}><img src={icon_page} alt=''></img></button>
              <div id="editorView">
                <button><img src={icon_desktop} alt=''></img></button>
                <button><img src={icon_mobile} alt=''></img></button>
              </div>
            </span>
          </div>
          {!editorSelector ? null :
            <div id="editorSelector">
              <div id="editorSelectorHeader">
                <h3>My pages</h3>
                <span>
                  <button onClick={() => { setNewPageBlock(true) }}><img alt='img' src={icon_addPage}></img></button>
                  <button onClick={() => { setEditorSelector(false) }}><img alt='img' src={icon_close}></img></button>
                </span>
              </div>
              <div id="editorSelectorBody">
                {pages ? pages.map((item, index) => {
                  return (
                    <button key={index} onClick={() => { openPage(item.title) }} className="page"><img alt='page' src={icon_page} /><a>{item.title}</a></button>
                    
                  );
                }) : null}
                <button onClick={handleExportToHTML}>Eksport do HTML</button>

              </div>
            </div>
          }
          <div id="editorDisplay">
          <Sidebar
        addSection={addSection}
        addComponent={addComponent}
        removeSection={removeSection}
      />
      <div className='editor'>
        {sections.map((section, sectionIndex) => (
          <Section
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            components={section.components}
            addComponent={addComponent}
            removeSection={removeSection}
            removeComponent={removeComponent}
            handleComponentClick={handleComponentClick}
          />
        ))}
      </div>
          </div>
        </div>
        <div className="editorColumn">
          <div id="editorOptions">
            <h3>Options</h3>
            <div>
            {selectedComponent && (
        <OptionsBar
          selectedComponent={selectedComponent}
          selectedComponentType={selectedComponentType}
          editedValue={editedValue}
          editedStyles={editedStyles}
          imageUrl={imageUrl}
          handleEditInputChange={handleEditInputChange}
          handleStylesInputChange={handleStylesInputChange}
          handleUrlInputChange={handleUrlInputChange}
          handleEditSave={handleEditSave}
          removeComponent={removeComponent}
        />
      )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ApperancePage;
