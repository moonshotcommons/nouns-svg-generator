'use client';

import { useState } from 'react';

interface NounPreviewProps {
  svg: string;
}

export const NounPreview = ({ svg }: NounPreviewProps) => {
  const [showCode, setShowCode] = useState(false);

  const downloadSVG = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'noun.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(svg);
      alert('SVG 代码已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">生成的 Noun</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            {showCode ? '隐藏代码' : '显示代码'}
          </button>
          <button
            onClick={downloadSVG}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            下载 SVG
          </button>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            复制代码
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
            <div 
              className="w-80 h-80"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </div>

        {showCode && (
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">SVG 代码</h3>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-xs">
              <code>{svg}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};