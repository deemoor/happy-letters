import React, { useState, type FC } from 'react'
import { LevelStatus, type BlockType, type LevelStatusType } from 'src/config'
import { InteractiveBlock } from 'src/components';

type Props = {
  blocks: BlockType[];
  rightOrder: BlockType[];
}

export const BlockBoard:FC<Props> = ({ blocks, rightOrder }) => {
  const [list, setList] = useState(blocks);
  const [activeItem, setActiveItem] = useState<BlockType | null>(null);
  const [status, setStatus] = useState<LevelStatusType>(LevelStatus.InProgress);

  const onClickItem = (item: BlockType) => {
    if (!activeItem) {
      setActiveItem(item);
      return;
    }

    if (activeItem.id !== item.id) {
      const fromIndex = list.indexOf(activeItem);
      const toIndex = list.indexOf(item);

      const newList = [...list];
      newList[fromIndex] = item;
      newList[toIndex] = activeItem;
      setList(newList);
    }

    setActiveItem(activeItem?.id === item.id ? item : null);
  }

  const checkOrder = () => {
    const isCorrect = list.every((item, i) => item.id === rightOrder[i].id);
    setStatus(isCorrect ? LevelStatus.Success : LevelStatus.Error);
  };

  return (
    <div className='container'>
      <div className='blocks'>
        {list.map(item => (
          <InteractiveBlock data={item} onClick={onClickItem} isActive={activeItem?.id === item.id} />
        ))}
      </div>
      <button className='button-check' onClick={checkOrder}>
        Проверить
      </button>
      <p>{status}</p>
    </div>
  )
}