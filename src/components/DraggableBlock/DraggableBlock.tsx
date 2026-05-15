import { useRef, type FC, type ReactNode } from 'react';
import Draggable, { type DraggableData } from 'react-draggable';
import { BLOCK_HEIGHT, BLOCKS_GAP, type DragStateType } from 'src/config';
import clsx from 'clsx';
import cls from './DraggableBlock.module.scss';

const STEP = BLOCK_HEIGHT + BLOCKS_GAP;

type Props = {
  index: number;
  isDragging: boolean;
  dragState: DragStateType | null;
  listLength: number;
  onStart: (index: number) => void;
  onDrag: (data: DraggableData, index: number) => void;
  onStop: (data: DraggableData, index: number) => void;
  children: ReactNode;
};

export const DraggableBlock: FC<Props> = ({
  index,
  isDragging,
  dragState,
  listLength,
  onStart,
  onDrag,
  onStop,
  children,
}) => {
  const nodeRef = useRef(null);
  
  let offsetY = 0;

  if (dragState && !isDragging) {
    const { activeIdx, hoverIdx } = dragState;
    if (index > activeIdx && index <= hoverIdx) offsetY = -STEP;
    if (index < activeIdx && index >= hoverIdx) offsetY = STEP;
  }

  const bounds = {
    top: -index * STEP,
    bottom: (listLength - 1 - index) * STEP,
  };
  
  return (
    <div
      className={clsx(cls.wrapper, isDragging && cls.isDragging)}
      style={{
        transform: `translateY(${offsetY}px)`,
      }}
    >
      <Draggable
        nodeRef={nodeRef}
        axis="y"
        bounds={bounds}
        onStart={() => onStart(index)}
        onDrag={(_, data) => onDrag(data, index)}
        onStop={(_, data) => onStop(data, index)}
        position={{ x: 0, y: 0 }}
      >
        <div ref={nodeRef} className={cls.content}>
          {children}
        </div>
      </Draggable>
    </div>
  );
};
