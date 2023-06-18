import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { Colors } from './Colors.js'
import EditableText from './EditableText.js'
const style = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
}

// const [valueText,setValueText] = useState('');
// const [property,setProperty] = useState('');
// const [element,setElement] = useState();
const editableTextHandle = (event) => {
  //setElement(event.target);
  //setProperty('innerHTML');
 
}

const editableImageHandle = (event) => {
  
}




const TargetBox = memo(function TargetBox({ onDrop, lastDroppedColor }) {
  const [index,setIndex] = useState();
  const [content,setContent] = useState('asd');
  const [dropElement,setDropElement] = useState();
  // const [elements,setElements] = useState([{
  //   'id': 0,
  //   'name': 'Tekst',
  //   'html': <p onClick={editableTextHandle} contenteditable="true" onChange={e => setContent(e.currentTarget.value)}  className='editableText'>{content}</p>
  // },{
  // 'id': 1,
  // 'name': 'Nagłówek',
  // 'html': <h1 onClick={editableTextHandle} contenteditable="true" onChange={e => setContent(e.currentTarget.value)}  className='editableText'>{content}</h1>
  // },
  // {
  // 'id': 2,
  // 'name': 'Zdjęcie',
  // 'html': <img  onClick={editableImageHandle}  className='editableImage' src="https://cdn.discordapp.com/attachments/1008571195345608704/1106224781122080829/Nathy_Lahat_cinnamon_flavored_Whisky_vintage_label_938b19f4-52cd-4a7e-9ec4-40300b563078.png"></img>
  // }]);



  const [elements] = useState([
    {
      'id': 0,
      'name': 'Tekst',
      'component': <EditableText initialContent={content} />
    },
    {
      'id': 1,
      'name': 'Nagłówek',
      'component': <EditableText initialContent={content} />
    },
    {
      'id': 2,
      'name': 'Zdjęcie',
      'component': <EditableText />
    }
  ])

  const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
    () => ({
      accept: [Colors.YELLOW, Colors.BLUE],
      drop(_item, monitor) {
        onDrop(monitor.getItemType())
        setIndex(monitor.internalMonitor.registry.pinnedSource.spec.id);
        setDropElement(elements[monitor.internalMonitor.registry.pinnedSource.spec.id])
        return undefined
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        draggingColor: monitor.getItemType(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop],
  )
  const opacity = isOver ? 1 : 0.7
  let backgroundColor = '#fff';
  switch (draggingColor) {
    case Colors.BLUE:
      backgroundColor = 'lightblue'
      break
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow'
      break
    default:
      break
  }
  return (
    <div
      ref={drop}
      data-color={lastDroppedColor || 'none'}
      style={{ ...style, backgroundColor, opacity }}
      role="TargetBox"
    >
     

     {!canDrop && lastDroppedColor && <div  className="render">{dropElement.component}</div>}
    </div>
  )
})
export const StatefulTargetBox = (props) => {
 
  const [lastDroppedColor, setLastDroppedColor] = useState(null)
  const handleDrop = useCallback((color) => setLastDroppedColor(color), [])
  return (
    <TargetBox
      {...props}
      lastDroppedColor={lastDroppedColor}
      onDrop={handleDrop}
    />
  )
}
