import React from 'react'
import { BlockBoard } from 'src/components';
import { BLOCK_COLORS, BLOCK_COUNT, generateBlocks, shuffleArray } from 'src/config'

export const LevelPage = () => {
  const rightOrder = generateBlocks(BLOCK_COLORS, BLOCK_COUNT);
  const blocks = shuffleArray(rightOrder);
  
  const order = rightOrder.map(item => item.text).join(' → ');

  return (
    <div>
      <h2>Задание: Расположи блоки в следующем порядке {order}</h2>
      <BlockBoard blocks={blocks} rightOrder={rightOrder} />
    </div>
  )
}
