import React, { useState } from 'react';
import './WebsiteCreator.css';

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
      <div className='left-sidebar'>
        <h1>Website Creator</h1>
        <div>
          <button onClick={() => addSection('Section 1', 'column')}>Add Section column</button>
          <button onClick={() => addSection('Section 2', 'row')}>Add Section row</button>
        </div>
      </div>
      <div className='editor'>
        {sections.map((section, sectionIndex) => (
          <div className='section' key={sectionIndex}   >
            {/* <h2>{section.name}</h2> */}
            <div className='add-buttons'>
              <button onClick={() => addComponent(sectionIndex, 'Header')}>Add Header</button>
              <button onClick={() => addComponent(sectionIndex, 'Paragraph')}>Add Paragraph</button>
              <button onClick={() => addComponent(sectionIndex, 'Image')}>Add Image</button>
              <button className='remove-section' onClick={() => removeSection(sectionIndex)}>Remove Section</button>
            </div>
            <div style={{ display: section.layout === 'column' ? 'flex' : 'block' }}>
            {section.components.map((component, componentIndex) => (
  <div key={componentIndex}>
    <div className='editable-text'>
      {component.type === 'Header' && (
        <h1
          onClick={() => handleComponentClick(sectionIndex, componentIndex)}
          style={{ ...component.style, backgroundColor: component.style.backgroundColor }}
        >
          {component.value}
        </h1>
      )}
      {component.type === 'Paragraph' && (
        <p
          onClick={() => handleComponentClick(sectionIndex, componentIndex)}
          style={{ ...component.style, backgroundColor: component.style.backgroundColor }}
        >
          {component.value}
        </p>
      )}
      {component.type === 'Image' && (
        <img
          src={component.imageUrl}
          alt="Image"
          onClick={() => handleComponentClick(sectionIndex, componentIndex)}
          style={{ ...component.style, backgroundColor: component.style.backgroundColor }}
        />
      )}
    </div>
    <button className='remove-element' onClick={() => removeComponent(sectionIndex, componentIndex)}>Remove</button>
  </div>
))}

            </div>
            
          </div>
        ))}
      </div>
      {selectedComponent && (
        <div className="sidebar">
          <h3>Edit Component</h3>
          {
            console.log(selectedComponent.type )
          }
          {selectedComponentType !== "Image" && (
     <input type="text" value={editedValue} onChange={handleEditInputChange} />
    )}
          {selectedComponentType=== "Image" && (
      <div>
        URL:
        <input
          type="text"
          name="imageUrl"
          value={editedStyles.imageUrl}
          onChange={handleUrlInputChange}
          placeholder="Enter image URL"
        />
      </div>
    )}
          backgroundColor:<textarea
            name="backgroundColor"
            value={editedStyles.backgroundColor}
            onChange={handleStylesInputChange}
            placeholder="Enter background color"
          />
          color:<textarea
            name="color"
            value={editedStyles.color}
            onChange={handleStylesInputChange}
            placeholder="Enter text color"
          />
          fontSize:<textarea
            name="fontSize"
            value={editedStyles.fontSize}
            onChange={handleStylesInputChange}
            placeholder="Enter font size"
          />
          <div>
          <label>
  Margin:
  <input
    type="text"
    name="marginLeft"
    value={editedStyles['marginLeft']}
    onChange={handleStylesInputChange}
    placeholder="Left"
  />
  <input
    type="text"
    name="marginRight"
    value={editedStyles['marginRight']}
    onChange={handleStylesInputChange}
    placeholder="Right"
  />
  <input
    type="text"
    name="marginTop"
    value={editedStyles['marginTop']}
    onChange={handleStylesInputChange}
    placeholder="Top"
  />
  <input
    type="text"
    name="marginBottom"
    value={editedStyles['marginBttom']}
    onChange={handleStylesInputChange}
    placeholder="Bottom"
  />
</label>
          </div>
          
<div>
<label>
  Padding:
  <input
    type="text"
    name="paddingLeft"
    value={editedStyles['paddingLeft']}
    onChange={handleStylesInputChange}
    placeholder="Left"
  />
  <input
    type="text"
    name="paddingRight"
    value={editedStyles['paddingRight']}
    onChange={handleStylesInputChange}
    placeholder="Right"
  />
  <input
    type="text"
    name="paddingTop"
    value={editedStyles['paddingTop']}
    onChange={handleStylesInputChange}
    placeholder="Top"
  />
  <input
    type="text"
    name="paddingBottom"
    value={editedStyles['paddingBottom']}
    onChange={handleStylesInputChange}
    placeholder="Bottom"
  />
</label>
</div>


          <button onClick={handleEditSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default WebsiteCreator;
