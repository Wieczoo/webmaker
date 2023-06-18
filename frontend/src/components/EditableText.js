import React, { useState } from 'react'

const EditableText = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent)

  const handleContentChange = (event) => {
    debugger;
    setContent(event.currentTarget.text)
  }

  return (
    <p onClick={handleContentChange} contentEditable="true" className='editableText'>{content}</p>
  )
}

export default EditableText