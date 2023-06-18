import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const Box = ({ id, text, tag, onSelect }) => {
    const [editableText, setEditableText] = useState(text);
    const [isEditing, setIsEditing] = useState(false);
  
    const [{ isDragging }, drag] = useDrag({
      type: ItemTypes.BOX,
      item: { id, text: editableText },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    const handleTextChange = (e) => {
      setEditableText(e.target.value);
    };
  
    const handleClick = () => {
      setIsEditing(true);
      onSelect(id);
    };
  
    const handleBlur = () => {
      setIsEditing(false);
    };
  
    const opacity = isDragging ? 0.4 : 1;
    const Tag = tag || 'p';
    
  
    return (
      <div onClick={handleClick} ref={drag} style={{ opacity }} className="box">
        {isEditing ? (
          <input
            type="text"
            value={editableText}
            onChange={handleTextChange}
            onBlur={handleBlur}
            className="editableText"
          />
        ) : (
          <Tag>{editableText}</Tag>
        )}
      </div>
    );
  };

const Section = ({ key, title, boxes, onDrop, onSelectBox }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item) => onDrop(item),
  });

  return (
    <div ref={drop} data-id={key} className="section">
      <h2>{title}</h2>
      {boxes.map((box) => (
        <Box
          key={box.id}
          id={box.id}
          tag={box.tag}
          text={box.text}
          onSelect={onSelectBox}
        />
      ))}
    </div>
  );
};

const Creator = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, text: 'Heading 1', tag: "h1" },
    { id: 2, text: 'Heading 2', tag: "h2" },
    { id: 3, text: 'Paragraph', tag: "p" },
  ]);

  const [sections, setSections] = useState([
    { id: 1, title: 'Section 1', boxes: [] },
    { id: 2, title: 'Section 2', boxes: [] },
  ]);

  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [editableText, setEditableText] = useState('');

  const handleDrop = (item, sectionId) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          boxes: [...section.boxes, item],
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSelectBox = (boxId) => {
    setSelectedBoxId(boxId);
    const selectedBox = boxes.find((box) => box.id === boxId);
    setEditableText(selectedBox.text);
  };

  const handleTextChange = (e) => {
    setEditableText(e.target.value);
  };

  const handleUpdateText = () => {
    setBoxes((prevBoxes) => {
      return prevBoxes.map((box) => {
        if (box.id === selectedBoxId) {
          return {
            ...box,
            text: editableText,
          };
        }
        return box;
      });
    });
  };

  const selectedBox = boxes.find((box) => box.id === selectedBoxId);

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Lista elementów</h2>
        {boxes.map((box) => (
          <Box
            key={box.id}
            id={box.id}
            tag={box.tag}
            text={box.text}
            onSelect={handleSelectBox}
          />
        ))}
      </div>
      <div className="sections">
        {sections.map((section) => (
          <Section
            key={section.id}
            title={section.title}
            boxes={section.boxes}
            onDrop={(item) => handleDrop(item, section.id)}
            onSelectBox={handleSelectBox}
          />
        ))}
      </div>
      <div className="properties">
        {selectedBox && (
          <div>
            <h3>Selected Box:</h3>
            <p>ID: {selectedBox.id}</p>
            <input
              type="text"
              value={editableText}
              onChange={handleTextChange}
            />
            <button onClick={handleUpdateText}>Update Text</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Creator;
