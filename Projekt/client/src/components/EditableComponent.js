import React, { useState } from 'react';
//import '../styles/EditableComponent.css';

const EditableComponent = ({ sectionIndex, componentIndex, component, handleComponentClick, removeComponent }) => {
  const [editedValue, setEditedValue] = useState(component.value);
  const [editedStyles, setEditedStyles] = useState(component.style);

  const handleEditInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleStylesInputChange = (e) => {
    setEditedStyles({ ...editedStyles, [e.target.name]: e.target.value });
  };

  return (
    <div className='EditableComponent'>
      <div className='editable-text'>
        {component.type === 'Header' && (
          <h1
            onClick={() => handleComponentClick(sectionIndex, componentIndex)}
            style={ component.style }
          >
            {component.value}
          </h1>
        )}
        {component.type === 'Paragraph' && (
          <p
            onClick={() => handleComponentClick(sectionIndex, componentIndex)}
            style={ component.style }
          >
            {component.value}
          </p>
        )}
        {component.type === 'Image' && (
          <img
            src={component.imageUrl}
            alt="Image"
            onClick={() => handleComponentClick(sectionIndex, componentIndex)}
            style={ component.style }
          />
        )}
      </div>
      <button className='remove-element' onClick={() => {debugger;removeComponent(sectionIndex, componentIndex)}}>Remove</button>
    </div>
  );
};

export default EditableComponent;
