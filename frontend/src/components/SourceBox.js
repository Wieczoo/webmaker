import { memo, useCallback, useMemo, useState } from 'react'
import { useDrag } from 'react-dnd'
import { Colors } from './Colors.js'
const style = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
}
export const SourceBox = memo(function SourceBox({ color,id, children }) {
  const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: color,
      id: id,
      canDrag: !forbidDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag, color,id],
  )
  const onToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag)
  }, [forbidDrag, setForbidDrag])
  const backgroundColor = useMemo(() => {
    switch (color) {
      case Colors.YELLOW:
        return 'lightgoldenrodyellow'
      case Colors.BLUE:
        return 'lightblue'
      default:
        return 'lightgoldenrodyellow'
    }
  }, [color])
  const containerStyle = useMemo(
    () => ({
      ...style,
      backgroundColor,
      opacity: isDragging ? 0.4 : 1,
      cursor: forbidDrag ? 'default' : 'move',
    }),
    [isDragging, forbidDrag, backgroundColor],
  )
  return (
    <div ref={drag} style={containerStyle} role="SourceBox" data-color={color} data-id={id}>
      <input
        type="checkbox"
        checked={forbidDrag}
        onChange={onToggleForbidDrag}
      />
      <small></small>
      {children}
    </div>
  )
})
