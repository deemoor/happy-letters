import React, { memo, type FC } from 'react'
import { BLOCK_HEIGHT, type BlockType } from 'src/config';
import clsx from 'clsx';
import cls from './Block.module.scss';

type Props = {
  data: BlockType,
  isActive: boolean;
  isDragging: boolean;
}

export const Block: FC<Props> = memo(({ 
  data, 
  isActive, 
  isDragging 
}) => {
  return (
    <div 
      className={clsx(cls.block, isActive && cls.isActive, isDragging && cls.isDragging)}
      style={{ 
        '--block-color': data.color, 
        height: BLOCK_HEIGHT 
      } as React.CSSProperties}
    >
      {data.text}
    </div>
  );
});

Block.displayName = 'Block';