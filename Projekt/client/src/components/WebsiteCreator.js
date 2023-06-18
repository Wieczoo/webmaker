import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Section from './Section';
import EditableComponent from './EditableComponent';
import OptionsBar from './OptionsBar';

const WebsiteCreator = () => {
    const [sections, setSections] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [selectedComponentType, setSelectedComponentType] = useState(null);
    const [editedValue, setEditedValue] = useState('');
    const [editedStyles, setEditedStyles] = useState('');
    const [imageUrl, setImageUrl] = useState('');
  
    const addSection = (sectionName, layout) => {
      const newSection = {
        name: sectionName,
        layout: layout,
        components: [],
      };
      setSections([...sections, newSection]);
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
        debugger;
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
        debugger;
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

  return (
    <div className='WebsiteCreator'>
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
  );
};

export default WebsiteCreator;
