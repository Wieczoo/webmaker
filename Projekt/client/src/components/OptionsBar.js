import React from 'react';

const OptionsBar = ({
  selectedComponent,
  selectedComponentType,
  editedValue,
  editedStyles,
  imageUrl,
  handleEditInputChange,
  handleStylesInputChange,
  handleUrlInputChange,
  handleEditSave
}) => {
  return (
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
  );
};

export default OptionsBar;