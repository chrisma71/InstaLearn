import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const myTreeData: TreeNode[] = [
  {
    name: 'Calculus',
    children: [
      {
        name: 'Basic Functions',
        children: [
          { name: 'Linear Functions' },
          { name: 'Quadratic Functions' },
        ],
      },
      {
        name: 'Derivatives',
        children: [
          { name: 'First Principles' },
          { name: 'Rules of Differentiation' },
        ],
      },
      {
        name: 'Integrals',
        children: [
          { name: 'Definite Integrals' },
          { name: 'Indefinite Integrals' },
        ],
      },
    ],
  },
];

const containerStyles = {
  width: '100%',
  height: '100vh',
};

const renderCustomNode = ({ nodeDatum }: any) => {
  const textLength = nodeDatum.name.length * 8;
  const boxWidth = textLength + 20;

  return (
    <g>
      <rect
        width={boxWidth}
        height="40"
        x={-boxWidth / 2}
        y="-20"
        fill="#f0f0f0"
        stroke="#333"
        strokeWidth="1.5"
        rx="5"
        ry="5"
      />
      <text fill="black" strokeWidth="0.5" x="0" y="5" textAnchor="middle">
        {nodeDatum.name}
      </text>
    </g>
  );
};

const ProgressionTree: React.FC = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const dimensions = document.getElementById('treeWrapper')?.getBoundingClientRect();
    if (dimensions) {
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 4,
      });
    }
  }, []);

  return (
    <div id="treeWrapper" style={containerStyles}>
      <Tree
        data={myTreeData}
        orientation="vertical"
        translate={translate}
        zoomable={true}
        zoom={0.7}
        renderCustomNodeElement={renderCustomNode}
        nodeSize={{ x: 200, y: 100 }}
      />
    </div>
  );
};

export default ProgressionTree;
