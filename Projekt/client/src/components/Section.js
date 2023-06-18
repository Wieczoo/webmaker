import React from 'react';
import EditableComponent from './EditableComponent';
//import '../styles/Section.css';

const Section = ({ section, sectionIndex, addComponent, removeSection, removeComponent, handleComponentClick }) => {
  return (
    <div className='Section'>
      <div className='add-buttons'>
        <button onClick={() => addComponent(sectionIndex, 'Header')}>Add Header</button>
        <button onClick={() => addComponent(sectionIndex, 'Paragraph')}>Add Paragraph</button>
        <button onClick={() => addComponent(sectionIndex, 'Image')}>Add Image</button>
        <button className='remove-section' onClick={() => {removeSection(sectionIndex)}}>Remove Section</button>
      </div>
      <div style={{ display: section.layout === 'column' ? 'flex' : 'block' }}>
        {section.components.map((component, componentIndex) => (
          <EditableComponent
            key={componentIndex}
            sectionIndex={sectionIndex}
            componentIndex={componentIndex}
            component={component}
            handleComponentClick={handleComponentClick}
            removeComponent={removeComponent}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
