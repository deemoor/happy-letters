import React, { useEffect, useRef, useState, type FC } from 'react'
import { LevelStatus, type BlockType, type LevelStatusType } from 'src/config'
import { InteractiveBlock } from 'src/components';
import cls from './BlockBoard.module.scss';

type Props = {
  blocks: BlockType[];
  rightOrder: BlockType[];
  setStatus: (status: LevelStatusType) => void;
}

export const BLOCKS_GAP = 10;

export const BlockBoard:FC<Props> = ({ blocks, rightOrder, setStatus }) => {
  const [list, setList] = useState(blocks);
  const [activeItem, setActiveItem] = useState<BlockType | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const startYRef = useRef(0);
  const isMovedRef = useRef(false);
  const draggedElementRef = useRef<HTMLDivElement | null>(null);
  const draggedIndex = list.findIndex((item) => item.id === draggedId);

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

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    setDraggedId(id);
    startYRef.current = e.clientY;
    isMovedRef.current = false;
    draggedElementRef.current = e.currentTarget as HTMLDivElement;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (draggedId === null || draggedIndex === -1 || !draggedElementRef.current) return;
  
    const rect = draggedElementRef.current.getBoundingClientRect();
    const blockHeight = rect.height + BLOCKS_GAP;

    let deltaY = e.clientY - startYRef.current;
    const isAtTop = draggedIndex === 0 && deltaY < 0;
    const isAtBottom = draggedIndex === list.length - 1 && deltaY > 0;
    if (isAtTop || isAtBottom) {
      deltaY = 0;
    }

    draggedElementRef.current.style.transform = `translateY(${deltaY}px)`;

    if (Math.abs(deltaY) > 3) {
      isMovedRef.current = true;
    }
   
    let newIndex = draggedIndex;
    if (deltaY > blockHeight / 2) {
      newIndex = draggedIndex + 1;
    } 
    if (deltaY < -blockHeight / 2) {
      newIndex = draggedIndex - 1;
    }

    if (newIndex !== draggedIndex) {
      const newList = [...list];
      const [movedItem] = newList.splice(draggedIndex, 1);
      newList.splice(newIndex, 0, movedItem);
   
      const direction = newIndex > draggedIndex ? 1 : -1;
      startYRef.current += direction * blockHeight;
      draggedElementRef.current.style.transform = `translateY(${deltaY - direction * blockHeight}px)`;

      setList(newList);
    }
  };

  const handlePointerUp = (e: React.PointerEvent, item: BlockType) => {
    if (!isMovedRef.current) {
      onClickItem(item);
    }

    if (draggedElementRef.current) {
      draggedElementRef.current.style.transform = '';
    }

    setDraggedId(null);
    startYRef.current = 0;
  };

  return (
    <div className={cls.container}>
      <div 
        className={cls.blocks}
        style={{ gap: BLOCKS_GAP }}
      >
        {list.map((item) => {
          const isDragging = item.id === draggedId;

          return (
            <div
              className={cls.block}
              onPointerDown={(e) => handlePointerDown(e, item.id)}
              onPointerMove={isDragging ? handlePointerMove : undefined}
              onPointerUp={(e) => handlePointerUp(e, item)}
              onPointerCancel={(e) => handlePointerUp(e, item)}
              style={{
                zIndex: isDragging ? 10 : 1,
                transition: isDragging ? 'none' : 'all 0.2s ease',
              }}
              key={item.id}
            >
              <InteractiveBlock 
                data={item} 
                isActive={activeItem?.id === item.id} 
                isDragging={isDragging}
                onClick={() => {}}
              />
            </div>
          );
        })}
      </div>
      <button className={cls.buttonCheck} onClick={checkOrder}>
        Проверить
      </button>
    </div>
  )
}