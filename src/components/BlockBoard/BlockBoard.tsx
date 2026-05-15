import React, { useState, useRef, type FC, type ReactNode } from 'react';
import Draggable, { type DraggableData, type DraggableEvent } from 'react-draggable';
import { BLOCK_HEIGHT, BLOCKS_GAP, LevelStatus, type BlockType, type LevelStatusType } from 'src/config';
import { InteractiveBlock } from 'src/components';
import cls from './BlockBoard.module.scss';

type Props = {
  blocks: BlockType[];
  rightOrder: BlockType[];
  setStatus: (status: LevelStatusType) => void;
}

type Props2 = {
  item: BlockType;
  isDragging: boolean;
  onStart: (item: BlockType) => void;
  onStop: (data: DraggableData, item: BlockType) => void;
  children: ReactNode;
}

const DraggableBlock: FC<Props2> = ({ item, isDragging, onStart, onStop, children }) => {
  const nodeRef = useRef(null);
  
  return (
    <Draggable 
      nodeRef={nodeRef} 
      axis="y" 
      bounds="parent"
      onStart={() => onStart(item)}
      onStop={(_, data) => onStop(data, item)}
      position={{ x: 0, y: 0 }} 
    >
      <div 
        ref={nodeRef} 
        style={{
          cursor: 'grab',
          zIndex: isDragging ? 10 : 1
        }}
      >
        {children}
      </div>
    </Draggable>
  );
};

export const BlockBoard: FC<Props> = ({ blocks, rightOrder, setStatus }) => {
  const [list, setList] = useState(blocks);
  const [activeItem, setActiveItem] = useState<BlockType | null>(null);
  const [draggingId, setDraggingId] = useState<string | number | null>(null);

  const onClickItem = (item: BlockType) => {
    if (!activeItem) {
      setActiveItem(item);
      return;
    }

    if (activeItem.id !== item.id) {
      const newList = [...list];
      const fromIndex = list.indexOf(activeItem);
      const toIndex = list.indexOf(item);
      newList[fromIndex] = item;
      newList[toIndex] = activeItem;
      setList(newList);
    }

    setActiveItem(null);
  }

  const checkOrder = () => {
    const isCorrect = list.every((item, i) => item.id === rightOrder[i].id);
    setStatus(isCorrect ? LevelStatus.Success : LevelStatus.Error);
  };

  const onStartDragging = (item: BlockType) => {
    setDraggingId(item.id);
  };

  const onStopDragging = (data: DraggableData, item: BlockType) => {
    setDraggingId(null);

    if (Math.abs(data.y) < 3) {
      onClickItem(item);
      return;
    }

    const oldIndex = list.findIndex((i) => i.id === item.id);
    const offsetIndex = Math.round(data.y / (BLOCK_HEIGHT + BLOCKS_GAP));
    let newIndex = oldIndex + offsetIndex;

    newIndex = Math.max(0, Math.min(newIndex, list.length - 1));

    if (newIndex !== oldIndex) {
      const newList = [...list];
      const [movedItem] = newList.splice(oldIndex, 1);
      newList.splice(newIndex, 0, movedItem);
      setList(newList);
    }
  };

  return (
    <div className={cls.container}>
      <div className={cls.blocks} style={{ gap: BLOCKS_GAP }}>
        {list.map((item) => (
          <DraggableBlock 
            key={item.id} 
            item={item} 
            isDragging={draggingId === item.id}
            onStart={onStartDragging} 
            onStop={onStopDragging}
          >
            <InteractiveBlock
              data={item}
              isActive={activeItem?.id === item.id}
              isDragging={draggingId === item.id}
              onClick={() => {}}
            />
          </DraggableBlock>
        ))}
      </div>
      <button className={cls.buttonCheck} onClick={checkOrder}>
        Проверить
      </button>
    </div>
  );
};