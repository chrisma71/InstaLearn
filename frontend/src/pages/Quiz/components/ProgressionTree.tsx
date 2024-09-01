import React from 'react';
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

const ProgressionTree: React.FC = () => {
  return (
    <div style={containerStyles}>
      <Tree data={myTreeData} orientation="vertical" />
    </div>
  );
};

export default ProgressionTree;
