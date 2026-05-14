import { BLOCK_COLORS, LevelStatus } from "./constants";

export type BlockColor = (typeof BLOCK_COLORS)[number];

export type BlockType = {
  id: string;
  text: string | number;
  color: BlockColor;
}

export type LevelStatusType = typeof LevelStatus[keyof typeof LevelStatus];