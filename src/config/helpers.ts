import type { BlockColor, BlockType } from "./types";

export const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
};

export const generateBlocks = (colors: readonly BlockColor[], count: number): BlockType[] => {
  const blocks: BlockType[] = Array.from({ length: count }, (_, i) => ({
    id: `block-${i}`,
    text: i + 1,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  return shuffleArray(blocks);
};