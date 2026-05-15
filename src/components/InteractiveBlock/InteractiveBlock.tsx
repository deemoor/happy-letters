import React, { type FC } from 'react'
import { BLOCK_HEIGHT, type BlockType } from 'src/config';
import clsx from 'clsx';
import cls from './InteractiveBlock.module.scss';

type Props = {
  data: BlockType,
  onClick: (item: BlockType) => void;
  isActive: boolean;
  isDragging?: boolean;
  draggable?: boolean;
  onDragStart?: React.DragEventHandler;
  onDragOver?: React.DragEventHandler;
  onDragEnd?: React.DragEventHandler;
}

export const InteractiveBlock: FC<Props> = ({ 
  data, 
  onClick, 
  isActive, 
  isDragging,
  draggable, 
  onDragStart, 
  onDragOver, 
  onDragEnd
}) => {
  return (
    <div 
      className={clsx(cls.block, isActive && cls.isActive, isDragging && cls.isDragging)}
      onClick={() => onClick(data)}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      style={{ 
        '--block-color': data.color, 
        height: BLOCK_HEIGHT 
      } as React.CSSProperties}
    >
      {data.text}
    </div>
  )
}