import { useState, type FC } from 'react';
import { type DraggableData } from 'react-draggable';
import { BLOCK_HEIGHT, BLOCKS_GAP, LevelStatus, type BlockType, type DragStateType, type LevelStatusType } from 'src/config';
import { Block, DraggableBlock } from 'src/components';
import cls from './BlockBoard.module.scss';

const STEP = BLOCK_HEIGHT + BLOCKS_GAP;

type Props = {
  blocks: BlockType[];
  rightOrder: BlockType[];
  setStatus: (status: LevelStatusType) => void;
};

export const BlockBoard: FC<Props> = ({ blocks, rightOrder, setStatus }) => {
  const [list, setList] = useState(blocks);
  const [activeItem, setActiveItem] = useState<BlockType | null>(null);
  const [dragState, setDragState] = useState<DragStateType | null>(null);

  const handleClickItem = (item: BlockType) => {
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

  const handleStart = (index: number) => {
    setDragState({ activeIdx: index, hoverIdx: index });
  };

  const handleDrag = (data: DraggableData, index: number) => {
    const offset = Math.round(data.y / STEP);
    const newHoverIdx = Math.max(0, Math.min(index + offset, list.length - 1));

    if (dragState && dragState.hoverIdx !== newHoverIdx) {
      setDragState({ activeIdx: index, hoverIdx: newHoverIdx });
    }
  };

  const handleStop = (data: DraggableData, index: number) => {
    const offset = Math.round(data.y / STEP);
    const newIndex = Math.max(0, Math.min(index + offset, list.length - 1));

    setDragState(null);
    
    if (Math.abs(data.y) < 3) {
      handleClickItem(list[index]);
      return;
    }

    if (newIndex !== index) {
      const newList = [...list];
      const [movedItem] = newList.splice(index, 1);
      newList.splice(newIndex, 0, movedItem);
      setList(newList);
    }
  };

  return (
    <div className={cls.container}>
      <div className={cls.blocks} style={{ gap: BLOCKS_GAP }}>
        {list.map((item, index) => (
          <DraggableBlock
            index={index}
            dragState={dragState}
            listLength={list.length}
            isDragging={dragState?.activeIdx === index}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}
            key={item.id}
          >
            <Block
              data={item}
              isActive={activeItem?.id === item.id}
              isDragging={dragState?.activeIdx === index}
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