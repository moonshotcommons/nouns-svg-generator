import { ImageData, getNounSeedFromBlockHash, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';

export const generateNounSVG = (nounId: number, blockHash: string): string => {
  // 1. Generate seed
  const seed = getNounSeedFromBlockHash(nounId, blockHash);
  
  // 2. Get image data
  const { parts, background } = getNounData(seed);
  const { palette } = ImageData;
  
  // 3. Build SVG
  const svg = buildSVG(parts, palette, background);
  
  return svg;
};

export const generateRandomNounSVG = (): string => {
  // Generate random seed
  const randomSeed = {
    background: Math.floor(Math.random() * 2),
    body: Math.floor(Math.random() * 30),
    accessory: Math.floor(Math.random() * 137),
    head: Math.floor(Math.random() * 234),
    glasses: Math.floor(Math.random() * 21),
  };
  
  const { parts, background } = getNounData(randomSeed);
  const { palette } = ImageData;
  
  return buildSVG(parts, palette, background);
};

export const getNounSeedInfo = (nounId: number, blockHash: string) => {
  const seed = getNounSeedFromBlockHash(nounId, blockHash);
  const { parts, background } = getNounData(seed);
  
  return {
    seed,
    parts: parts.map(part => part.filename),
    background,
  };
};