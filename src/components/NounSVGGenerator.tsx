'use client';

import { useState } from 'react';
import { generateNounSVG, generateRandomNounSVG, getNounSeedInfo } from '@/lib/noun-utils';
import { NounPreview } from './NounPreview';

export const NounSVGGenerator = () => {
  const [nounId, setNounId] = useState<number>(116);
  const [blockHash, setBlockHash] = useState<string>('0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01');
  const [svg, setSvg] = useState<string>('');
  const [seedInfo, setSeedInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const generatedSvg = generateNounSVG(nounId, blockHash);
      const info = getNounSeedInfo(nounId, blockHash);
      
      setSvg(generatedSvg);
      setSeedInfo(info);
    } catch (error) {
      console.error('生成失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomGenerate = () => {
    setIsLoading(true);
    try {
      const randomSvg = generateRandomNounSVG();
      setSvg(randomSvg);
      setSeedInfo(null);
    } catch (error) {
      console.error('生成失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Nouns SVG 生成器
        </h1>
        <p className="text-gray-600">
          基于 Nouns 协议生成 SVG 图片
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Noun ID
            </label>
            <input
              type="number"
              value={nounId}
              onChange={(e) => setNounId(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入 Noun ID"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Block Hash
            </label>
            <input
              type="text"
              value={blockHash}
              onChange={(e) => setBlockHash(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入区块哈希"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '生成中...' : '生成 Noun'}
          </button>
          
          <button
            onClick={handleRandomGenerate}
            disabled={isLoading}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '生成中...' : '随机生成'}
          </button>
        </div>

        {seedInfo && (
          <div className="bg-gray-50 rounded-md p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">种子信息</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <span className="font-medium">背景:</span> {seedInfo.seed.background}
              </div>
              <div>
                <span className="font-medium">身体:</span> {seedInfo.seed.body}
              </div>
              <div>
                <span className="font-medium">配饰:</span> {seedInfo.seed.accessory}
              </div>
              <div>
                <span className="font-medium">头部:</span> {seedInfo.seed.head}
              </div>
              <div>
                <span className="font-medium">眼镜:</span> {seedInfo.seed.glasses}
              </div>
            </div>
            <div className="mt-2">
              <span className="font-medium">背景颜色:</span> #{seedInfo.background}
            </div>
          </div>
        )}
      </div>

      {svg && <NounPreview svg={svg} />}
    </div>
  );
};