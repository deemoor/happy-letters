import { useState } from 'react'
import { BlockBoard, Modal } from 'src/components';
import { BLOCK_COLORS, BLOCK_COUNT, generateBlocks, LevelStatus, shuffleArray, type LevelStatusType } from 'src/config'
import { successIcon } from 'src/assets';
import cls from './LevelPage.module.scss';

export const LevelPage = () => {
  const [status, setStatus] = useState<LevelStatusType>(LevelStatus.InProgress);
  const [levelData, setLevelData] = useState(createLevelData);
  const { rightOrder, blocks } = levelData;

  function createLevelData() {
    const rightOrder = generateBlocks(BLOCK_COLORS, BLOCK_COUNT);
    const blocks = shuffleArray(rightOrder);
    return { rightOrder, blocks };
  };

  const handleRestart = () => {
    setStatus(LevelStatus.InProgress);
    setLevelData(createLevelData());
  };

  return (
    <div className={cls.content}>
      <h2 className={cls.title}>Задание: Расположи блоки в следующем порядке</h2>
      <ul className={cls.order}>
        {rightOrder.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>

      {status === LevelStatus.Error &&
        <p className={cls.error}>Порядок не соответствует заданному, попробуй еще раз!</p>
      }
      <BlockBoard blocks={blocks} rightOrder={rightOrder} setStatus={setStatus} />

      <Modal 
        isOpen={status === LevelStatus.Success}
        image={successIcon}
        title="Победа!"
        buttonText="Новая игра"
        onClick={handleRestart}
      />
    </div>
  )
}
