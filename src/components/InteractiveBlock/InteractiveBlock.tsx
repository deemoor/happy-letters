import React, { type FC } from 'react'
import type { BlockType } from 'src/config';
import './InteractiveBlock.scss'

type Props = {
  data: BlockType,
  onClick: (item: BlockType) => void;
  isActive: boolean;
}

export const InteractiveBlock: FC<Props> = ({ data, onClick, isActive }) => {
  return (
    <div 
      className={`block ${isActive ? 'block--active' : ''}`} 
      onClick={() => onClick(data)}
      style={{ '--block-color': data.color } as React.CSSProperties}
    >
      {data.text}
    </div>
  )
}