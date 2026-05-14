import React, { useState, type FC } from 'react'
import { LevelStatus, type BlockType, type LevelStatusType } from 'src/config'
import { InteractiveBlock } from 'src/components';
import cls from './BlockBoard.module.scss';

type Props = {
  blocks: BlockType[];
  rightOrder: BlockType[];
  setStatus: (status: LevelStatusType) => void;
}

export const BlockBoard:FC<Props> = ({ blocks, rightOrder, setStatus }) => {
  const [list, setList] = useState(blocks);
  const [activeItem, setActiveItem] = useState<BlockType | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newList = [...list];
    const draggedItem = newList[draggedIndex];
    newList.splice(draggedIndex, 1);
    newList.splice(targetIndex, 0, draggedItem);
    
    setDraggedIndex(targetIndex);
    setList(newList);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setActiveItem(null);
  };

  return (
    <div className={cls.container}>
      <div className={cls.blocks}>
        {list.map((item, i) => (
          <InteractiveBlock 
            data={item} 
            onClick={onClickItem} 
            isActive={activeItem?.id === item.id} 
            isDragging={i === draggedIndex}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
      <button className={cls.buttonCheck} onClick={checkOrder}>
        Проверить
      </button>
    </div>
  )
}